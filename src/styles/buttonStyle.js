import MuiDeleteIcon from "@mui/icons-material/Delete";
import MuiEditIcon from "@mui/icons-material/Edit";
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
  color: theme.palette.primary.main,
  margin: "0 8px",
  marginRight: "20px !important",
  fontWeight: "bold",
  border: `1px solid ${theme.palette.primary.main}`,
  height: "36px",
  "&:hover": {
    background: "#ffffff",
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme?.palette?.textColor?.main,
  margin: "0 8px",
  height: "36px",
  "&:hover": {
    background: theme.palette.primary.main,
  },
}));

export const AddButton = styled(Button)(({ theme }) => ({
  marginLeft: 15,
  height: 40,
  backgroundColor: theme.palette.success.main,
  color: theme?.palette?.textColor?.main,
  float: "right",
  cursor: "pointer",
  "&:hover": {
    color: theme?.palette?.textColor?.main,
    backgroundColor: theme.palette.success.main,
  },
}));

export const AddIconButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: "red",
  borderRadius: "50%",
  color: theme?.palette?.textColor?.main,
  marginInline: "auto",
}));

export const DeleteIcon = styled(MuiDeleteIcon)({
  width: 30,
  height: 30,
  color: "#ff0000",
});

export const EditIcon = styled(MuiEditIcon)({
  width: 30,
  height: 30,
  color: "orange",
});

export const NewFormButton = styled(Button)(({ theme, disable = false }) => ({
  backgroundColor: "#dddddd",
  borderRadius: "4px",
  color: theme?.palette?.textColor?.main,
  fontFamily: "'Roboto', sans-serif",
  fontSize: "16px",
  boxShadow: "0px 2px 4px #00000033",
  height: "42px",
  margin: "0px 10px",
  ":hover": {
    backgroundColor: "#dddddd",
  },
}));

export const ViewButton = styled(Button)(({ theme }) => ({
  height: 30,
  padding: 10,
  backgroundColor: theme.palette.primary.main,
  color: theme?.palette?.textColor?.main,
  marginTop: 12,
  ":hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme?.palette?.textColor?.main,
  },
}));
