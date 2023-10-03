"use client";

import useTopic from "@/lib/topic/useTopic";
import {
  Container,
  Box,
  Typography,
  LinearProgress,
  Card,
} from "@mui/material";
import PostList from "./Posts";
import UserList from "./Users";
import useTopicStance from "@/lib/topic/useTopicStance";

export default function TopicPage({ params }: { params: { topicId: number } }) {
  const { data } = useTopic(Number(params.topicId));
  const { data: TopicStance } = useTopicStance(params.topicId);

  const topicStance = TopicStance?.data.stances ?? [];
  const postCount = data?.data.meta.post_count;
  const articleStanceRatio =
    ((postCount?.negative ?? 0) /
      ((postCount?.negative ?? Infinity) + (postCount?.positive ?? Infinity))) *
    100;
  const userStanceRatio =
    ((topicStance[0]?.user_count ?? 0) /
      ((topicStance[0]?.user_count ?? Infinity) +
        (topicStance[1]?.user_count ?? Infinity))) *
    100;

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
          熱門話題: {data?.data.keywords.at(0)?.name},{" "}
          {data?.data.keywords.at(1)?.name}
        </Typography>
        {/*
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
            value={articleStanceRatio}
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
        */}
      </Box>
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          width: "100%",
          px: 5,
          pt: 4,
          pb: 4,
          mt: 2,
          backgroundColor: "secondary.contrastText",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start", // Adjusting this
          }}
        >
          <Typography variant="h3" sx={{ margin: 0, marginRight: "5px" }}>
            話題立場
          </Typography>

          {Array.isArray(topicStance) && topicStance.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                alignItems: "center",
                ml: 2,
              }}
            >
              <Typography sx={{ mt: 1, mr: 1, margin: 0 }}>
                {topicStance[0]?.name}：{topicStance[0]?.user_count} 人
              </Typography>
              <Box
                sx={{
                  width: "120px",
                  justifyContent: "center",
                  alignContent: "center",
                  mt: 1.45,
                  margin: 0,
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={userStanceRatio}
                  sx={{
                    height: 16,
                    border: 1,
                    borderRadius: 8,
                    backgroundColor: "secondary.light",
                  }}
                  color="secondary"
                />
              </Box>
              <Typography sx={{ mt: 1, ml: 1, margin: 0 }}>
                {topicStance[1]?.name}：{topicStance[1]?.user_count} 人
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 3 }}>
          {" "}
          {/* Gap between the above and below sections */}
          {Array.isArray(topicStance) && topicStance.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  gap: 1,
                }}
              >
                <Typography sx={{ minWidth: "64px", fontWeight: "bold" }}>
                  {topicStance[0]?.name}
                </Typography>
                <Typography sx={{}}>-</Typography>
                <Typography>{topicStance[0]?.description}</Typography>
              </Box>

              {topicStance.length > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    gap: 1,
                  }}
                >
                  <Typography sx={{ minWidth: "64px", fontWeight: "bold" }}>
                    {topicStance[1]?.name}
                  </Typography>
                  <Typography sx={{}}>-</Typography>
                  <Typography>{topicStance[1]?.description}</Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Card>
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          width: "100%",
          px: 5,
          pt: 4,
          pb: 4,
          mt: 2,
          backgroundColor: "secondary.contrastText",
        }}
      >
        <PostList topicId={params.topicId} />
      </Card>
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          width: "100%",
          px: 5,
          pt: 4,
          pb: 4,
          mt: 2,
          backgroundColor: "secondary.contrastText",
        }}
      >
        <UserList topicId={params.topicId} />
      </Card>
    </Container>
  );
}
