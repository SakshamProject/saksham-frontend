import { Box, styled } from "@mui/material";

export const NotFoundContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: theme.palette?.backgroundColor?.grey,
}));

export const FourNotFour = styled("h1")(({ theme }) => ({
  textAlign: "center",
  fontSize: "14rem",
  marginTop: "-3rem",
  color: theme.palette?.textColor?.white,
}));

export const NotFoundMessage = styled("p")(({ theme }) => ({
  fontSize: "2.5rem",
  textAlign: "center",
  color: theme.palette?.textColor?.white,
}));
