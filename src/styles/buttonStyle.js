import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, IconButton, styled } from "@mui/material";

export const StyledButtonContainer = styled(Box)((props) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: 24,
  ...props?.style,
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  margin: "0 8px",
  marginRight: "20px !important",
  fontWeight: "bold",
  height: "36px",
  cursor: "pointer",
  color: theme.palette?.primary?.main,
  border: `1px solid ${theme.palette?.primary?.main}`,
  backgroundColor: theme.palette?.commonColor?.white,
  "&:hover": {
    backgroundColor: theme.palette?.commonColor?.white,
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  margin: "0 8px",
  height: "36px",
  borderColor: theme.palette?.primary?.main,
  backgroundColor: theme.palette?.primary?.main,
  color: theme.palette?.primary?.contrastText,
  "&:hover": {
    backgroundColor: theme.palette?.primary?.main,
    borderColor: theme.palette?.primary?.main,
  },
}));

export const AddButton = styled(Button)(({ theme }) => ({
  marginLeft: 15,
  height: 38,
  float: "right",
  backgroundColor: theme.palette?.commonColor?.green,
  color: theme.palette?.commonColor?.white,
  "&:hover": {
    backgroundColor: theme.palette?.commonColor?.green,
  },
}));

export const NewButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "4px",
  marginLeft: 14,
  padding: "7px  8px",
  borderColor: theme.palette?.primary?.main,
  backgroundColor: theme.palette?.primary?.main,
  color: theme.palette?.primary?.contrastText,
  "&:hover": {
    borderColor: theme.palette?.primary?.main,
    backgroundColor: theme.palette?.primary?.main,
  },
}));

export const StyledIconButton = styled(IconButton)(() => ({
  cursor: "pointer !important",
}));

export const DeleteIcon = styled(Delete)(({ theme, disabled }) => ({
  width: 24,
  height: 24,
  cursor: "pointer",
  color: disabled
    ? theme?.palette?.commonColor?.lightGrey
    : theme.palette?.commonColor?.red,
}));

export const EditIcon = styled(Edit)(({ theme, disabled }) => ({
  width: 24,
  height: 24,
  color: disabled
    ? theme?.palette?.commonColor?.lightGrey
    : theme.palette?.commonColor?.orange,
}));
