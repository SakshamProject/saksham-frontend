import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#006bbd",
    },
    error: {
      main: "#ff0000",
    },
    warning: {
      main: "#ff9900",
    },
    text: {
      white: "#ffffff",
      black: "#000000",
      grey: "#707070",
    },
  },
  typography: {
    fontFamily: ["Rubik", "sans-serif", "Roboto", "Helvetica Neue"].join(","),
  },
});
