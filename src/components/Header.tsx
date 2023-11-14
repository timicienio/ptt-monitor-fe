import { AppBar, Toolbar, Typography, Box, Tab, Tabs } from "@mui/material";
import { Inconsolata } from "next/font/google";

const inconsolata = Inconsolata({
  weight: ["200"],
  display: "swap",
  subsets: ['latin']
});

const navItems = [
  { text: "熱門話題", href: "/topic", disabled: false },
  { text: "使用者", href: "/user", disabled: false },
  { text: "使用者群體", href: "/user-group", disabled: false },
  { text: "PTT 網頁版", href: "https://www.pttweb.cc/", disabled: false },
]; 

export default function Header() {
  return (
    <AppBar component="nav" position="fixed" sx={{ zIndex: 2000 }}>
      <Toolbar
        sx={{
          backgroundColor: "primary.contrastText",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h2"
          noWrap
          component="a"
          sx={{ textDecoration: "none", fontFamily: inconsolata.style.fontFamily }}
          href="/"
          color="secondary.contrastText"
        >
          ADAPTT
        </Typography>
        <Box sx={{ display: { sm: "flex" }, gap: 3, mr: 5, height: "100%" }}>
          <Tabs>
            {navItems.map((item, index) => (
              <Tab
                key={index}
                label={item.text}
                component="a"
                href={item.href}
                disabled={item.disabled}
                sx={{
                  color: "secondary.contrastText",
                  "&:hover": {
                    color: "primary.contrastText",
                    backgroundColor: "secondary.contrastText",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
