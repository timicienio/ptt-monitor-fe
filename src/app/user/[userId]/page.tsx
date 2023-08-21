"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import useUser from "@/lib/user/useUser";
import moment from "moment";
import {
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Slider,
  styled,
} from "@mui/material";
import useUserTopics from "@/lib/topic/useUserTopics";
import useUserPosts from "@/lib/post/useUserPosts";
import useUserComments from "@/lib/comment.ts/useUserComments";

const StanceIndicator = styled(Slider)(({ theme }) => ({
  height: 4,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: 26,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-track": {
    backgroundColor: "#bfbfbf",
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    borderRadius: 5,
    height: 10,
    width: 10,
    "&.MuiSlider-markActive": {
      opacity: 1,
    },
  },
}));

const commentTypeToSymbol = {
  PUSH: "推",
  ARROW: "→",
  BOO: "噓",
};

export default function UserPage({ params }: { params: { userId: number } }) {
  const { data } = useUser(params.userId);
  const { data: userTopicsData } = useUserTopics(params.userId);
  const { data: userPostsData, isLoading: userPostsIsLoading } = useUserPosts(
    params.userId
  );
  const { data: userCommentsData, isLoading: userCommentsIsLoading } =
    useUserComments(params.userId);

  const user = data?.data;
  const userTopics = userTopicsData?.data.topics ?? [];
  const userPosts = userPostsData?.data.posts ?? [];
  const userComments = userCommentsData?.data.comments ?? [];

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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Card
            elevation={4}
            sx={{ border: 1, borderRadius: 2, width: "100%", px: 2 }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                基本資料
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", mb: 1 }}>
                <Typography sx={{ minWidth: 180 }}>
                  登入次數: {user?.login_count}
                </Typography>
                <Typography sx={{ minWidth: 180 }}>
                  目前動態: {user?.activity}
                </Typography>
                <Typography sx={{ minWidth: 180 }}>
                  信箱狀態: {user?.mail}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography sx={{ minWidth: 180 }}>
                  有效文章: {user?.legal_post}
                </Typography>
                <Typography sx={{ minWidth: 180 }}>
                  退文文章: {user?.illegal_post}
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Card
            elevation={4}
            sx={{ border: 1, borderRadius: 2, width: "100%", px: 2 }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                最近參與的話題
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {userTopics.map((topic) => (
                  <Chip
                    variant="outlined"
                    component="a"
                    href={`/topic/${topic.id}`}
                    label={topic.keywords.at(0)?.value}
                  />
                ))}
                <Chip variant="outlined" component="a" label="疫情" />
                <Chip variant="outlined" component="a" label="選舉" />
              </Box>
            </CardContent>
          </Card>
          <Card
            elevation={4}
            sx={{ border: 1, borderRadius: 2, width: "100%", px: 2 }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                熱門話題立場
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                }}
              >
                {userTopics.map((topic) => (
                  <Box sx={{ minWidth: 100 }}>
                    <Typography>{topic.keywords.at(0)?.value}</Typography>
                    <StanceIndicator
                      value={70}
                      disabled
                      valueLabelDisplay="on"
                      marks={[{ value: 0 }, { value: 50 }, { value: 100 }]}
                    />
                  </Box>
                ))}
                <Box sx={{ minWidth: 100 }}>
                  <Typography>台北市長</Typography>
                  <StanceIndicator
                    value={70}
                    disabled
                    valueLabelDisplay="on"
                    marks={[{ value: 0 }, { value: 50 }, { value: 100 }]}
                  />
                </Box>
                <Box sx={{ minWidth: 100 }}>
                  <Typography>新竹</Typography>
                  <StanceIndicator
                    value={30}
                    disabled
                    valueLabelDisplay="on"
                    marks={[{ value: 0 }, { value: 50 }, { value: 100 }]}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5">最新發文</Typography>
            <List>
              <Divider />
              {userPostsIsLoading && (
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
              {userPosts.map((post) => (
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
                          href={`/user/${post.author}`}
                        >
                          {post.author}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            opacity: 0.6,
                          }}
                        >
                          {post.push + post.boo + post.arrow} 留言
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            opacity: 0.6,
                          }}
                        >
                          {post.push} 推
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            opacity: 0.6,
                          }}
                        >
                          {post.arrow} →
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            opacity: 0.6,
                          }}
                        >
                          {post.boo} 噓
                        </Typography>
                      </Box>
                      <Typography variant="caption">
                        {moment(post.date).format("M/D YYYY")}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5">最新留言</Typography>
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
              {userComments.map((comment, index) => (
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
                        留言 bla bla bla...
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
