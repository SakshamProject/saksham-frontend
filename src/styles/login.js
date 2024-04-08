import { Box, Grid, Typography, styled } from "@mui/material";

export const LoginWrapper = styled(Grid)({
  height: "100vh",
  width: "100vw",
  padding: 0,
  margin: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const LoginImage = styled("img")({
  height: "90%",
  width: "90%",
});

export const LoginImageContainer = styled(Grid)({
  width: "100%",
  height: "99vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const ForgetPassword = styled("span")(({ theme }) => ({
  color: theme.palette?.textColor?.blue,
  cursor: "pointer",
  textDecoration: "underline",
}));

export const LoginContainer = styled(Box)(({ theme }) => ({
  width: "35%",
  height: "auto",
  padding: "3% 4%",
  borderRadius: 8,
  minWidth: "400px",
  border: `1px solid ${theme.palette?.textColor?.main}`,
}));

export const LoginHeading = styled(Typography)(({ theme }) => ({
  width: "100%",
  fontSize: "32px",
  fontWeight: "500",
  textTransform: "uppercase",
  letterSpacing: "0.00938em",
  display: "flex",
  alignItems: "center",
  gap: "27%",
  justifyContent: "center",
  color: theme.palette?.textColor?.main,
}));
