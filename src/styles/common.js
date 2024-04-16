import { Typography, styled } from "@mui/material";

export const MultiRecordTitle = styled("span")(({ theme }) => ({
  textTransform: "capitalize",
  marginRight: "20px",
  font: "normal normal 600 18px/17px Lato",
  color: theme.palette?.textColor?.blue,
  fontSize: "19px",
  span: {
    fontWeight: "500",
    textTransform: "none",
    fontSize: "18px",
  },
}));

export const CustomTypography = styled(Typography)(({ theme }) => ({
  color: theme?.palette?.textColor?.blue,
  textTransform: "uppercase",
  fontSize: "16px",
  fontWeight: "bold",
  marginBottom: 16,
}));
