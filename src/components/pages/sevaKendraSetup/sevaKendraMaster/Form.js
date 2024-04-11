import React from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  CustomDatePicker,
  CustomTextField,
  DividerLine,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
} from "../../../shared";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import { Grid, Typography } from "@mui/material";
import {
  fields,
  initialValues,
} from "../../../../constants/sevaKendraSetup/master";
import { getValidValues } from "../../../../utils/common";
import { getApiService, getByIdApiService } from "../../../../api/api";
import { API_PATHS } from "../../../../api/apiPaths";
import useNotify from "../../../../hooks/useNotify";
import { validationSchema } from "../../../../validations/sevaKendraSetup/master";
import { theme } from "../../../../styles";
import styled from "@emotion/styled";
import CustomAutoComplete from "../../../shared/formFields/CustomAutoComplete";

const CustomTypography = styled(Typography)({
  color: theme.palette.textColor.blue,
  textTransform: "uppercase",
  fontSize: "16px",
  fontWeight: "bold",
  marginBottom: 16,
});

const Form = () => {
  const { notifySuccess } = useNotify();
  const { state } = useLocation();
  const isViewMode = state?.viewDetails;
  const navigate = useNavigate();

  const handleOnSubmit = (values) => {
    const payload = getValidValues(values);
    // onSubmit(payload);
    console.log(JSON.stringify(payload));
    console.log(payload);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
    enableReinitialize: true,
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
    handleReset,
  } = formik;

  const { data: stateList } = useQuery({
    queryKey: ["getAllStates"],
    queryFn: () => getApiService(API_PATHS.STATES),
    select: ({ data }) => data?.data,
  });

  const { data: districtList } = useQuery({
    queryKey: ["getAllDistrictByState", values?.stateId],
    queryFn: () => getByIdApiService(API_PATHS.STATES, values?.stateId),
    select: ({ data }) => data?.data,
    enabled: !!values?.stateId,
  });

  const { data: serviceTypeList } = useQuery({
    queryKey: ["getAllServiceTypes"],
    queryFn: () => getApiService(API_PATHS?.SERVICES),
    select: ({ data }) => data?.data,
  });

  return (
    <FormWrapper
      title="Seva Kendra"
      navigateTo={ROUTE_PATHS.SEVA_KENDRA_MASTER_LIST}
      columnSpacing={3}
    >
      <Grid item xs={12}>
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

      <Grid item xs={6}>
        <SingleAutoComplete
          label={fields?.stateId?.label}
          name={fields?.stateId?.name}
          value={values?.stateId}
          onChange={(_, value) => {
            setFieldValue(fields?.stateId?.name, value);
          }}
          onBlur={handleBlur}
          errors={errors?.stateId}
          touched={touched?.stateId}
          inputValues={stateList || []}
          accessor={fields?.stateId?.accessor}
        />
      </Grid>

      <Grid item xs={6}>
        <SingleAutoComplete
          label={fields?.districtId?.label}
          name={fields?.districtId?.name}
          value={values?.districtId}
          onChange={(_, value) => {
            setFieldValue(fields?.districtId?.name, value);
          }}
          onBlur={handleBlur}
          errors={errors?.districtId}
          touched={touched?.districtId}
          inputValues={districtList?.districts || []}
          accessor={fields?.districtId?.accessor}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTextField
          label={fields?.address?.label}
          name={fields?.address?.name}
          value={values?.address}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.address}
          touched={touched?.address}
          isViewMode={isViewMode}
          type={fields?.address?.type}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.landlineNumber?.label}
          name={fields?.landlineNumber?.name}
          value={values?.landlineNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.landlineNumber}
          touched={touched?.landlineNumber}
          isViewMode={isViewMode}
          fieldType={fields?.landlineNumber?.type}
          maxLength={10}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.mobileNo?.label}
          name={fields?.mobileNo?.name}
          value={values?.mobileNo}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.mobileNo}
          touched={touched?.mobileNo}
          isViewMode={isViewMode}
          fieldType={fields?.mobileNo?.type}
          maxLength={10}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomDatePicker
          label={fields?.startDate?.label}
          name={fields?.startDate?.name}
          value={values?.startDate}
          onChange={setFieldValue}
          isViewMode={isViewMode}
          fullWidth
          onBlur={handleBlur}
          setTouched={setFieldTouched}
          errors={errors?.startDate}
          touched={touched?.startDate}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine gap={"6px 0 24px"} />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.contactPersonName?.label}
          name={fields?.contactPersonName?.name}
          value={values?.contactPersonName}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.contactPersonName}
          touched={touched?.contactPersonName}
          isViewMode={isViewMode}
          fieldType={fields?.contactPersonName?.type}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.emailId?.label}
          name={fields?.emailId?.name}
          value={values?.emailId}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.emailId}
          touched={touched?.emailId}
          isViewMode={isViewMode}
          fieldType={fields?.emailId?.type}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.phoneNumber1?.label}
          name={fields?.phoneNumber1?.name}
          value={values?.phoneNumber1}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.phoneNumber1}
          touched={touched?.phoneNumber1}
          isViewMode={isViewMode}
          fieldType={fields?.phoneNumber1?.type}
          maxLength={10}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.phoneNumber2?.label}
          name={fields?.phoneNumber2?.name}
          value={values?.phoneNumber2}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.phoneNumber2}
          touched={touched?.phoneNumber2}
          isViewMode={isViewMode}
          fieldType={fields?.phoneNumber2?.type}
          maxLength={10}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine gap={"6px 0 24px"} />
      </Grid>

      <Grid item xs={12}>
        <CustomTypography variant="h6">
          Service Provided by this Seva Kendra
        </CustomTypography>
      </Grid>

      <Grid item xs={12}>
        <CustomAutoComplete
          label={fields?.serviceTypes.label}
          name={fields?.serviceTypes.name}
          value={values?.serviceTypes}
          onChange={(_, value) => {
            setFieldValue(fields?.serviceTypes.name, [...value]);
          }}
          onBlur={handleBlur}
          touched={touched?.serviceTypes}
          error={errors?.serviceTypes}
          isViewMode={isViewMode}
          inputValues={serviceTypeList || []}
          // accessor={fields?.serviceTypes.accessor}
          // labelAccessor="role"
        />
      </Grid>

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={() => {
          navigate(ROUTE_PATHS?.SEVA_KENDRA_MASTER_LIST);
        }}
        isUpdate={false}
      />
    </FormWrapper>
  );
};

export default Form;
