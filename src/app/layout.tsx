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
  title: "ADAPTT 1.0",
  description: "AI-Driven Analysis for PTT.",
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
          <Box>
            <Box
              component="main"
              sx={{
                minHeight: "calc(100vh - 64px)",
                flexGrow: 1,
                bgcolor: "background.default",
              }}
            >
              {children}
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
