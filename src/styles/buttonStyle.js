import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";

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
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  "&:hover": {
    background: theme.palette.text.white,
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  margin: "0 8px",
  height: "36px",
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    background: theme.palette.primary.main,
  },
}));

export const AddButton = styled(Button)(({ theme }) => ({
  marginLeft: 15,
  height: 38,
  float: "right",
  backgroundColor: theme.palette.success.main,
  color: theme.palette.success.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.success.main,
  },
}));

export const DeleteIcon = styled(Delete)(({ theme }) => ({
  width: 30,
  height: 30,
  cursor: "pointer",
  color: theme.palette.error.main,
}));

export const EditIcon = styled(Edit)(({ theme }) => ({
  width: 30,
  height: 30,
  color: theme.palette.warning.main,
}));
