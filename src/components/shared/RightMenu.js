import { Popover as MuiPopper, styled } from "@mui/material";
import Typography from "@mui/material/Typography";

import { RIGHT_SIDE_MENU } from "../../constants/menus";

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
  color: `${theme.palette?.textColor?.main} !important`,
}));

export const RightMenu = ({ open, anchorEl, handleClose, redirect }) => {
  return (
    <PopoverComponent
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {RIGHT_SIDE_MENU()?.map(({ label, routePath }, key) => (
        <Titles key={key} onClick={() => redirect(routePath)}>
          {label}
        </Titles>
      ))}
    </PopoverComponent>
  );
};
