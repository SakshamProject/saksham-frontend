import { Box, Grid, IconButton, styled } from "@mui/material";

export const TitleContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minHeight: 64,
  backgroundColor: theme.palette?.commonColor?.white,
  [theme.breakpoints.down("sm")]: {
    padding: "0 24px",
  },
}));

export const Title = styled("div")(({ theme }) => ({
  fontSize: 22,
  marginLeft: 18,
  userSelect: "none",
  fontWeight: "600",
  color: theme?.palette?.commonColor?.black,
}));

export const BackIcon = styled(IconButton)(({ theme }) => ({
  fontSize: 24,
  padding: 0,
  color: theme?.palette?.commonColor?.black,
}));

export const FormWrapper = styled(Grid)(({ theme }) => ({
  border: `1px solid ${theme.palette?.commonColor?.black}`,
  borderRadius: "8px",
  padding: "2% 24px 3% 0",
  margin: "0 !important",
  width: "100% !important",
  [theme.breakpoints.down("sm")]: {
    border: "none",
  },
}));

export const SignupContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  height: "100vh",
  overflow: "auto",
  scrollbarWidth: "none",
}));

export const SignupWrapper = styled(Box)(({ theme }) => ({
  width: "60%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
