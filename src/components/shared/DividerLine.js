import { Divider } from "@mui/material";
import propTypes from "prop-types";
import { theme } from "../../styles";

export const DividerLine = ({
  color = theme.palette?.commonColor?.darkBlue,
  gap,
}) => {
  return (
    <Divider
      style={{
        background: color,
        minHeight: 2,
        margin: gap || "4px 0 24px",
      }}
    />
  );
};

DividerLine.propTypes = {
  color: propTypes.string,
  gap: propTypes.any,
};
