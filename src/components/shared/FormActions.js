import { Grid } from "@mui/material";
import propTypes from "prop-types";
import React from "react";
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
  submitLabel,
  resetLabel,
  isUpdate,
  handleSkip,
  skipLabel,
  disableSkip,
  submitButtonStyle,
}) => {
  return (
    <Grid item xs={12}>
      {isViewMode ? (
        <></>
      ) : (
        <StyledButtonContainer>
          {!disableCancel && (
            <CancelButton variant="outlined" onClick={handleOnReset}>
              {resetLabel || "Cancel"}
            </CancelButton>
          )}
          {!disableSkip && handleSkip && (
            <CancelButton variant="outlined" onClick={handleSkip}>
              {skipLabel || "Skip"}
            </CancelButton>
          )}
          {disableSubmit ? (
            <></>
          ) : (
            <SubmitButton
              variant="outlined"
              disableElevation
              onClick={handleSubmit}
              sx={submitButtonStyle}
            >
              {isUpdate ? "Update" : submitLabel || "Submit"}
            </SubmitButton>
          )}
        </StyledButtonContainer>
      )}
    </Grid>
  );
};

FormActions.propTypes = {
  isViewMode: propTypes.bool,
  disableCancel: propTypes.bool,
  handleOnReset: propTypes.func,
  disableSubmit: propTypes.bool,
  handleSubmit: propTypes.func,
  submitLabel: propTypes.string,
  resetLabel: propTypes.string,
  isUpdate: propTypes.bool,
  handleSkip: propTypes.func,
  skipLabel: propTypes.string,
  disableSkip: propTypes.bool,
  submitButtonStyle: propTypes.object,
};
