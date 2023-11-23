"use client";

import {
  Container,
  Box,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Chip,
} from "@mui/material";

import useUserGroup from "@/lib/userGroup/useUserGroup";
import useUserGroupActiveUsers from "@/lib/userGroup/useUserGroupActiveUsers";
import useUserGroupTopicStance from "@/lib/userGroup/useUserGroupTopicStance";
import StanceIndicator from "@/components/StanceIndicator";
import useUserGroupActiveTopics from "@/lib/userGroup/useUserGroupActiveTopics";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function UserGroupPage({
  params: { userGroupId },
}: {
  params: { userGroupId: number };
}) {
  const [recordDate, setRecordDate] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const record_date = queryParams.get('record_date');
    setRecordDate(record_date);
  }, []);

  const recordDateParam = recordDate ? { record_date: recordDate } : undefined;

  const { data: userGroupData } = useUserGroup(userGroupId, recordDateParam);
  const { data: activeUsersData } = useUserGroupActiveUsers(userGroupId, recordDateParam);
  const { data: activeTopicsData } = useUserGroupActiveTopics(userGroupId, recordDateParam);
  const { data: topicStanceData } = useUserGroupTopicStance(userGroupId, recordDateParam);

  const userGroup = userGroupData?.data ?? [];
  const activeUsers = activeUsersData?.data ?? [];
  const activeTopics = activeTopicsData?.data ?? [];
  const topicStance = topicStanceData?.data;

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
          使用者群體 / {userGroupId}
        </Typography>
        <Card elevation={0} sx={{ borderRadius: 2, px: 2, mt: 2 }}>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2 }}>
              活躍參與話題
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {activeTopics.map((topic) => (
                <Chip
                  variant="outlined"
                  component="a"
                  href={`/topic/${topic.topic_id}`}
                  label={`${topic.name} ${topic.count}`}
                />
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
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2 }}>
              活躍使用者
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {activeUsers.map((user) => (
                <Chip
                  variant="outlined"
                  component="a"
                  href={`/user/${user.id}`}
                  label={user.id}
                />
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
              {topicStance?.topics
                .filter((topic) => topic.score !== null)
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
                      {topic.name}
                    </Typography>
                    <StanceIndicator
                      value={Math.round((topic.score as number) * 100)}
                      disabled
                      valueLabelDisplay="on"
                      valueLabelFormat={(value) => Math.abs(value - 50)}
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
      </Box>
    </Container>
  );
}
