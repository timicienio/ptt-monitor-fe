import { Box, CircularProgress, Container } from "@mui/material";

export default function GlobalLoading() {
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
        <CircularProgress />
      </Box>
    </Container>
  );
}
