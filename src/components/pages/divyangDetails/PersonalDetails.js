import { Grid } from "@mui/material";
import React from "react";
import { useFormik } from "formik";

import { StyledFormContainer } from "../../../styles";
import {
  fields,
  initialValues,
} from "../../../constants/divyangDetails/personalDetails";
import { CustomTextField } from "../../shared";
import { getValidValues } from "../../../utils/common";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [params] = useSearchParams();
  const isViewMode = state?.viewDetails;
  const editId = params.get("editId");

  const handleOnSubmit = (values) => {
    const payload = getValidValues(values);
    console.log(payload);
    // onSubmit(payload);
  };

  const formik = useFormik({
    initialValues,
    // validationSchema: validationSchema,
    onSubmit: handleOnSubmit,
  });

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setValues,
  } = formik;

  return (
    <Grid direction={"column"} width={"100%"}>
      <StyledFormContainer width="100%">
        <Grid container columnSpacing={3}>
          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.name?.label}
              name={fields?.name?.name}
              value={values?.name}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.name}
              touched={touched?.name}
              isViewMode={isViewMode}
              fieldType={fields?.name?.type}
            />
          </Grid>
        </Grid>
      </StyledFormContainer>
    </Grid>
  );
};

export default PersonalDetails;
