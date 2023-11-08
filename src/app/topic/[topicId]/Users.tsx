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
