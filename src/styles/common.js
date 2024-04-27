import { Typography, styled } from "@mui/material";

export const CustomTypography = styled(Typography)(({ theme, capitalize }) => ({
  color: theme?.palette?.commonColor?.blue,
  textTransform: capitalize === "capitalize" ? "capitalize" : "uppercase",
  fontSize: "16px",
  fontWeight: "bold",
  marginBottom: 16,
}));
