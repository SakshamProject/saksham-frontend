import React from "react";
import { useFormik } from "formik";
import { Grid } from "@mui/material";

import { ROUTE_PATHS } from "../../../routes/routePaths";
import {
  AuditLog,
  CustomDatePicker,
  CustomRadioButton,
  CustomTextField,
  DividerLine,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
  DivyangDetail,
} from "../../shared";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { formFields } from "../../../constants/serviceMapping/serviceMapping";
import { CustomTypography, theme } from "../../../styles";

const Form = () => {
  const { state } = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const isViewMode = state?.viewDetails;
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik({});

  const handleOnReset = () => navigate(ROUTE_PATHS.SERVICE_MAPPING_LIST);

  return (
    <FormWrapper
      title="Service Mapping"
      navigateTo={ROUTE_PATHS?.SERVICE_MAPPING_LIST}
    >
      <Grid item xs={12}>
        <CustomTypography
          sx={{ marginBottom: 0, color: theme.palette?.commonColor?.black }}
        >
          Search Divyang
        </CustomTypography>
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={formFields?.searchDivyangId?.label}
          name={formFields?.searchDivyangId?.name}
          value={values?.searchDivyangId}
          errors={errors?.searchDivyangId}
          touched={touched?.searchDivyangId}
          onChange={handleChange}
          onBlur={handleBlur}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={formFields?.searchMobileNo?.label}
          name={formFields?.searchMobileNo?.name}
          value={values?.searchMobileNo}
          errors={errors?.searchMobileNo}
          touched={touched?.searchMobileNo}
          onChange={handleChange}
          onBlur={handleBlur}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={formFields?.searchAadharNo?.label}
          name={formFields?.searchAadharNo?.name}
          value={values?.searchAadharNo}
          errors={errors?.searchAadharNo}
          touched={touched?.searchAadharNo}
          onChange={handleChange}
          onBlur={handleBlur}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={formFields?.searchUDIDNo?.label}
          name={formFields?.searchUDIDNo?.name}
          value={values?.searchUDIDNo}
          errors={errors?.searchUDIDNo}
          touched={touched?.searchUDIDNo}
          onChange={handleChange}
          onBlur={handleBlur}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12}>
        <DivyangDetail />
      </Grid>

      <Grid item xs={12}>
        <DividerLine />
      </Grid>

      <Grid item xs={6}>
        <SingleAutoComplete
          label={formFields?.state?.label}
          name={formFields?.state?.name}
          value={values?.state}
          errors={errors?.state}
          touched={touched?.state}
          onChange={(_, value) => {
            setFieldValue(formFields?.state?.name, value);
          }}
          onBlur={handleBlur}
          inputValues={[]}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <SingleAutoComplete
          label={formFields?.district?.label}
          name={formFields?.district?.name}
          value={values?.district}
          errors={errors?.district}
          touched={touched?.district}
          onChange={(_, value) => {
            setFieldValue(formFields?.district?.name, value);
          }}
          onBlur={handleBlur}
          inputValues={[]}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12}>
        <SingleAutoComplete
          label={formFields?.sevaKendra?.label}
          name={formFields?.sevaKendra?.name}
          value={values?.sevaKendra}
          errors={errors?.sevaKendra}
          touched={touched?.sevaKendra}
          onChange={(_, value) =>
            setFieldValue(formFields?.sevaKendra?.name, value)
          }
          onBlur={handleBlur}
          inputValues={[]}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12}>
        <SingleAutoComplete
          label={formFields?.assignUser?.label}
          name={formFields?.assignUser?.name}
          value={values?.assignUser}
          errors={errors?.assignUser}
          touched={touched?.assignUser}
          onChange={(_, value) => {
            setFieldValue(formFields?.assignUser?.name, value);
          }}
          onBlur={handleBlur}
          inputValues={[]}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine />
      </Grid>

      <Grid item xs={6}>
        <SingleAutoComplete
          label={formFields?.serviceType?.label}
          name={formFields?.serviceType?.name}
          value={values?.serviceType}
          errors={errors?.serviceType}
          touched={touched?.serviceType}
          onChange={(_, value) => {
            setFieldValue(formFields?.serviceType?.name, value);
          }}
          onBlur={handleBlur}
          inputValues={[]}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <SingleAutoComplete
          label={formFields?.serviceSubtype?.label}
          name={formFields?.serviceSubtype?.name}
          value={values?.serviceSubtype}
          errors={errors?.serviceSubtype}
          touched={touched?.serviceSubtype}
          onChange={(_, value) => {
            setFieldValue(formFields?.serviceSubtype?.name, value);
          }}
          onBlur={handleBlur}
          inputValues={[]}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12}>
        <SingleAutoComplete
          label={formFields?.service?.label}
          name={formFields?.service?.name}
          value={values?.service}
          errors={errors?.service}
          touched={touched?.service}
          onChange={(_, value) => {
            setFieldValue(formFields?.service?.name, value);
          }}
          onBlur={handleBlur}
          inputValues={[]}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomDatePicker
          name={formFields?.dateOfService?.name}
          label={formFields?.dateOfService?.label}
          value={values?.dateOfService}
          errors={errors?.dateOfService}
          touched={touched?.dateOfService}
          onChange={setFieldValue}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomDatePicker
          name={formFields?.completedBefore?.name}
          label={formFields?.completedBefore?.label}
          value={values?.completedBefore}
          errors={errors?.completedBefore}
          touched={touched?.completedBefore}
          onChange={setFieldValue}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine />
      </Grid>

      <Grid item xs={12}>
        <CustomTypography
          sx={{
            marginBottom: 0,
            color: theme.palette?.commonColor?.black,
          }}
        >
          FORWARD TO NON SEVA KENDRA VOLUNTEER
        </CustomTypography>
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={formFields?.contactPersonName?.label}
          name={formFields?.contactPersonName?.name}
          value={values?.contactPersonName}
          errors={errors?.contactPersonName}
          touched={touched?.contactPersonName}
          onChange={handleChange}
          onBlur={handleBlur}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={formFields?.mobileNo?.label}
          name={formFields?.mobileNo?.name}
          value={values?.mobileNo}
          errors={errors?.mobileNo}
          touched={touched?.mobileNo}
          onChange={handleChange}
          onBlur={handleBlur}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={formFields?.emailId?.label}
          name={formFields?.emailId?.name}
          value={values?.emailId}
          errors={errors?.emailId}
          touched={touched?.emailId}
          onChange={handleChange}
          onBlur={handleBlur}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomRadioButton
          name={formFields?.emailStatus?.name}
          label={formFields?.emailStatus?.label}
          value={values?.emailStatus || ""}
          touched={touched?.emailStatus}
          errors={errors?.emailStatus}
          onChange={handleChange}
          onBlur={handleBlur}
          isViewMode={isViewMode}
          inputValues={[
            {
              name: "Yes",
              id: "yes",
            },
            {
              name: "No",
              id: "no",
            },
          ]}
          rowBreak
        />
      </Grid>

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={handleOnReset}
        isViewMode={isViewMode}
        isUpdate={!!editId}
      />

      <AuditLog
        hide={!editId}
        // createdAt={data?.createdAt}
        // createdByName={`${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`}
        // updatedAt={data?.updatedAt}
        // updatedByName={`${data?.updatedBy?.firstName} ${data?.updatedBy?.lastName}`}
      />
    </FormWrapper>
  );
};

export default Form;
