import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    background: {
      default: '#F6F6F6'
    },
    primary: {
      main: '#DBDBDB',          // grey
      light: '#F6F6F6',         // light grey (background)
      dark: '#08080A',          // black
      contrastText: '#08080A'   // black
    },
    secondary: {
      main: '#3B8EA5',          // blue
      light: '#F49E4C',         // orange
      dark: '#164466',          // dark blue
      contrastText: '#FFFFFF'    // white
    },
    info: {
      main: '#D2CA73',          // green (active)
      light: '#FEFDEC',         // light green (hover)
      dark: '#8E8432'
    },
    error: {
      main: '#AB3428',          // red
    },
    warning: {
      main: '#AB3428',          // red
    },
    success: {
      main: '#3B8EA5',          // green
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h2: {
      fontSize: 32,
      fontWeight: 700,
    },
    h3: {
      fontSize: 20,
      fontWeight: 700,
    },
    h5: {
      fontSize: 16,
      fontWeight: 700,
    },
    h6: {
      fontSize: 14,
      fontWeight: 700,
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default theme;
