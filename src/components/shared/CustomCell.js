import { styled } from "@mui/material";
import propTypes from "prop-types";

const EllipsisDiv = styled("div")({
  display: "-webkit-box",
  "-webkit-line-clamp": "2",
  "-webkit-box-orient": "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  verticalAlign: "middle",
  wordWrap: "break-word",
});

export const CustomCell = ({ value, children }) => {
  return <EllipsisDiv>{children || value || "--"}</EllipsisDiv>;
};

CustomCell.propTypes = {
  value: propTypes.string,
  children: propTypes.any,
};
