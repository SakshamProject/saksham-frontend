import { Box, Grid, styled } from "@mui/material";

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
  color: theme.palette.primary.main,
  cursor: "pointer",
  textDecoration: "underline",
}));

export const LoginContainer = styled(Box)({
  width: "35%",
  height: "auto",
  border: "1px solid black",
  padding: "3% 4%",
  borderRadius: 8,
  minWidth: "400px",
});

export const LoginHeading = styled("div")({
  width: "100%",
  fontFamily: "Roboto",
  color: "#707070",
  fontSize: "32px",
  fontWeight: "500",
  textTransform: "uppercase",
  letterSpacing: "0.00938em",
  display: "flex",
  alignItems: "center",
  gap: "27%",
  justifyContent: "center",
});
