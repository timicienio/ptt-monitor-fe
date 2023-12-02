"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import useUser from "@/lib/user/useUser";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useThrottle } from "@uidotdev/usehooks";
import ButtonSolid from "@/components/ButtonSolid";
import ButtonHollow from "@/components/ButtonHollow";
import {
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Button,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  Select, 
  MenuItem,
  IconButton,
} from "@mui/material";
import useUsers from "@/lib/user/useUsers";
import useUserTopics from "@/lib/topic/useUserTopics";
import useUserPosts from "@/lib/post/useUserPosts";
import useUserComments from "@/lib/comment.ts/useUserComments";
import useUserStance from "@/lib/topic/useUserStance";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useUserUserGroup from "@/lib/user/useUserUserGroup";
import StanceIndicator from "@/components/StanceIndicator";
import useUserGroup from "@/lib/userGroup/useUserGroup";
import useTrainRecord from "@/lib/trainRecord/useTrainRecord";
import dayjs from 'dayjs';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const commentTypeToSymbol = {
  PUSH: "推",
  ARROW: "→",
  BOO: "噓",
};

export default function UserPage({ params }: { params: { userId: string } }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempDate, setTempDate] = useState<string | null>(null);

  const formattedDate = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : undefined;
  const query = formattedDate ? { record_date: formattedDate } : undefined;

  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [searchInputValue, setSearchInputValue] = useState("");

  const throttledSearchInputValue = useThrottle(searchInputValue, 500);

  const { data: users } = useUsers({
    limit: 20,
    userId: throttledSearchInputValue,
  });

  const { data } = useUser(params.userId);
  const { data: useUserStanceData } = useUserStance(params.userId, query);
  
  const { data: userTopicsData } = useUserTopics(params.userId, query);
  const { data: userPostsData, isLoading: userPostsIsLoading } = useUserPosts(
    params.userId
  );
  const { data: userCommentsData, isLoading: userCommentsIsLoading } =
    useUserComments(params.userId);
  const { data: userUserGroupData } = useUserUserGroup(params.userId);

  const { data: userGroupData } = useUserGroup(
    userUserGroupData?.data.group_id,
    query
  );

  const { data: trainRecord } = useTrainRecord();

  const useTrainRecords = trainRecord?.data;
  const user = data?.data;
  const userTopics = userTopicsData?.data.topics ?? [];
  const userPosts = userPostsData?.data.posts ?? [];
  const userComments = userCommentsData?.data.comments ?? [];
  const userTopicStance = useUserStanceData?.data.topics ?? [];
  const userGroup = userGroupData?.data;

  useEffect(() => {
    if (useTrainRecords && useTrainRecords.length > 0) {
      const sortedDates = [...useTrainRecords].sort((a, b) => dayjs(b).unix() - dayjs(a).unix());
      setSelectedDate(sortedDates[0]);
    }
  }, [useTrainRecords]);

  const formatDateForButton = (date: string | null): string => {
    return date ? dayjs(date).format("YYYY-MM-DD") : (useTrainRecords && useTrainRecords.length > 0) ? useTrainRecords[0] : '';
  };

  const handleOpenDialog = () => {
    setTempDate(selectedDate); 
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    setSelectedDate(tempDate); 
    handleCloseDialog();
  };

  const handleReset = () => {
    if (useTrainRecords && useTrainRecords.length > 0) {
        setSelectedDate(useTrainRecords[0]);
    }
    setDialogOpen(false);
  };

  const handleNextDate = () => {
    const currentIndex = useTrainRecords.findIndex((date: string) => date === selectedDate);
    const nextDateIndex = currentIndex - 1;
    if (nextDateIndex >= 0) {
      setSelectedDate(useTrainRecords[nextDateIndex]);
    }
  };
  
  const handlePreviousDate = () => {
    const currentIndex = useTrainRecords.findIndex((date: string) => date === selectedDate);
    const prevDateIndex = currentIndex + 1;
    if (prevDateIndex < useTrainRecords.length) {
      setSelectedDate(useTrainRecords[prevDateIndex]);
    }
  };  

  const isLastDate = useTrainRecords && useTrainRecords.length > 0 && selectedDate === useTrainRecords[0];
  const isFirstDate = useTrainRecords && useTrainRecords.length > 0 && selectedDate === useTrainRecords[useTrainRecords.length - 1];

  const buttonStyle = {
    width: "130px",
    border: "1px solid #3B8EA5",
    borderRadius: "5px",
    color: "secondary.dark",
    backgroundColor: selectedDate && selectedDate !== dayjs().format("YYYY-MM-DD") ? "#D7F8F9" : "none"
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
    <Container
      sx={{
        mt: ["48px", "56px", "64px"],
        p: 3,
      }}
    >
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
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h2" gutterBottom>
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
          <Box>
            <Box>
              <IconButton 
                onClick={handlePreviousDate}
                disabled={isFirstDate}
                sx={{ marginRight: "5px" }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <Button 
                onClick={handleOpenDialog}
                sx={buttonStyle}
              >
                <ScheduleIcon 
                  sx={{
                    mr: "5px",
                  }}
                />
                {formatDateForButton(selectedDate)}
              </Button>
              <IconButton 
                onClick={handleNextDate}
                disabled={isLastDate}
                sx={{ marginLeft: "5px" }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
            <Dialog 
              open={dialogOpen} 
              onClose={handleCloseDialog}
              PaperProps={{
                sx: {
                  marginTop: '-7%',
                }
              }}
            >
              <DialogTitle
                variant="h3"
                sx={{
                  mt: "5px",
                  textAlign: "center",
                }}
              >
                更改日期
              </DialogTitle>
              <DialogContent>
                <Typography
                  sx={{
                    mb: "30px",
                  }}
                >
                  選擇不同的日期，以查看該時間點下的熱門話題分類結果。
                </Typography>
                <Select
                  value={tempDate || formatDateForButton(selectedDate)}
                  onChange={(e) => setTempDate(e.target.value as string)}
                  sx={{ width: "100%" }}
                >
                  {useTrainRecords && useTrainRecords.map((date: string, index: number) => (
                    <MenuItem key={index} value={date}>
                      {date}
                    </MenuItem>
                  ))}
                </Select>
              </DialogContent>
              <DialogActions
                sx={{
                  display: "flex",       
                  justifyContent: "space-between",
                  mb: "5px",
                  mr: "17px",
                  ml: "17px",
                }}
              >
                <ButtonSolid onClick={handleReset}>重置</ButtonSolid>
                <ButtonHollow onClick={handleConfirm}>確認</ButtonHollow>
              </DialogActions>
            </Dialog>
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
              {user?.comment_count === undefined ? "-" : user?.comment_count}
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
                      color: "primary.contrastText",
                      "&:hover": {
                        backgroundColor: "primary.light",
                      },
                    }}
                    onClick={() =>
                      router.push(`https://www.pttweb.cc/user/${params.userId}`)
                    }
                  >
                    使用者詳細資訊
                    <OpenInNewIcon sx={{ marginLeft: "4px", height: "18px" }} />
                  </Button>
                </Box>
              </CardContent>
            </Card>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                flex: "1 1 calc(50% - 8px)",
                px: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h3" sx={{ mb: 2 }}>
                    使用者所屬群體
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    {userGroup
                      ?.slice(0, 10)
                      ?.map((user) => (
                        <Chip
                          variant="outlined"
                          component="a"
                          href={`/user/${user.user_id}`}
                          label={user.user_id}
                        />
                      )) ?? <Typography variant="body2">無</Typography>
                    }
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    sx={{
                      width: "100%",
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      "&:hover": {
                        backgroundColor: "primary.light",
                      },
                    }}
                    onClick={() =>
                      router.push(
                        `/user-group/${userUserGroupData?.data.group_id}`
                      )
                    }
                    disabled={!userGroup}
                  >
                    查看使用者群體
                  </Button>
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
                最近參與的話題
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                {userTopics && userTopics.length > 0 ? (
                  userTopics.map((topic) => 
                    topic.keywords.at(0)?.name ? ( // Check if the first keyword name is not undefined
                      <Chip
                        key={topic.id}
                        variant="outlined"
                        component="a"
                        href={`/topic/${topic.id}`}
                        label={`${topic.keywords.at(0)?.name}, ${topic.keywords.at(1)?.name}`}
                      />
                    ) : null
                  )
                ) : (
                  <Typography sx={{ marginTop: "5px" }}>無</Typography>
                )}
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
            <CardContent>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: '10px',
              }}
            >
              <Typography variant="h3" sx={{ mb: 2 }}>
                熱門話題立場
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 5,
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              {userTopicStance
                .filter((topic) => topic.score !== null && topic.stances.length > 0)
                .map((topic) => (
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
                      {(() => {
                        const keywords =
                          userTopics.find(
                            (userTopic) => userTopic.id === topic.id
                          )?.keywords ?? [];
                        return `${keywords.at(0)?.name ?? ""}, ${
                          keywords.at(1)?.name ?? ""
                        }`;
                      })()}
                    </Typography>
                    <StanceIndicator
                      value={Math.round((topic.score as number) * 100)}
                      disabled
                      valueLabelDisplay="on"
                      valueLabelFormat={(value) => Math.abs(value)}
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
