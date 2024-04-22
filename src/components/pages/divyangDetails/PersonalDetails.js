import { Grid, useMediaQuery } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import { useTheme } from "@mui/material/styles";

import { StyledFormContainer, theme } from "../../../styles";
import {
  fields,
  initialValues,
} from "../../../constants/divyangDetails/personalDetails";
import {
  CustomRadioButton,
  CustomTextField,
  FileUpload,
  FormActions,
} from "../../shared";
import { getValidValues } from "../../../utils/common";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { genders } from "../../../constants/seeds";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [params] = useSearchParams();
  const isViewMode = state?.viewDetails;
  const editId = params.get("editId");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

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
              label={fields?.firstName?.label}
              name={fields?.firstName?.name}
              value={values?.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.firstName}
              touched={touched?.firstName}
              isViewMode={isViewMode}
              fieldType={fields?.firstName?.type}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.lastName?.label}
              name={fields?.lastName?.name}
              value={values?.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.lastName}
              touched={touched?.lastName}
              isViewMode={isViewMode}
              fieldType={fields?.lastName?.type}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.divyangId?.label}
              name={fields?.divyangId?.name}
              value={values?.divyangId}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.divyangId}
              touched={touched?.divyangId}
              isViewMode={isViewMode}
              fieldType={fields?.divyangId?.type}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FileUpload
              type={"image"}
              accept={"image/*"}
              setFieldValue={setFieldValue}
              name={fields?.picture?.name}
              // Blood Group
              label={fields?.picture?.label}
              defaultLabel={fields?.picture?.label}
              value={values?.picture}
              error={errors?.picture}
              touched={touched?.picture}
              onChange={(e) =>
                setFieldValue(fields?.picture?.name, e.target.files[0])
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomRadioButton
              name={fields?.gender?.name}
              label={fields?.gender?.label}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.gender || ""}
              touched={touched?.gender}
              errors={errors?.gender}
              isViewMode={isViewMode}
              accessor="code"
              inputValues={genders(true)}
              rowBreak={matches}
              labelStyle={{
                color: theme?.palette?.textColor?.blue,
                fontSize: "16px",
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.bloodGroup?.label}
              name={fields?.bloodGroup?.name}
              value={values?.bloodGroup}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.bloodGroup}
              touched={touched?.bloodGroup}
              isViewMode={isViewMode}
              fieldType={fields?.bloodGroup?.type}
            />
          </Grid>

          {/* <FormActions
            handleSubmit={handleSubmit}
            handleOnReset={handleOnReset}
            isUpdate={state?.editMode}
            disableSubmit={isViewMode}
            // handleSkip={!isLastScreen && handleSkip}
            skipLabel={!isLastScreen && "Next"}
            submitLabel="Submit"
            resetLabel={!isFirstScreen && "Prev"}
            disableCancel={isFirstScreen}
          /> */}
        </Grid>
      </StyledFormContainer>
    </Grid>
  );
};

export default PersonalDetails;
