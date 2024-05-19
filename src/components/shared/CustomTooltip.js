import { Tooltip } from "@mui/material";
import propTypes from "prop-types";

const CustomTooltip = ({ children, title, placement, arrow }) => {
  return (
    <span>
      <Tooltip
        title={title || ""}
        arrow={!arrow || true}
        placement={placement || "bottom"}
      >
        {children}
      </Tooltip>
    </span>
  );
};

export default CustomTooltip;

CustomTooltip.propTypes = {
  children: propTypes.any,
  title: propTypes.string,
  placement: propTypes.string,
  arrow: propTypes.bool,
};
