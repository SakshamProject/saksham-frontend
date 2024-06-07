import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    commonColor: {
      white: "#FFFFFF",
      black: "#000000",
      blue: "#1473E6",
      lightBlue: " #4390EF",
      barkBlue: "#5353C6",
      darkBlue: "#8582B8",
      darkGreen: "#115523",
      green: "#3AD865",
      lightGreen: " #7FE69B",
      lightGrey: "#B3B3B3",
      grey: "#595959",
      red: "#D32F2F",
      orange: "#FF9900",
      adornment: "#707070",
    },

    primary: {
      main: "#2F506C",
      light: "#5F8FB9",
      dark: "#262626",
      contrastText: "#FFFFFF",
    },

    tableColor: {
      header: "#2F506C",
      headerText: "#F2F2F2",
      pagination: "#B8CDE0",
      paginationText: "#262626",
      shadow: "#CADAE8",
    },

    scrollbarColor: {
      thumb: "#888888",
      track: "#FFFFFF",
      hover: "#555555",
    },

    shadowColor: {
      main: "#00000029",
      dark: "#0000008f",
    },
  },
});
