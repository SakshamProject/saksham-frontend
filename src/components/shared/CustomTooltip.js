import { Tooltip } from "@mui/material";
import propTypes from "prop-types";

const CustomTooltip = ({ children, title, placement, disableArrow }) => {
  return (
    <span>
      <Tooltip
        title={title || ""}
        arrow={!disableArrow || true}
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
  disableArrow: propTypes.bool,
};
