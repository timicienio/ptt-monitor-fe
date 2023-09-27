import {
  List,
  ListItem,
  Divider,
  Box,
  Typography,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
} from "@mui/material";
import useTopicPosts, { TopicPostsSortOption } from "@/lib/post/useTopicPosts";
import { useEffect, useState } from "react";
import moment from "moment";
import ceil from "lodash/ceil";
import SortIcon from "@mui/icons-material/Sort";

const filterOptions: { value: TopicPostsSortOption; label: string }[] = [
  { value: "HYBRID", label: "最佳（最相關 + 熱度）" },
  { value: "RELATIVE", label: "最相關" },
  { value: "POPULAR", label: "熱度" },
  { value: "TIME", label: "時間" },
];

export default function Posts({ topicId }: { topicId: number }) {
  const [selectedFilterOptionValue, setSelectedFilterOptionValue] =
    useState<TopicPostsSortOption>("HYBRID");

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(-1);

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const { data, isLoading } = useTopicPosts(topicId, {
    limit: 10,
    offset: (page - 1) * 10,
    sort: selectedFilterOptionValue,
  });

  useEffect(() => {
    if (!isLoading) {
      setPageCount(ceil((data?.data.total_count ?? -10) / 10));
    }
  }, [data, isLoading]);

  return (
    <Box>
      <Box
        sx={{
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Typography variant="h3">文章列表</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexDirection: "row",
            }}
          >
            <SortIcon />
            <Select
              sx={{ borderRadius: 2 }}
              size="small"
              value={selectedFilterOptionValue}
              onChange={(e) =>
                setSelectedFilterOptionValue(
                  e.target.value as TopicPostsSortOption
                )
              }
            >
              {filterOptions.map((option) => (
                <MenuItem value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>
      <List>
        <Divider />
        {isLoading && (
          <Box
            sx={{
              height: "600px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        )}
        {data?.data.posts.map((post) => (
          <>
            <ListItem
              key={post.aid}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Box>
                <Typography
                  component="a"
                  sx={{ textDecoration: "none", color: "inherit" }}
                  href={post.url}
                >
                  {post.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography
                  component="a"
                  variant="caption"
                  sx={{ textDecoration: "none", color: "inherit" }}
                  href={`/user/${post.author}`}
                >
                  {post.author}
                </Typography>
                <Typography variant="caption">
                  {moment(post.date).format("M/D YYYY")}
                </Typography>
              </Box>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Pagination
          count={pageCount}
          onChange={handlePaginationChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}
