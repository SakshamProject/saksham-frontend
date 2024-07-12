import { Grid } from "@mui/material";
import propTypes from "prop-types";
import { FormLayout, StyledFormContainer } from "../../styles";
import { BackNavigator } from "./BackNavigator";

export const FormWrapper = ({
  children,
  navigateTo,
  title,
  rowSpacing,
  columnSpacing,
  disableBackNavigator,
  formWidth,
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
        <StyledFormContainer width={formWidth || "70%"}>
          <Grid
            container
            rowSpacing={rowSpacing || 2}
            columnSpacing={columnSpacing || 3}
          >
            {children}
          </Grid>
        </StyledFormContainer>
      </FormLayout>
    </>
  );
};

FormWrapper.propTypes = {
  children: propTypes.any,
  navigateTo: propTypes.string,
  title: propTypes.string,
  rowSpacing: propTypes.number,
  columnSpacing: propTypes.number,
  disableBackNavigator: propTypes.bool,
  formWidth: propTypes.string,
  customTitle: propTypes.string,
  disableModes: propTypes.bool,
};
