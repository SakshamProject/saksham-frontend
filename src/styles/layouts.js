import { Avatar, Box, Grid, Paper, Typography, styled } from "@mui/material";

export const AppContainerLayout = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette?.commonColor?.white,
}));

export const AppMainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "calc(100vh - 64px)",
  [theme.breakpoints.down("md")]: {
    height: "calc(100vh - 56px)",
  },
}));

export const AppBarLayout = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "64px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "sticky",
  backgroundColor: theme.palette?.primary?.main,
  [theme.breakpoints.down("md")]: {
    minHeight: "56px",
  },
}));

export const AppLogo = styled("div")(({ theme }) => ({
  height: "100%",
  width: "auto",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  marginLeft: "24px",
  columnGap: "15px",
  [theme.breakpoints.down("md")]: {
    marginLeft: "8px",
  },
}));

export const StyledLogo = styled("img")(({ theme }) => ({
  height: "45px",
  width: "45px",
  [theme.breakpoints.down("md")]: {
    height: "35px",
    width: "35px",
  },
}));

export const StyledName = styled(Typography)(({ theme }) => ({
  color: theme.palette?.primary?.contrastText,
  fontWeight: 300,
  fontSize: "30px",
  fontFamily: "'Lobster', cursive",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    fontSize: "26px",
  },
}));

export const CommonAvatar = styled(Avatar)({
  width: 45,
  height: 45,
});

export const AppProfile = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "auto",
  height: "100%",
  cursor: "pointer",
  marginRight: "24px",
  gap: "20px",
}));

export const AppProfileDetails = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const AppMainLayout = styled("div")(({ theme }) => ({
  width: "100%",
  overflow: "auto",
  height: "calc(100vh - 64px)",
  scrollbarWidth: "none",
  [theme.breakpoints.down("md")]: {
    height: "calc(100vh - 56px)",
  },
}));

export const FormContainer = styled(Box)({
  width: "100%",
  maxHeight: "100%",
  overflow: "auto",
  scrollbarWidth: "none",
});

export const FormLayout = styled(Box)(() => ({
  maxHeight: "calc(100% - 92px)",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  overflow: "auto",
  scrollbarWidth: "none",
}));

export const StyledFormContainer = styled(Paper)(({ theme, width }) => {
  return {
    width: width || "60%",
    margin: "0px auto 30px",
    padding: "40px",
    height: "fit-content",
    borderRadius: 10,
    border: `1px solid ${theme?.palette?.primary.main}`,
    boxSizing: "border-box",
    boxShadow: "none",
    // minWidth: "500px",
    backgroundColor: theme.palette?.commonColor?.white,
  };
});

export const FileDownloadLayout = styled(Grid)({
  display: "flex",
  alignItems: "center",
  paddingTop: 16,
});

export const SearchContainer = styled(Box)({
  width: "89.8%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginLeft: "5%",
  marginBottom: 16,
});

export const CustomHeader = styled("div")(({ theme }) => ({
  fontSize: 22,
  marginLeft: 15,
  userSelect: "none",
  fontWeight: "700",
  color: theme.palette?.primary?.main,
}));
