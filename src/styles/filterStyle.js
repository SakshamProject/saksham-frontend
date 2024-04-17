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
  backgroundColor: theme.palette?.commonColor?.white,
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
  scrollbarColor: `${theme?.palette?.scrollbarColor?.thumb} ${theme?.palette?.scrollbarColor?.track}`,
}));

export const FilterTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 20px",
  backgroundColor: theme.palette?.primary?.main,
  color: theme.palette?.primary?.contrastText,
}));

export const FilterIconButton = styled(IconButton)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "7px  8px",
  fontSize: 14,
  borderRadius: 4,
  backgroundColor: theme.palette?.primary?.main,
  color: theme.palette?.primary?.contrastText,
  "&:hover": {
    backgroundColor: theme.palette?.primary?.main,
    color: theme.palette?.primary?.contrastText,
  },
}));

export const FilterButtonModal = styled(Box)(({ theme }) => ({
  margin: 0,
  marginTop: 20,
  padding: "16px",
  boxShadow: `0px -2px 6px ${theme.palette?.shadowColor?.main} `,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));
