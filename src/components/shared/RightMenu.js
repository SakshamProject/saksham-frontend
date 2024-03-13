import { Popover as MuiPopper, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

const PopoverComponent = styled(MuiPopper)({
  "& .MuiPaper-root": {
    minWidth: "150px",
    width: "200px",
  },
});

const Titles = styled(Typography)(({ theme }) => ({
  padding: "14px !important",
  cursor: "pointer !important",
  font: "normal normal normal 16px/19px sans-serif !important",
  color: `${theme?.palette?.popoverColor?.main} !important`,
}));

export const RightMenu = ({ open, anchorEl, handleClose, redirect }) => {
  return (
    <PopoverComponent
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {[]?.map(({ id, label, routePath }, index) => {
        return (
          <Titles id={id} key={index} onClick={() => redirect(routePath)}>
            {label}
          </Titles>
        );
      })}
    </PopoverComponent>
  );
};
