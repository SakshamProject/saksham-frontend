import { Divider } from "@mui/material";
import propTypes from "prop-types";
import useResponsive from "../../hooks/useResponsive";

export const DividerLine = ({ color, gap, minHeight }) => {
  const { theme } = useResponsive();

  return (
    <Divider
      style={{
        background: color || theme.palette?.commonColor?.darkBlue,
        minHeight: minHeight || 2,
        margin: gap || "4px 0 24px",
      }}
    />
  );
};

DividerLine.propTypes = {
  color: propTypes.string,
  gap: propTypes.oneOfType([propTypes.string, propTypes.number]),
  minHeight: propTypes.oneOfType([propTypes.string, propTypes.number]),
};
