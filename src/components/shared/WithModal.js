import CloseIcon from "@mui/icons-material/Close";
import { Grid, Modal, Typography, styled } from "@mui/material";
import React from "react";

import { WithCondition } from ".";
import {
  CancelButton,
  FilterButtonModal,
  FilterContainerStyle,
  FilterTitle,
  SubmitButton,
  theme,
} from "../../styles";

const ModalName = styled(Typography)({
  fontSize: 20,
  width: 100,
});

const GridContainer = styled(Grid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: 0,
  paddingInline: 24,
});

export const WithModal = ({
  open,
  onClose,
  title = "",
  onConfirm,
  children,
  submitLabel = "OKAY",
  clearLabel = "CANCEL",
  disableClear = false,
  alignButtons = "center",
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <FilterContainerStyle>
        <FilterTitle>
          <ModalName
            id="modal-modal-title"
            sx={{
              color: theme.palette?.primary?.contrastText,
              width: "auto",
            }}
          >
            {title}
          </ModalName>
          <CloseIcon
            onClick={onClose}
            fontSize={"large"}
            style={{ cursor: "pointer" }}
          />
        </FilterTitle>

        <GridContainer container columnSpacing={4} rowSpacing={3}>
          {children}
        </GridContainer>

        <FilterButtonModal sx={{ justifyContent: alignButtons }}>
          <WithCondition isValid={!disableClear}>
            <CancelButton
              sx={{ px: 3 }}
              onClick={onClose}
              style={{ cursor: "pointer" }}
            >
              {clearLabel}
            </CancelButton>
          </WithCondition>

          <SubmitButton
            variant="contained"
            type="submit"
            sx={{ px: 3 }}
            onClick={onConfirm}
          >
            {submitLabel}
          </SubmitButton>
        </FilterButtonModal>
      </FilterContainerStyle>
    </Modal>
  );
};
