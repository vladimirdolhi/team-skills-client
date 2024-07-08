import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e91e63",
    },
    secondary: {
      main: "#7AD1DD",
    },
    black: {
      main: "#F3FAFB",
    },
    background: {
      main: "#eeeeee",
      default: "#eeeeee",
      paper: "#eeeeee",
    },
    textColor: {
      main: "#444444",
    },
  },
});

export default lightTheme;
