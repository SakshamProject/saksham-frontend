import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Modal, Typography } from "@mui/material";
import propTypes from "prop-types";
import React from "react";
import {
  CancelButton,
  FilterButtonModal,
  FilterTitle,
  SubmitButton,
  theme,
} from "../../styles";
import { scrollbarStyle } from "../../styles/scrollbarStyle";

const FilterContainerStyle = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  maxWidth: "800px",
  backgroundColor: theme.palette?.commonColor?.white,
  boxShadow: 24,
  outline: 0,
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

const FilterFormStyle = styled(Box)(({ theme }) => ({
  maxHeight: 450,
  overflow: "auto",
  overflowX: "hidden",
  margin: 0,
  padding: "14px 20px",
  ...scrollbarStyle(),
}));

export const CustomModal = ({ open, setOpen, title, handle, content }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={!!open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        ".MuiModal-backdrop": {
          backgroundColor: theme.palette?.shadowColor?.main,
        },
      }}
      onKeyDown={(e) => {
        e.key === "Enter" && handle();
      }}
    >
      <FilterContainerStyle>
        <FilterTitle>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              color: theme?.palette?.commonColor?.white,
            }}
          >
            {title || "Delete"}
          </Typography>
          <CloseIcon
            onClick={handleClose}
            style={{
              cursor: "pointer",
            }}
          />
        </FilterTitle>

        <FilterFormStyle>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: theme?.palette?.commonColor?.black, fontSize: "16px" }}
          >
            {content}
          </Typography>
        </FilterFormStyle>
        <FilterButtonModal>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>

          <SubmitButton variant="contained" onClick={handle}>
            Okay
          </SubmitButton>
        </FilterButtonModal>
      </FilterContainerStyle>
    </Modal>
  );
};

CustomModal.propTypes = {
  open: propTypes.any,
  setOpen: propTypes.func,
  title: propTypes.string,
  handle: propTypes.func,
  content: propTypes.any,
};
