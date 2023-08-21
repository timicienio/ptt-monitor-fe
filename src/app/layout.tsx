import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { Button, Container } from "@mui/material";
import theme from "@/components/ThemeRegistry/theme";
import Header from "@/components/Header";

export const metadata = {
  title: "PTT Monitor v0",
  description: "PTT Monitor v0",
};

const DRAWER_WIDTH = 240;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header />
          {/* <Drawer
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                boxSizing: "border-box",
                top: ["48px", "56px", "64px"],
                height: "auto",
                bottom: 0,
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Divider />

            <Divider sx={{ mt: "auto" }} />
          
          </Drawer> */}
          <Container>
            <Box
              component="main"
              sx={{
                minHeight: "calc(100vh - 64px)",
                flexGrow: 1,
                bgcolor: "background.default",
                // ml: `${DRAWER_WIDTH}px`,
                mt: ["48px", "56px", "64px"],
                p: 3,
              }}
            >
              {children}
            </Box>
          </Container>
        </ThemeRegistry>
      </body>
    </html>
  );
}
