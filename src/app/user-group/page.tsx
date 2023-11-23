import { Box, Container, Typography } from "@mui/material";
import UserGraph from "./UserGraph";

export const dynamic = "force-dynamic";

export default function UserGroupOverviewPage() {
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
        <UserGraph />
      </Box>
    </Container>
  );
}
