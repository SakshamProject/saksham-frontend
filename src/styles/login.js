import { Box, Grid, Typography, styled } from "@mui/material";
import { CODES } from "../constants/globalConstants";
import {
  CancelButton,
  StyledButtonContainer,
  SubmitButton,
} from "./buttonStyle";

export const LoginWrapper = styled(Grid)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  padding: 0,
  margin: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "auto",
  [theme.breakpoints.down("sm")]: {
    height: "calc(100vh - 56px)",
    padding: "0px 10px",
  },
}));

export const LoginContainer = styled(Box)(({ theme }) => ({
  width: "35%",
  height: "auto",
  padding: "2% 3%",
  borderRadius: 8,
  margin: "3% 0",
  border: `1px solid ${theme.palette?.commonColor?.black}`,
  [theme.breakpoints.down("md")]: {
    width: "50%",
    padding: "3%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    border: "none",
    padding: "3%",
  },
  maxWidth: "620px",
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

export const TitleContainer = styled(Grid)(({ role }) => ({
  display: "flex",
  marginBottom: role === CODES?.ADMIN ? "24px" : 0,
}));

export const RoleButtonContainer = styled(StyledButtonContainer)(() => ({
  margin: "16px 0",
  justifyContent: "space-between",
}));

export const RememberMeContainer = styled(StyledButtonContainer)(() => ({
  marginTop: "-14px",
  justifyContent: "space-between",
  flexWrap: "wrap",
  rowGap: 1,
}));

export const LoginButtonContainer = styled(Grid)(() => ({
  margin: "16px 0",
  textAlign: "center",
}));

export const LoginButton = styled(SubmitButton)(() => ({
  borderRadius: "18px",
  width: "50%",
}));

export const RoleButton = styled(CancelButton)(({ theme, roletype, role }) => ({
  width: "100%",
  minWidth: "fit-content",
  marginRight: "0 !important",
  margin: roletype === CODES?.DIVYANG ? "0 8px 0 0" : "0 0 0 16px",
  ...(((role === CODES?.DIVYANG && roletype === CODES?.DIVYANG) ||
    (role === CODES?.SEVA_KENDRA && roletype === CODES?.SEVA_KENDRA)) && {
    backgroundColor: theme.palette?.primary?.main,
    color: theme.palette?.primary?.contrastText,
    ":hover": {
      backgroundColor: theme.palette?.primary?.main,
      color: theme.palette?.primary?.contrastText,
    },
  }),
  [theme.breakpoints.down(375)]: {
    fontSize: "12px",
  },
}));
