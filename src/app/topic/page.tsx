import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TopicsChart from "./TopicsChart";

export default function TopicsPage() {
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
          熱門話題分類
        </Typography>
        <TopicsChart />
      </Box>
    </Container>
  );
}
