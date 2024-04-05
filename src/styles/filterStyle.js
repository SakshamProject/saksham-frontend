import { Box, IconButton, Modal, styled } from "@mui/material";

export const FilterModalLayout = styled(Modal)(() => ({
  position: "absolute",
  top: 0,
  left: "25%",
  overflow: "scroll",
  width: "55%",
  height: "100%",
  backgroundColor: "transparent",
  display: "block",
  "&::-webkit-scrollbar": {
    width: "0",
    height: "0",
  },
  "&::-moz-scrollbar": {
    width: "0",
    height: "0",
  },
}));

export const FilterContainerStyle = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxWidth: "800px",
  backgroundColor: theme.palette.background.white,
  boxShadow: 24,
  outline: 0,
}));

export const FilterFormStyle = styled(Box)(({ theme }) => ({
  maxHeight: 450,
  overflow: "scroll",
  overflowX: "hidden",
  margin: 0,
  padding: 0,
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
  "&::-moz-scrollbar": {
    width: "5px",
    height: "5px",
  },
  "&::-moz-scrollbar-thumb": {
    backgroundColor: theme.palette.background.grey,
    borderRadius: 5,
  },
  "&::-moz-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.background.lightGrey,
  },
}));

export const FilterTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 20px",
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

export const FilterIconButton = styled(IconButton)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "7px  8px",
  fontSize: 14,
  borderRadius: 4,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

export const FilterButtonModal = styled(Box)({
  margin: 0,
  marginTop: 20,
  padding: "16px",
  boxShadow: "-2px 0px 6px #00000029",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});
