import {
  List,
  ListItem,
  Divider,
  Box,
  Typography,
  Select,
  Button,
  MenuItem,
  Pagination,
  CircularProgress,
} from "@mui/material";
import UserList from "./UserList";

export default function Users({
  topicId,
  toggleMode,
}: {
  topicId: number;
  toggleMode: () => void;
}) {
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
          <Typography variant="h5">使用者立場</Typography>
        </Box>
        <Button color="info" onClick={toggleMode}>
          所有文章
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyItems: "stretch",
          flexDirection: "row",
          pt: 1,
        }}
      >
        <UserList topicId={topicId} title="反向立場" stance="NEGATIVE" />
        <UserList topicId={topicId} title="正向立場" stance="POSITIVE" />
      </Box>
    </Box>
  );
}
