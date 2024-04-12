import React from "react";
import { Box, Grid, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  CancelButton,
  FilterButtonModal,
  FilterTitle,
  SubmitButton,
  theme,
} from "../../styles";
import { CANCEL, DELETE, OKAY } from "../../constants/globalConstants";
import styled from "@emotion/styled";

const FilterContainerStyle = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  maxWidth: "800px",
  backgroundColor: theme.palette?.backgroundColor?.white,
  boxShadow: 24,
  outline: 0,
}));

const FilterFormStyle = styled(Box)(({ theme }) => ({
  maxHeight: 450,
  overflow: "auto",
  overflowX: "hidden",
  margin: 0,
  padding: "14px 20px",
  scrollbarWidth: "thin",
  scrollbarColor: `${theme?.palette?.backgroundColor?.grey} ${theme?.palette?.backgroundColor?.lightGrey}`,
}));

const CustomModal = ({ open, setOpen, title, handle, content }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={!!open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        ".MuiModal-backdrop": {
          backgroundColor: "rgba(0,0,0,0.5)",
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
            sx={{ color: theme?.palette?.textColor?.white }}
          >
            {title || DELETE}
          </Typography>
          <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
        </FilterTitle>

        <FilterFormStyle>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: theme?.palette?.textColor?.main }}
          >
            {content}
          </Typography>
        </FilterFormStyle>
        <FilterButtonModal>
          <CancelButton onClick={handleClose}>{CANCEL}</CancelButton>

          <SubmitButton variant="contained" onClick={handle}>
            {OKAY}
          </SubmitButton>
        </FilterButtonModal>
      </FilterContainerStyle>
    </Modal>
  );
};

export default CustomModal;
