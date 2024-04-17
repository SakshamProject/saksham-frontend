import { Typography, styled } from "@mui/material";

export const CustomTypography = styled(Typography)(({ theme }) => ({
  color: theme?.palette?.commonColor?.blue,
  textTransform: "uppercase",
  fontSize: "16px",
  fontWeight: "bold",
  marginBottom: 16,
}));
