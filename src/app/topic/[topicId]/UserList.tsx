import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import CommentIcon from "@mui/icons-material/Comment";

import { StanceOption } from "@/lib/user/useTopicUsers";
import {
  Box,
  Divider,
  Typography,
  ListItem,
  CircularProgress,
} from "@mui/material";
import useTopicUsers from "@/lib/user/useTopicUsers";
import useTopic from "@/lib/topic/useTopic";
import InfiniteScroll from "react-infinite-scroll-component";

export default function UserList({
  topicId,
  title,
  stance,
}: {
  topicId: number;
  title: string;
  stance: StanceOption;
}) {
  const { data: topicData } = useTopic(topicId);
  const { data, setSize } = useTopicUsers(topicId, {
    stance: stance,
    limit: 24,
  });

  const userCount = topicData?.data.meta.user_count;
  const commentCount = topicData?.data.meta.comment_count;
  const postCount = topicData?.data.meta.post_count;

  return (
    <Box
      sx={{
        flexDirection: "column",
        alignContent: "center",
        flex: 1,
        px: 2,
      }}
    >
      <Typography align="center" variant="h6">
        {title}
      </Typography>
      <Divider sx={{ borderWidth: 1, mt: 1 }} />
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <PeopleIcon sx={{ mr: 1 }} />
          <Typography>
            {stance === "POSITIVE" ? userCount?.positive : userCount?.negative}
            人
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <ArticleIcon sx={{ mr: 1 }} />
            <Typography align="right">文章</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "70px",
              justifyContent: "end",
            }}
          >
            <CommentIcon sx={{ mr: 1 }} />
            <Typography align="right">留言</Typography>
          </Box>
        </Box>
      </ListItem>
      <Divider sx={{ borderWidth: 1 }} />
      <InfiniteScroll
        dataLength={data?.flat().length ?? 0}
        hasMore
        loader={<CircularProgress />}
        next={() => setSize((size) => size + 1)}
      >
        {data?.flat().map((user) => (
          <>
            <ListItem
              sx={{
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  component="a"
                  href={`/user/${user.id}`}
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  {user.id}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography align="right">{user.post_count}篇</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "70px",
                    justifyContent: "end",
                  }}
                >
                  <Typography align="right">{user.comment_count}則</Typography>
                </Box>
              </Box>
            </ListItem>
            <Divider />
          </>
        ))}
      </InfiniteScroll>
    </Box>
  );
}
