import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const navItems = [
  { text: "熱門話題分類", href: "/topic", disabled: false },
  { text: "使用者查詢", href: "/user", disabled: false },
  { text: "PTT 網頁版", href: "https://www.pttweb.cc/", disabled: false },
];

export default function Header() {
  return (
    <AppBar component="nav" position="fixed" sx={{ zIndex: 2000 }}>
      <Toolbar
        sx={{
          backgroundColor: "background.paper",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h2"
          noWrap
          component="a"
          sx={{ textDecoration: "none" }}
          href="/"
          color="black"
        >
          PTT Monitor
        </Typography>
        <Box sx={{ display: { sm: "flex" }, gap: 3, mr: 5 }}>
          {navItems.map((item) => (
            <Button
              color="info"
              key={item.text}
              href={item.href}
              disabled={item.disabled}
            >
              {item.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
