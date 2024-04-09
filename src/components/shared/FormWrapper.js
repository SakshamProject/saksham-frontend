import { Grid } from "@mui/material";

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
            rowSpacing={rowSpacing || 1}
            columnSpacing={columnSpacing || 1}
          >
            {children}
          </Grid>
        </StyledFormContainer>
      </FormLayout>
    </>
  );
};
