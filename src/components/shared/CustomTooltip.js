import { Tooltip } from "@mui/material";
import propTypes from "prop-types";

const CustomTooltip = ({ children, title, placement, arrow }) => {
  return (
    <Tooltip
      title={title || ""}
      arrow={arrow || true}
      placement={placement || "bottom"}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;

CustomTooltip.propTypes = {
  children: propTypes.any,
  title: propTypes.string,
  placement: propTypes.string,
  arrow: propTypes.bool,
};
