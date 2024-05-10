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

export const LoginContainer = styled(Box)(({ theme }) => ({
  width: "35%",
  height: "auto",
  padding: "2% 3%",
  borderRadius: 8,
  border: `1px solid ${theme.palette?.commonColor?.black}`,
  [theme.breakpoints.down("md")]: {
    width: "50%",
    padding: "3%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    border: "none",
    padding: "6%",
  },
}));

export const ForgetPassword = styled("span")(({ theme }) => ({
  color: theme.palette?.commonColor?.blue,
  cursor: "pointer",
  textDecoration: "underline",
}));

export const LoginHeading = styled(Typography)(({ theme }) => ({
  width: "100%",
  fontSize: "32px",
  fontWeight: "500",
  textTransform: "capitalize",
  letterSpacing: "0.00938em",
  textAlign: "center",
  color: theme.palette?.primary?.main,
  [theme.breakpoints.down("md")]: {
    fontSize: "26px",
  },
}));
