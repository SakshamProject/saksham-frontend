import { styled } from "@mui/material";

const EllipsisDiv = styled("div")({
  display: "-webkit-box",
  "-webkit-line-clamp": "2",
  "-webkit-box-orient": "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  verticalAlign: "middle",
  wordWrap: "break-word",
});

export const CustomCell = ({ value, children }) => (
  <EllipsisDiv>{children || value || "--"}</EllipsisDiv>
);
