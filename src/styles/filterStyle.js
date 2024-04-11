import { Box, IconButton, Modal, styled } from "@mui/material";

export const FilterModalLayout = styled(Modal)(() => ({
  position: "absolute",
  top: 0,
  left: "25%",
  overflow: "auto",
  width: "55%",
  height: "100%",
  backgroundColor: "transparent",
  display: "block",
  scrollbarWidth: "none",
}));

export const FilterContainerStyle = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxWidth: "800px",
  backgroundColor: theme.palette?.backgroundColor?.allButton,
  boxShadow: 24,
  outline: 0,
}));

export const FilterFormStyle = styled(Box)(({ theme }) => ({
  maxHeight: 450,
  overflow: "auto",
  overflowX: "hidden",
  margin: 0,
  padding: 0,
  scrollbarWidth: "thin",
  scrollbarColor: `${theme?.palette?.backgroundColor?.grey} ${theme?.palette?.backgroundColor?.lightGrey}`,
}));

export const FilterTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 20px",
  backgroundColor: theme.palette?.backgroundColor?.allButton,
  color: theme.palette?.textColor?.white,
}));

export const FilterIconButton = styled(IconButton)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "7px  8px",
  fontSize: 14,
  borderRadius: 4,
  backgroundColor: theme.palette?.backgroundColor?.allButton,
  color: theme.palette?.textColor?.white,
  "&:hover": {
    backgroundColor: theme.palette?.backgroundColor?.allButton,
    color: theme.palette?.textColor?.white,
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
