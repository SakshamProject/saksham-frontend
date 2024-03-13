import { Grid } from "@mui/material";
import React from "react";

import { FormLayout, StyledFormContainer } from "../../styles";
import { BackNavigator } from "./BackNavigator";

export const FormWrapper = ({
  children,
  navigateTo = "",
  title = "",
  rowSpacing,
  columnSpacing,
  disableBackNavigator,
  formWidth = "70%",
  customTitle,
  disableModes,
}) => {
  return (
    <>
      {!disableBackNavigator && (
        <BackNavigator
          title={title}
          navigateTo={navigateTo}
          customTitle={customTitle}
          disableModes={disableModes}
        />
      )}

      <FormLayout>
        <StyledFormContainer width={formWidth}>
          <Grid
            container
            rowSpacing={rowSpacing || 3}
            columnSpacing={columnSpacing || 3}
          >
            {children}
          </Grid>
        </StyledFormContainer>
      </FormLayout>
    </>
  );
};
