import { MoreHorizTwoTone } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Popover as MuiPopper,
  styled,
  Typography,
} from "@mui/material";
import propTypes from "prop-types";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import CustomTooltip from "./CustomTooltip";

const PopoverComponent = styled(MuiPopper)({
  ".MuiPaper-root": {
    minWidth: "150px",
  },
});

const Titles = styled(Typography)(({ theme }) => ({
  padding: "14px !important",
  cursor: "pointer !important",
  font: "normal normal normal 16px/19px sans-serif !important",
  color: `${theme?.palette?.commonColor?.black} !important`,
}));

export const EditPopover = ({ inputValues, disable }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleNavigate = (id, path, view, search, stateProps, onClick) => {
    if (onClick) onClick();
    else if (path)
      navigate(
        {
          pathname: path,
          search: `?${createSearchParams({
            // editId: id,
            ...search,
          })}`,
        },
        { state: { viewDetails: Boolean(view), editId: id, ...stateProps } }
      );
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "end" }}>
      <CustomTooltip title={"More actions"}>
          <IconButton
            aria-describedby={id}
            onClick={handleClick}
            disabled={disable}
          >
            <MoreHorizTwoTone />
          </IconButton>
      </CustomTooltip>

      {open ? (
        <PopoverComponent
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {inputValues?.map(
            (
              {
                id,
                path,
                label,
                toHide,
                customNavigation,
                customComp,
                view,
                search,
                stateProps = {},
                onClick,
              },
              index
            ) =>
              !toHide ? (
                customComp ? (
                  <Titles key={index + label}>{customComp}</Titles>
                ) : (
                  <Titles
                    key={index + label}
                    onClick={() =>
                      customNavigation
                        ? customNavigation(id)
                        : handleNavigate(
                            id,
                            path,
                            view,
                            search,
                            stateProps,
                            onClick
                          )
                    }
                  >
                    {label}
                  </Titles>
                )
              ) : (
                <></>
              )
          )}
        </PopoverComponent>
      ) : (
        <></>
      )}
    </Box>
  );
};

EditPopover.propTypes = {
  inputValues: propTypes.array,
  disable: propTypes.bool,
};
