import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { getValidValues } from "../../../utils/common";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import {
  fields,
  initialValues,
} from "../../../constants/divyangDetails/disabilityDetails";
import { validationSchema } from "../../../validations/divyangDetails/disabilityDetails";
import {
  CustomDatePicker,
  CustomRadioButton,
  CustomReactTable,
  CustomTextField,
  DividerLine,
  DivyangDetail,
  FileUpload,
  FormActions,
  SingleAutoComplete,
  WithCondition,
} from "../../shared";
import { CustomTypography, StyledFormContainer, theme } from "../../../styles";
import { API_PATHS } from "../../../api/apiPaths";
import { getApiService, getByIdApiService } from "../../../api/api";
import { yesNoSeed } from "../../../constants/seeds";
import { tableStyles } from "../../../constants/typeMasters/stateMaster";
import { CODES } from "../../../constants/globalConstants";

const DisabilityDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [params] = useSearchParams();
  const isViewMode = state?.viewDetails;
  const editId = params.get("editId");

  const handleOnReset = () => navigate(ROUTE_PATHS?.DIVYANG_DETAILS_LIST);
  const handleSkip = () => navigate(ROUTE_PATHS?.DIVYANG_DETAILS_FORM_ADDRESS);

  const handleOnSubmit = (values) => {
    const payload = getValidValues(values);
    console.log(payload);
    // onSubmit(payload);
    // navigate(ROUTE_PATHS?.DIVYANG_DETAILS_LIST);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
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
    setTouched,
  } = formik;

  const { data: disabilityTypes } = useQuery({
    queryKey: ["disabilityTypes"],
    queryFn: () => getApiService(API_PATHS?.DISABILITY_TYPE),
    select: ({ data }) => data?.data,
  });

  const { data: disabilitySubTypes } = useQuery({
    queryKey: ["disabilitySubTypes", values?.disabilityType],
    queryFn: () =>
      getByIdApiService(API_PATHS?.DISABILITY_TYPE, values?.disabilityType),
    select: ({ data }) => data?.data,
    enabled: !!values?.disabilityType,
  });

  return (
    <Grid container direction={"column"} width={"100%"} rowSpacing={2}>
      <Grid item xs={12}>
        <DivyangDetail />
      </Grid>
      <Grid item xs={12}>
        <StyledFormContainer width="100%">
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item xs={12} md={6}>
              <SingleAutoComplete
                label={fields?.disabilityType?.label}
                name={fields?.disabilityType?.name}
                value={values?.disabilityType}
                onChange={(_, value) => {
                  setFieldValue(fields?.disabilityType?.name, value);
                  setFieldValue(fields?.disabilities?.name, "");
                  setFieldTouched(fields?.disabilities?.name, false);
                }}
                onBlur={handleBlur}
                errors={errors?.disabilityType}
                touched={touched?.disabilityType}
                inputValues={disabilityTypes || []}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SingleAutoComplete
                label={fields?.disabilities?.label}
                name={fields?.disabilities?.name}
                value={values?.disabilities}
                onChange={(_, value) => {
                  setFieldValue(fields?.disabilities?.name, value);
                }}
                onBlur={handleBlur}
                errors={errors?.disabilities}
                touched={touched?.disabilities}
                inputValues={disabilitySubTypes?.disability || []}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomRadioButton
                name={fields?.isDisabilitySinceBirth?.name}
                label={fields?.isDisabilitySinceBirth?.label}
                onChange={(_, value) => {
                  setValues({
                    ...values,
                    isDisabilitySinceBirth: value,
                    disabilitySince: "",
                  });
                  setFieldTouched(fields?.disabilitySince?.name, false);
                }}
                onBlur={handleBlur}
                value={values?.isDisabilitySinceBirth || ""}
                touched={touched?.isDisabilitySinceBirth}
                errors={errors?.isDisabilitySinceBirth}
                isViewMode={isViewMode}
                inputValues={yesNoSeed}
                rowBreak
                labelStyle={{
                  color: theme?.palette?.commonColor?.blue,
                  fontSize: "16px",
                }}
              />
            </Grid>

            <WithCondition
              isValid={values?.isDisabilitySinceBirth === CODES?.NO}
            >
              <Grid item xs={12} md={6}>
                <CustomDatePicker
                  label={fields?.disabilitySince?.label}
                  name={fields?.disabilitySince?.name}
                  value={values?.disabilitySince}
                  onChange={setFieldValue}
                  isViewMode={isViewMode}
                  maxDate={new Date()}
                  onBlur={handleBlur}
                  setTouched={setFieldTouched}
                  errors={errors?.disabilitySince}
                  touched={touched?.disabilitySince}
                />
              </Grid>

              <Grid item xs={12} md={6} />
            </WithCondition>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.disabilityArea?.label}
                name={fields?.disabilityArea?.name}
                value={values?.disabilityArea}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.disabilityArea}
                touched={touched?.disabilityArea}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.disabilityPercentage?.label}
                name={fields?.disabilityPercentage?.name}
                value={values?.disabilityPercentage}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.disabilityPercentage}
                touched={touched?.disabilityPercentage}
                isViewMode={isViewMode}
                maxLength={3}
                fieldType={fields?.disabilityPercentage?.type}
                endAdornment={
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: theme?.palette?.commonColor?.adornment,
                      userSelect: "none",
                    }}
                  >
                    %
                  </Typography>
                }
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label={fields?.disabilityDueTo?.label}
                name={fields?.disabilityDueTo?.name}
                value={values?.disabilityDueTo}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.disabilityDueTo}
                touched={touched?.disabilityDueTo}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12}>
              <SingleAutoComplete
                label={fields?.certificateIssuingAuthority?.label}
                name={fields?.certificateIssuingAuthority?.name}
                value={values?.certificateIssuingAuthority}
                onChange={(_, value) => {
                  setFieldValue(
                    fields?.certificateIssuingAuthority?.name,
                    value
                  );
                }}
                onBlur={handleBlur}
                errors={errors?.certificateIssuingAuthority}
                touched={touched?.certificateIssuingAuthority}
                inputValues={[] || []}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                name={fields?.disabilityCard?.name}
                label={fields?.disabilityCard?.label}
                defaultLabel={fields?.disabilityCard?.label}
                value={values?.disabilityCard}
                error={errors?.disabilityCard}
                touched={touched?.disabilityCard}
                onChange={(e) =>
                  setFieldValue(
                    fields?.disabilityCard?.name,
                    e?.target?.files[0]
                  )
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomDatePicker
                label={fields?.dateOfIssue?.label}
                name={fields?.dateOfIssue?.name}
                value={values?.dateOfIssue}
                onChange={setFieldValue}
                isViewMode={isViewMode}
                maxDate={new Date()}
                onBlur={handleBlur}
                setTouched={setFieldTouched}
                errors={errors?.dateOfIssue}
                touched={touched?.dateOfIssue}
              />
            </Grid>

            {/* <FormActions
              handleSubmit={handleSubmit}
              handleOnReset={() => {
                handleReset();
                setTableEditId("");
              }}
              resetLabel={"Clear"}
              isUpdate={tableEditId}
              submitLabel="Add"
            /> */}

            <Grid item xs={12} mb={6}>
              <CustomReactTable
                columnData={[] || []}
                rawData={[] || []}
                manualSort
                disablePagination
                disableLayout
                count={0}
                style={tableStyles}
              />
            </Grid>

            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <Grid item xs={12}>
              <CustomTypography capitalize={"capitalize"}>
                State Disability Book Details
              </CustomTypography>
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.stateCode?.label}
                name={fields?.stateCode?.name}
                value={values?.stateCode}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.stateCode}
                touched={touched?.stateCode}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.districtCode?.label}
                name={fields?.districtCode?.name}
                value={values?.districtCode}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.districtCode}
                touched={touched?.districtCode}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.identityCardNumber?.label}
                name={fields?.identityCardNumber?.name}
                value={values?.identityCardNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.identityCardNumber}
                touched={touched?.identityCardNumber}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.udidCardNumber?.label}
                name={fields?.udidCardNumber?.name}
                value={values?.udidCardNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.udidCardNumber}
                touched={touched?.udidCardNumber}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.udidEnrollmentNumber?.label}
                name={fields?.udidEnrollmentNumber?.name}
                value={values?.udidEnrollmentNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.udidEnrollmentNumber}
                touched={touched?.udidEnrollmentNumber}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                name={fields?.udidCardUrl?.name}
                label={fields?.udidCardUrl?.label}
                defaultLabel={fields?.udidCardUrl?.label}
                value={values?.udidCardUrl}
                error={errors?.udidCardUrl}
                touched={touched?.udidCardUrl}
                onChange={(e) =>
                  setFieldValue(fields?.udidCardUrl?.name, e?.target?.files[0])
                }
              />
            </Grid>

            <FormActions
              handleSubmit={handleSubmit}
              handleOnReset={handleOnReset}
              isUpdate={!!editId}
              isViewMode={isViewMode}
              disableSubmit={isViewMode}
              handleSkip={handleSkip}
              skipLabel={"Prev"}
              submitLabel={"Save\xa0&\xa0Next"}
            />
          </Grid>
        </StyledFormContainer>
      </Grid>
    </Grid>
  );
};

export default DisabilityDetails;
