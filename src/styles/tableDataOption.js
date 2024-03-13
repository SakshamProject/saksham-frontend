import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const OptionsContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  wordBreak: "break-all",
  alignItems: "center",
  width: "100%",
});

export const OptionsContainerChild = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
