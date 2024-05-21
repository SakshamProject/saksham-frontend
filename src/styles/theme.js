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
      main: "#808080",
      light: "#D9D9D9",
      dark: "#262626",
      contrastText: "#ffffff",
    },

    tableColor: {
      header: "#808080",
      headerText: "#F2F2F2",
      pagination: "#D9D9D9",
      paginationText: "#262626",
      shadow: "#D3D3D3",
    },

    scrollbarColor: {
      thumb: "#888888",
      track: "#D3D3D3",
      hover: "#555555",
    },

    shadowColor: {
      main: "#00000029",
      dark: "#0000008f",
    },
  },
});
