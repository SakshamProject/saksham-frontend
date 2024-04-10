import React from "react";

import { CustomTextField, FormWrapper } from "../../../shared";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import { Grid } from "@mui/material";
import { fields } from "../../../../constants/sevaKendraSetup/master";

const Form = () => {
  return (
    <FormWrapper
      title="Seva Kendra"
      navigateTo={ROUTE_PATHS.SEVA_KENDRA_MASTER_LIST}
    >
      <Grid item xs={12}>
        <CustomTextField
          label={fields?.name?.label}
          name={fields?.name?.name}
          // value={values?.gracePeriod}
          // onChange={handleRadio}
          // onBlur={handleBlur}
          // errors={errors?.gracePeriod}
          // touched={touched?.gracePeriod}
          // isViewMode={isViewMode}
          // type={labels?.gracePeriod.type}
          // maxLength={labels?.gracePeriod.maxLength}
        />
      </Grid>
    </FormWrapper>
  );
};

export default Form;
