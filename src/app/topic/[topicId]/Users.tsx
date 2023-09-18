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
          <Typography variant="h3">使用者立場</Typography>
        </Box>
        <Button 
          onClick={toggleMode} 
          sx={{ 
            variabt: 'h5',
            color: 'info.main',
            border: '1px solid',
            borderColor: 'info.main',
            '&:hover': {
              backgroundColor: 'info.light'
            }
          }}
        >
          文章列表
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
