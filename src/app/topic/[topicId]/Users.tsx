import { Box, Typography } from "@mui/material";
import UserList from "./UserList";
import useTopicStance from "@/lib/topic/useTopicStance";

export default function Users({ topicId }: { topicId: number }) {
  const { data: TopicStance } = useTopicStance(topicId);

  const topicStance = TopicStance?.data.stances ?? [];

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
          <Typography variant="h3">使用者立場</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyItems: "stretch",
          flexDirection: "row",
          pt: 1,
        }}
      >
        <UserList
          topicId={topicId}
          title={topicStance[1]?.name}
          stance="NEGATIVE"
        />
        <UserList
          topicId={topicId}
          title={topicStance[0]?.name}
          stance="POSITIVE"
        />
      </Box>
    </Box>
  );
}
