import { createTheme } from "@mui/material";

const lightTheme_2 = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e91e63", // Customize the primary color to your preference
    },
    secondary: {
      main: "#c5dfde", // Customize the secondary color to your preference
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
    managerRoleColor: {
      main: "#7978E9",
      contrastText: "#ffffff",
    },
    employeeRoleColor: {
      main: "#7DA0FA",
      contrastText: "#ffffff",
    },
    adminRoleColor: {
      main: "#F3797E",
      contrastText: "#ffffff",
    },
  },
});

export default lightTheme_2;
