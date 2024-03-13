import { Box, IconButton, Modal, styled } from "@mui/material";

export const FilterModalLayout = styled(Modal)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: "25%",
  overflow: "scroll",
  width: "55%",
  height: "100%",
  backgroundColor: "transparent",
  display: "block",
  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
  },
}));

export const FilterContainerStyle = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxWidth: "800px",
  backgroundColor: "white",
  boxShadow: 24,
  outline: 0,
});

export const FilterFormStyle = styled(Box)({
  maxHeight: 450,
  overflow: "scroll",
  overflowX: "hidden",
  margin: 0,
  padding: 0,
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#6E6E6E60",
    borderRadius: 5,
  },
  "::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

export const FilterTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 20px",
  background: `${theme?.palette.primary.main}`,
  color: theme?.palette?.textColor?.main,
}));

export const FilterIconButton = styled(IconButton)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme?.palette.primary.main,
  padding: "7px  8px",
  fontSize: 14,
  borderRadius: 4,
  color: theme?.palette?.textColor?.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme?.palette?.textColor?.main,
  },
}));

export const NewButton = styled(IconButton)(({ theme }) => ({
  color: theme?.palette?.textColor?.main,
  background: "#59B961 0% 0% no-repeat padding-box",
  backgroundColor: theme.palette.primary.main,
  boxShadow: "0px 2px 4px #00000033",
  borderRadius: "4px",
  marginLeft: 14,
  padding: "7px  8px",
  "&:hover": {
    color: theme?.palette?.textColor?.main,
    backgroundColor: theme.palette.primary.main,
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
