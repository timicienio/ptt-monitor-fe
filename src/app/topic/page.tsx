import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TopicsChart from "./TopicsChart";

export default function TopicsPage() {
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
        <TopicsChart />
      </Box>
    </Container>
  );
}
