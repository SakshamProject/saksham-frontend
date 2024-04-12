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
  WithCondition,
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
import StatusFields from "../../../shared/StatusFields";

const CustomTypography = styled(Typography)({
  color: theme?.palette?.textColor?.blue,
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
      navigateTo={ROUTE_PATHS?.SEVA_KENDRA_MASTER_LIST}
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
          label={fields?.landLineNumber?.label}
          name={fields?.landLineNumber?.name}
          value={values?.landLineNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.landLineNumber}
          touched={touched?.landLineNumber}
          isViewMode={isViewMode}
          fieldType={fields?.landLineNumber?.type}
          maxLength={10}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.mobileNumber?.label}
          name={fields?.mobileNumber?.name}
          value={values?.mobileNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.mobileNumber}
          touched={touched?.mobileNumber}
          isViewMode={isViewMode}
          fieldType={fields?.mobileNumber?.type}
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
          label={fields?.contactPersonId?.label}
          name={fields?.contactPersonId?.name}
          value={values?.contactPersonId}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.contactPersonId}
          touched={touched?.contactPersonId}
          isViewMode={isViewMode}
          fieldType={fields?.contactPersonId?.type}
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

      {/* <WithCondition isValid={editId}>
        <StatusFields
          setFieldTouched={setFieldTouched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          values={values}
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
          statusSeeds={statusSeeds}
          isViewMode={isViewMode}
          rowBreak={false}
          // statusHistory={clientDetail?.data?.status}
          disableListLayout
        />
      </WithCondition> */}

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={() => {
          navigate(ROUTE_PATHS?.SEVA_KENDRA_MASTER_LIST);
        }}
        isUpdate={false}
      />

      {/* {editId ? <AuditLog data={parameterDetails?.data} /> : <></>} */}
    </FormWrapper>
  );
};

export default Form;
