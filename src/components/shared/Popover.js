import { Popover as MuiPopover, Typography } from "@mui/material";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const Popover = ({
  menuItems,
  anchorEl,
  onClose,
  open,
  menuAction,
  anchorOrigin,
  transformOrigin,
  popoverStyle,
  popoverItemStyle,
}) => {
  const navigate = useNavigate();

  const handleMenuClick = (menu) => () => {
    menu?.navigateTo && navigate(menu?.navigateTo);
    menuAction && menuAction();
    onClose();
  };

  return (
    <MuiPopover
      component={"div"}
      onClose={onClose}
      anchorEl={anchorEl}
      open={open}
      style={popoverStyle}
      anchorOrigin={anchorOrigin || { vertical: "top", horizontal: "right" }}
      transformOrigin={
        transformOrigin || { vertical: "top", horizontal: "left" }
      }
    >
      {menuItems?.map((item) => (
        <Typography
          key={item?.name}
          style={popoverItemStyle}
          onClick={handleMenuClick(item)}
        >
          {item?.name}
        </Typography>
      ))}
    </MuiPopover>
  );
};

Popover.propTypes = {
  menuItems: propTypes.array,
  anchorEl: propTypes.any,
  onClose: propTypes.func,
  open: propTypes.any,
  menuAction: propTypes.func,
  anchorOrigin: propTypes.object,
  transformOrigin: propTypes.object,
  popoverStyle: propTypes.object,
  popoverItemStyle: propTypes.object,
};
