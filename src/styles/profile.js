import { Box, IconButton, Typography, styled } from "@mui/material";

export const Title = styled(Typography)(({ theme }) => ({
  color: theme?.palette?.commonColor?.black,
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "1.3rem",
  margin: "30px 0",
}));

export const FormContainer = styled("div")(({ theme }) => ({
  margin: "0 30px",
  [theme.breakpoints.down("sm")]: {
    margin: "0",
    width: "100%",
  },
}));

export const SubFormContainer = styled("div")(({ theme }) => ({
  padding: "30px",
  margin: "20px 0",
  width: "65%",
  border: `1px solid ${theme.palette?.shadowColor?.main}`,
  borderRadius: "8px",
  [theme.breakpoints.down("md")]: {
    margin: "20px auto",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0",
    width: "100%",
  },
}));

export const Image = styled("img")(({ theme }) => ({
  height: "130px",
  width: "130px",
  borderRadius: "50%",
  [theme.breakpoints.down("md")]: {
    height: "100px",
    width: "100px",
  },
}));

export const ProfileDetails = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
  },
}));

export const IconContainer = styled(IconButton)(({ theme }) => ({
  borderRadius: "2px",
  padding: "8px ",
}));

export const GeneralContainer = styled(Box)(({ theme }) => ({
  width: "auto",
  display: "flex",
  alignItems: "flex-start",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "center",
  },
}));

export const RoleContainer = styled("div")(({ theme }) => ({
  marginTop: "10px",
  borderRadius: "4px",
  width: "max-content",
  padding: "5px 10px",
  background: theme.palette?.primary?.main,
  color: theme?.palette?.primary?.contrastText,
  cursor: "pointer",
}));

export const ProfileCard = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: "24px",
}));
