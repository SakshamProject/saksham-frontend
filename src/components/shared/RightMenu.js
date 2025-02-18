import { Popover as MuiPopper, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import propTypes from "prop-types";
import useResponsive from "../../hooks/useResponsive";

const PopoverComponent = styled(MuiPopper)({
  ".MuiPaper-root": {
    minWidth: "200px",
    width: "auto",
  },
});

const Titles = styled(Typography)(({ theme }) => ({
  padding: "14px !important",
  cursor: "pointer !important",
  font: "normal normal normal 16px/19px sans-serif !important",
  color: `${theme.palette?.commonColor?.black} !important`,
}));

export const RightMenu = ({
  open,
  anchorEl,
  handleClose,
  redirect,
  menuList,
}) => {
  const { theme } = useResponsive();

  return (
    <PopoverComponent
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {menuList?.map(({ label, routePath }, key) => (
        <Titles
          key={key + label}
          style={{
            borderBottom:
              key === menuList?.length - 1
                ? "none"
                : `1px solid ${theme.palette?.commonColor?.grey}`,
          }}
          onClick={() => redirect(routePath)}
        >
          {label}
        </Titles>
      ))}
    </PopoverComponent>
  );
};

RightMenu.propTypes = {
  open: propTypes.bool,
  anchorEl: propTypes.any,
  handleClose: propTypes.func,
  redirect: propTypes.func,
  menuList: propTypes.array,
};
