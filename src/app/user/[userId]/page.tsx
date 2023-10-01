"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import useUser from "@/lib/user/useUser";
import moment from "moment";
import { useRouter } from "next/navigation";
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
  Button,
} from "@mui/material";
import useUserTopics from "@/lib/topic/useUserTopics";
import useUserPosts from "@/lib/post/useUserPosts";
import useUserComments from "@/lib/comment.ts/useUserComments";
import useUserStance from "@/lib/topic/useUserStance";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const StanceIndicator = styled(Slider)(({ theme, value = 40 }) => ({
  height: 4,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    backgroundColor:
      (Array.isArray(value) ? value[0] : value) >= 50 ? "#F49E4C" : "#3B8EA5",
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
    transform: "translate(-5px, -50%)",
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

export default function UserPage({ params }: { params: { userId: string } }) {
  const { data } = useUser(params.userId);
  const { data: useUserStanceData } = useUserStance(params.userId);
  const { data: userTopicsData } = useUserTopics(params.userId);
  const { data: userPostsData, isLoading: userPostsIsLoading } = useUserPosts(params.userId);
  const { data: userCommentsData, isLoading: userCommentsIsLoading } =
    useUserComments(params.userId);

  const user = data?.data;
  const userTopics = userTopicsData?.data.topics ?? [];
  const userPosts = userPostsData?.data.posts ?? [];
  const userComments = userCommentsData?.data.comments ?? [];
  const userTopicStance = useUserStanceData?.data.topics ?? [];

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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "stretch",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: "secondary.dark",
              borderRadius: 2,
              flex: 1,
            }}
          >
            <Typography variant="h5" sx={{ color: "secondary.contrastText" }}>
              總發文
            </Typography>
            <Typography
              variant="h2"
              sx={{ color: "secondary.contrastText", marginTop: "5px" }}
            >
              {user?.legal_post === undefined ? "-" : user?.legal_post}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              backgroundColor: "secondary.main",
              borderRadius: 2,
              flex: 1,
            }}
          >
            <Typography variant="h5" sx={{ color: "secondary.contrastText" }}>
              總留言
            </Typography>
            <Typography
              variant="h2"
              sx={{ color: "secondary.contrastText", marginTop: "5px" }}
            >
              {user?.push_count === undefined || user?.boo_count === undefined
                ? "-"
                : user?.push_count + user?.boo_count}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              backgroundColor: "secondary.light",
              borderRadius: 2,
              flex: 1,
            }}
          >
            <Typography variant="h5" sx={{ color: "secondary.contrastText" }}>
              推文數
            </Typography>
            <Typography
              variant="h2"
              sx={{ color: "secondary.contrastText", marginTop: "5px" }}
            >
              {user?.push_count === undefined ? "-" : user.push_count}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              backgroundColor: "error.main",
              borderRadius: 2,
              flex: 1,
            }}
          >
            <Typography variant="h5" sx={{ color: "secondary.contrastText" }}>
              噓文數
            </Typography>
            <Typography
              variant="h2"
              sx={{ color: "secondary.contrastText", marginTop: "5px" }}
            >
              {user?.boo_count === undefined ? "-" : user.boo_count}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Card
              elevation={0}
              sx={{ borderRadius: 2, flex: "1 1 calc(50% - 8px)", px: 2 }}
            >
              <CardContent>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  基本資料
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", mb: 1 }}>
                  <Typography sx={{ minWidth: 130 }}>
                    登入次數: {user?.login_count}
                  </Typography>
                  <Typography sx={{ minWidth: 150 }}>
                    目前動態: {user?.activity}
                  </Typography>
                  <Typography sx={{ minWidth: 160 }}>
                    信箱狀態: {user?.mail}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography sx={{ minWidth: 130 }}>
                    有效文章: {user?.legal_post}
                  </Typography>
                  <Typography sx={{ minWidth: 150 }}>
                    退文文章: {user?.illegal_post}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    sx={{
                      width: "100%",
                      backgroundColor: "primary.main",
                      color: "primary.dark",
                      "&:hover": {
                        backgroundColor: "primary.light",
                      },
                    }}
                  >
                    群體分析
                  </Button>
                </Box>
              </CardContent>
            </Card>
            <Card
              elevation={0}
              sx={{ borderRadius: 2, flex: "1 1 calc(50% - 8px)", px: 2 }}
            >
              <CardContent>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  最近參與的話題
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {userTopics.map((topic) => (
                    <Chip
                      variant="outlined"
                      component="a"
                      href={`/topic/${topic.id}`}
                      label={topic.keywords.at(0)?.name}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
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
            <CardContent>
              <Typography variant="h3" sx={{ mb: 2 }}>
                熱門話題立場
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 5,
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                }}
              >
                {userTopicStance.map((topic) => (
                  <Box
                    sx={{
                      minWidth: 140,
                      marginLeft: "22px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ transform: "translateX(-5px)", width: "100%" }}
                    >
                      {topic.name}
                    </Typography>
                    <StanceIndicator
                      value={topic.score ? Math.round(topic.score * 100) : 50}
                      disabled
                      valueLabelDisplay="on"
                      marks={[{ value: 0 }, { value: 50 }, { value: 100 }]}
                    />
                    <Box
                      sx={{
                        width: "110%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          maxWidth: "70px",
                          color: "black",
                          marginTop: "10px",
                          fontSize: "14px",
                        }}
                      >
                        {topic.stances[0]?.name}
                      </Typography>
                      <Typography
                        sx={{
                          maxWidth: "70px",
                          color: "black",
                          marginTop: "10px",
                          fontSize: "14px",
                          textAlign: "right",
                        }}
                      >
                        {topic.stances[1]?.name}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
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
                <Typography variant="h3">最新發文</Typography>
                {userPosts.length > 0 && (
                  <Button
                    sx={{
                      variabt: "h5",
                      color: "info.main",
                      border: "1px solid",
                      borderColor: "info.main",
                      "&:hover": {
                        backgroundColor: "info.light",
                      },
                    }}
                    onClick={() => router.push(`/user/${params.userId}/posts`)}
                  >
                    全部發文
                    <KeyboardArrowRightIcon />
                  </Button>
                )}
              </Box>
              <List>
                <Divider />
                {userPostsIsLoading ? (
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
                ) : userPosts.length === 0 ? (
                  <Typography sx={{ marginTop: "10px" }}>無</Typography>
                ) : (
                  userPosts.map((post) => (
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
                  ))
                )}
              </List>
            </Box>
          </Card>
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
                <Typography variant="h3">最新留言</Typography>
                {userComments.length > 0 && (
                  <Button
                    sx={{
                      variabt: "h5",
                      color: "info.main",
                      border: "1px solid",
                      borderColor: "info.main",
                      "&:hover": {
                        backgroundColor: "info.light",
                      },
                    }}
                    onClick={() =>
                      router.push(`/user/${params.userId}/comments`)
                    }
                  >
                    全部留言
                    <KeyboardArrowRightIcon />
                  </Button>
                )}
              </Box>
              <List>
                <Divider />
                {userCommentsIsLoading ? (
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
                ) : userComments.length === 0 ? (
                  <Typography sx={{ marginTop: "10px" }}>無</Typography>
                ) : (
                  userComments.map((comment, index) => (
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
                  ))
                )}
              </List>
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
