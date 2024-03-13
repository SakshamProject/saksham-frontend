import { Grid } from "@mui/material";
import React from "react";

import {
  CANCEL,
  SKIP,
  SUBMIT,
  UPDATE,
} from "../../constants/globalConstants.js";
import {
  CancelButton,
  StyledButtonContainer,
  SubmitButton,
} from "../../styles";

export const FormActions = ({
  isViewMode,
  disableCancel,
  handleOnReset,
  disableSubmit,
  handleSubmit,
  submitLabel = SUBMIT,
  resetLabel = CANCEL,
  isUpdate,
  handleSkip,
  skipLabel = SKIP,
  disableSkip,
}) => {
  return (
    <Grid item xs={12}>
      {isViewMode ? (
        <></>
      ) : (
        <StyledButtonContainer>
          {!disableCancel && (
            <CancelButton variant="outlined" onClick={handleOnReset}>
              {resetLabel}
            </CancelButton>
          )}
          {!disableSkip && handleSkip && (
            <CancelButton variant="outlined" onClick={handleSkip}>
              {skipLabel}
            </CancelButton>
          )}
          {disableSubmit ? (
            <></>
          ) : (
            <SubmitButton
              variant="outlined"
              disableElevation
              onClick={handleSubmit}
            >
              {isUpdate ? UPDATE : submitLabel}
            </SubmitButton>
          )}
        </StyledButtonContainer>
      )}
    </Grid>
  );
};
