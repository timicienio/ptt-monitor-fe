"use client";

import useUsers from "@/lib/user/useUsers";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useThrottle } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import useActiveUsers from "@/lib/user/useActiveUsers";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import CustomTextField from "@/components/TextField";

export default function UserOverviewPage() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [searchInputValue, setSearchInputValue] = useState("");

  const throttledSearchInputValue = useThrottle(searchInputValue, 500);

  const { data: users } = useUsers({
    limit: 20,
    userId: throttledSearchInputValue,
  });

  const { data: activePostUsers } = useActiveUsers({
    browseType: "POST",
    limit: 80,
  });
  const { data: activeCommentUsers } = useActiveUsers({
    browseType: "COMMENT",
    limit: 80,
  });

  const postChartData = {
    id: "root",
    value: 1,
    children:
      activePostUsers?.data.map((user) => ({
        id: String(user.id),
        value: user.count,
      })) ?? [],
  };

  const commentChartData = {
    id: "root",
    value: 1,
    children:
      activeCommentUsers?.data.map((user) => ({
        id: String(user.id),
        value: user.count,
      })) ?? [],
  };

  useEffect(
    /** Go to user page when search value is set. */
    () => {
      if (searchValue && searchValue !== "") {
        router.push(`/user/${searchValue}`);
      }
    },
    [searchValue]
  );

  return (
    <Container>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            mb: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h2" gutterBottom sx={{ width: "100%" }}>
              使用者查詢
            </Typography>
            <Typography variant="caption">
              最後更新時間：2023/8/17 20:00
            </Typography>
          </Box>
          <Box>
            <Autocomplete
              id="user-search"
              value={searchValue}
              onChange={(_, newValue) => setSearchValue(newValue)}
              inputValue={searchInputValue}
              onInputChange={(_, newInputValue) =>
                setSearchInputValue(newInputValue)
              }
              options={users?.data.map((user) => user.id) ?? []}
              renderInput={(params) => (
                <CustomTextField label="查詢使用者名稱" {...params} />
              )}
              sx={{
                width: 240,
                "& .MuiAutocomplete-listbox": {
                  borderRadius: "12px",
                  borderColor: "primary.dark",
                },
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Card elevation={0} sx={{ borderRadius: 2, width: "100%", px: 2 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography variant="h3" sx={{ mb: 2 }}>
                發文活躍使用者
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  height: "80%",
                }}
              >
                <ResponsiveCirclePacking
                  label={(d) => d.data.id}
                  labelsSkipRadius={0}
                  enableLabels
                  colors={{ scheme: "greys" }}
                  data={postChartData}
                  borderWidth={1}
                  labelsFilter={(label) => label.node.depth === 1}
                  valueFormat={(value) => `${String(value)}篇`}
                  motionConfig="default"
                  isInteractive
                  onClick={(node) => {
                    if (node.depth === 0) return;
                    router.push(`/user/${node.id}`);
                  }}
                />
              </Box>
            </CardContent>
          </Card>
          <Card elevation={0} sx={{ borderRadius: 2, width: "100%", px: 2 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography variant="h3" sx={{ mb: 2 }}>
                留言活躍使用者
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  height: "80%",
                }}
              >
                <ResponsiveCirclePacking
                  label={(d) => d.data.id}
                  labelsSkipRadius={0}
                  enableLabels
                  colors={{ scheme: "greys" }}
                  data={commentChartData}
                  borderWidth={1}
                  labelsFilter={(label) => label.node.depth === 1}
                  valueFormat={(value) => `${String(value)}則`}
                  motionConfig="default"
                  isInteractive
                  onClick={(node) => {
                    if (node.depth === 0) return;
                    router.push(`/user/${node.id}`);
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
