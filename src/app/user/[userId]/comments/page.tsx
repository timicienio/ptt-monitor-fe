"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Chip,
  Card,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Button,
  Pagination,
} from "@mui/material";

import useUser from "@/lib/user/useUser";
import useUserComments from "@/lib/comment.ts/useUserComments";

const commentTypeToSymbol = {
  PUSH: "推",
  ARROW: "→",
  BOO: "噓",
};

const UserPostsPage = ({ params }: { params: { userId: string } }) => {
  const { data } = useUser(params.userId);
  const { data: userCommentsData, isLoading: userCommentsIsLoading } =
    useUserComments(params.userId, { limit: 100 });
  const user = data?.data;
  const userComments = userCommentsData?.data.comments ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalComments = userComments.length;
  const totalPages = Math.ceil(totalComments / itemsPerPage);

  const currentComments = userComments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [userComments]);

  const router = useRouter();

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
        <Box sx={{ width: "100%", mb: 4 }}>
          <Typography variant="h2" gutterBottom sx={{ width: "100%" }}>
            使用者 / {user?.id}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="caption">
              最後登入：
              {user &&
                moment(user?.last_login_date).format("YYYY/MM/DD HH:DD:ss")}
            </Typography>
            <PlaceIcon sx={{ height: "16px", ml: 2 }} />
            <Typography variant="caption">{user?.last_login_ip}</Typography>
            {/* TODO: Last login country */}
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Button
            sx={{
              backgroundColor: "transparent",
              color: "black",
              marginLeft: 0,
              fontSize: 20,
              fontWeight: 700,
            }}
            onClick={() => router.push(`/user/${params.userId}`)}
          >
            <KeyboardBackspaceIcon />
            返回
          </Button>
        </Box>
        <Card
          elevation={0}
          sx={{
            borderRadius: 2,
            width: "100%",
            px: 2,
            mt: 2,
            backgroundColor: "secondary.contrastText",
          }}
        >
          <Box sx={{ mt: 3, width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h3">全部留言</Typography>
            </Box>
            <List>
              <Divider />
              {userCommentsIsLoading && (
                <Box
                  sx={{
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress color="inherit" />
                </Box>
              )}
              {currentComments.map((comment, index) => (
                <>
                  <ListItem
                    key={`${comment.post.aid}-${index}`}
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
                        href={comment.post.url}
                      >
                        {comment.post.title}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                        }}
                      >
                        <Typography
                          component="a"
                          variant="caption"
                          sx={{ textDecoration: "none", color: "inherit" }}
                          href={`/user/${comment.post.author}`}
                        >
                          {comment.post.author}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            opacity: 0.6,
                          }}
                        >
                          {comment.post.push +
                            comment.post.boo +
                            comment.post.arrow}{" "}
                          留言
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            opacity: 0.6,
                          }}
                        >
                          {comment.post.push} 推
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            opacity: 0.6,
                          }}
                        >
                          {comment.post.arrow} →
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            opacity: 0.6,
                          }}
                        >
                          {comment.post.boo} 噓
                        </Typography>
                      </Box>
                      <Typography variant="caption">
                        {moment(comment.post.date).format("M/D YYYY")}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 0.5 }}>
                      <Chip
                        label={
                          commentTypeToSymbol[
                            comment.comment.type as "PUSH" | "ARROW" | "BOO"
                          ]
                        }
                        size="small"
                        variant="outlined"
                      />
                      <Typography sx={{ ml: 1 }} variant="caption">
                        {comment.comment.content}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
              marginBottom: "20px",
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default UserPostsPage;
