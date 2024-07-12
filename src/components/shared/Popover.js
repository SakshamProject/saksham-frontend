import { Popover as MuiPopover, Typography } from "@mui/material";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";

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
  const { theme } = useResponsive();

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
      {menuItems?.map((item, index) => (
        <Typography
          key={item?.name}
          style={{
            ...popoverItemStyle,
            borderBottom:
              index === menuItems?.length - 1
                ? "none"
                : `1px solid ${theme.palette?.commonColor?.grey}`,
          }}
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
