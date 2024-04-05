import { Avatar, Box, Grid, Paper, styled } from "@mui/material";

export const AppContainerLayout = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.text.white,
}));

export const AppMainContainer = styled(Box)(() => ({
  display: "flex",
  height: "calc(100vh - 70px)",
}));

export const AppBarLayout = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "70px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "sticky",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

export const AppLogo = styled("div")({
  height: "100%",
  width: "auto",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  cursor: "pointer",
  gap: "15px",
  marginLeft: "20px",
});

export const CommonAvatar = styled(Avatar)({
  width: 45,
  height: 45,
});

export const AppProfile = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "auto",
  height: "100%",
  cursor: "pointer",
  marginRight: "15px",
});

export const AppProfileDetails = styled(Box)({
  marginRight: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const AppMainLayout = styled("div")({
  width: "100%",
  overflow: "scroll",
  height: "calc(100vh - 70px)",
  "&::-webkit-scrollBar": {
    width: 0,
    height: 0,
  },
});

export const FormContainer = styled(Box)({
  width: "100%",
  maxHeight: "100%",
  overflow: "scroll",
  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
  },
});

export const FormLayout = styled(Box)(({ theme }) => ({
  maxHeight: "calc(100% - 92px)",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.background.grey,
    borderRadius: 5,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.background.lightGrey,
  },
}));

export const StyledFormContainer = styled(Paper)(({ theme, width }) => {
  return {
    width: width ?? "60%",
    margin: "0px auto 30px",
    padding: "40px",
    height: "fit-content",
    borderRadius: 10,
    border: "1px solid #00000090",
    boxSizing: "border-box",
    boxShadow: "none",
    minWidth: "500px",
    backgroundColor: theme.palette.background.white,
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
  fontFamily: "lato",
  userSelect: "none",
  fontWeight: "700",
  color: theme.palette.primary.main,
}));
