"use client";

import useTopic from "@/lib/topic/useTopic";
import { Container, Box, Typography, LinearProgress, Card } from "@mui/material";
import { useState } from "react";
import PostList from "./Posts";
import UserList from "./Users";

export default function TopicPage({ params }: { params: { topicId: number } }) {
  const { data } = useTopic(Number(params.topicId));

  const [mode, setMode] = useState<"PostList" | "UserList">("PostList");

  const postCount = data?.data.meta.post_count;
  const stanceRatio = ((postCount?.negative ?? 0) / ((postCount?.negative ?? Infinity) + (postCount?.positive ?? Infinity))) * 100;

  return (
    <Container>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          pt: 4,
          mb: 4,
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          textAlign={"left"}
          sx={{ flexShrink: 0, mr: 3 }}
        >
          熱門話題: {data?.data.keywords.at(0)?.name}
        </Typography>
        <Typography sx={{ mt: 1, mr: 1 }}>{postCount?.negative}</Typography>
        <Box
          sx={{
            width: "120px",
            justifyContent: "center",
            alignContent: "center",
            mt: 1.45,
          }}
        >
          <LinearProgress
            variant="determinate"
            value={stanceRatio}
            sx={{
              height: 16,
              border: 1,
              borderRadius: 8,
              backgroundColor: "secondary.light",
            }}
            color="secondary"
          />
        </Box>
        <Typography sx={{ mt: 1, ml: 1 }}>{postCount?.positive}</Typography>
        <Typography sx={{ mt: 1, ml: 3 }}>共 {postCount?.total} 篇</Typography>
      </Box>
      <Card
        elevation={0}
        sx={{ borderRadius: 2, width: "100%", px: 5, pt: 4, pb: 4, mt: 2, backgroundColor: 'secondary.contrastText' }}
      > 
        {mode === "PostList" ? (
          <PostList
            topicId={params.topicId}
            toggleMode={() => setMode("UserList")}
          />
        ) : (
          <UserList
            topicId={params.topicId}
            toggleMode={() => setMode("PostList")}
          />
        )}
      </Card>
    </Container>
  );
}
