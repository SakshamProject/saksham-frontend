import { styled } from "@mui/material";

export const MultiRecordTitle = styled("span")(({ theme }) => ({
  textTransform: "capitalize",
  marginRight: "20px",
  font: "normal normal 600 18px/17px Lato",
  color: theme.palette.primary.main,
  fontSize: "19px",
  span: {
    fontWeight: "500",
    textTransform: "none",
    fontSize: "18px",
  },
}));
