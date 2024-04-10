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
  color: theme.palette?.textColor?.blue,
  border: `1px solid ${theme.palette?.borderColor?.blue}`,
  "&:hover": {
    backgroundColor: theme.palette?.backgroundColor?.white,
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  margin: "0 8px",
  height: "36px",
  backgroundColor: theme.palette?.backgroundColor?.allButton,
  color: theme.palette?.textColor?.white,
  "&:hover": {
    backgroundColor: theme.palette?.backgroundColor?.allButton,
  },
}));

export const AddButton = styled(Button)(({ theme }) => ({
  marginLeft: 15,
  height: 38,
  float: "right",
  backgroundColor: theme.palette?.backgroundColor?.green,
  color: theme.palette?.textColor?.white,
  "&:hover": {
    backgroundColor: theme.palette?.backgroundColor?.green,
  },
}));

export const NewButton = styled(IconButton)(({ theme }) => ({
  boxShadow: "0px 2px 4px #00000033",
  borderRadius: "4px",
  marginLeft: 14,
  padding: "7px  8px",
  backgroundColor: theme.palette?.backgroundColor?.allButton,
  color: theme.palette?.textColor?.white,
  "&:hover": {
    backgroundColor: theme.palette?.backgroundColor?.allButton,
    color: theme.palette?.textColor?.white,
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
    ? theme?.palette?.borderColor?.lightGrey
    : theme.palette?.textColor?.red,
}));

export const EditIcon = styled(Edit)(({ theme, disabled }) => ({
  width: 24,
  height: 24,
  color: disabled
    ? theme?.palette?.borderColor?.lightGrey
    : theme.palette?.textColor?.orange,
}));
