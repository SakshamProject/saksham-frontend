import { styled } from "@mui/material";

export const MultiRecordTitle = styled("span")(({ theme }) => ({
  textTransform: "capitalize",
  marginRight: "20px",
  font: "normal normal 600 18px/17px Lato",
  color: `${theme?.palette.primary.main}`,
  fontSize: "19px",
  span: {
    fontWeight: "500",
    textTransform: "none",
    fontSize: "18px",
  },
}));

export const EllipsisDiv = styled("div")({
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
