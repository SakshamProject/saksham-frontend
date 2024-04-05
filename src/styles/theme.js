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
      primary: "#ffffff",
      secondary: "#000000",

      white: "#ffffff",
      black: "#000000",
      grey: "#707070",
    },

    background: {
      primary: "#006bbd",
      secondary: "#A2BEFB",

      white: "#ffffff",
      black: "#000000",
      grey: "#6E6E6E60",
      lightGrey: "#555555",
    },

    border: {
      primary: "#9e9e9e",
      secondary: "#707070",

      white: "#ffffff",
      black: "#000000",
    },
  },

  typography: {
    fontFamily: ["Rubik", "sans-serif", "Roboto", "Helvetica Neue"].join(","),
  },
});
