import { Box, Container, Typography } from "@mui/material";
import UserGraph from "./UserGraph";

export const dynamic = "force-dynamic";

export default function UserGroupOverviewPage() {
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
        <Typography
          variant="h2"
          gutterBottom
          textAlign={"left"}
          sx={{ width: "100%" }}
        >
          使用者群體
        </Typography>
        <UserGraph />
      </Box>
    </Container>
  );
}
