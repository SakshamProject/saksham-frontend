import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
import { CustomTypography, theme } from "../../../styles";
import { API_PATHS } from "../../../api/apiPaths";
import {
  getApiService,
  getByIdApiService,
  postApiService,
} from "../../../api/api";
import {
  initialValues,
  formFields,
} from "../../../constants/serviceMapping/serviceMapping";
import { validationSchema } from "../../../validations/serviceMapping/serviceMapping";

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
    setFieldTouched,
    setValues,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (value) => console.log(value),
  });

  const handleOnReset = () => navigate(ROUTE_PATHS.SERVICE_MAPPING_LIST);

  const { data: allStates } = useQuery({
    queryKey: ["getAllStates"],
    queryFn: () => getApiService(API_PATHS.STATES),
    select: ({ data }) => data?.data,
  });

  const { data: allDistricts } = useQuery({
    queryKey: ["getAllDistrictByState", values?.stateId],
    queryFn: () => getByIdApiService(API_PATHS.STATES, values?.stateId),
    select: ({ data }) => data?.data?.districts,
    enabled: !!values?.stateId,
  });

  const { data: allSevaKendras } = useQuery({
    queryKey: ["getSevaKendraNameByDistrict", values?.districtId],
    queryFn: () =>
      getByIdApiService(
        API_PATHS.DISTRICTS,
        `${values?.districtId}${API_PATHS.SEVAKENDRA}?status=ACTIVE`
      ),
    select: ({ data }) => data?.data,
    enabled: !!values?.districtId,
  });

  const { data: allSevaKendraUsers } = useQuery({
    queryKey: ["getSevaKendraUserBySevaKendraName", values?.sevaKendraId],
    queryFn: () =>
      getByIdApiService(
        API_PATHS.SEVAKENDRA,
        `${values?.sevaKendraId}${API_PATHS.SEVAKENDRA_USERS}?status=ACTIVE`
      ),
    select: ({ data }) => data?.data?.map((item) => item?.user),
    enabled: !!values?.sevaKendraId,
  });

  const { data: allServiceType } = useQuery({
    queryKey: ["getAllServiceType"],
    queryFn: () => postApiService(API_PATHS.SERVICES_LIST),
    select: ({ data }) => data?.data,
  });

  const { data: allService } = useQuery({
    queryKey: ["getAllService", values?.serviceTypeId],
    queryFn: () => {
      return {
        data: allServiceType?.find(
          (item) => item?.id === values?.serviceTypeId
        ),
      };
    },
    select: ({ data }) => data?.service,
    enabled: !!values?.serviceTypeId,
  });

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
          fieldType={formFields?.searchDivyangId?.fieldType}
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
          type={formFields?.searchMobileNo?.type}
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
          type={formFields?.searchAadharNo?.type}
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
          fieldType={formFields?.searchUDIDNo?.fieldType}
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
          value={values?.stateId}
          errors={errors?.stateId}
          touched={touched?.stateId}
          customOnchange={(_, value) =>
            setValues({
              ...values,
              [formFields?.state?.name]: value?.id,
              [formFields?.district?.name]: "",
              [formFields?.sevaKendra?.name]: "",
              [formFields?.assignUser?.name]: "",
            })
          }
          onBlur={handleBlur}
          inputValues={allStates || []}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <SingleAutoComplete
          label={formFields?.district?.label}
          name={formFields?.district?.name}
          value={values?.districtId}
          errors={errors?.districtId}
          touched={touched?.districtId}
          customOnchange={(_, value) =>
            setValues({
              ...values,
              [formFields?.district?.name]: value?.id,
              [formFields?.sevaKendra?.name]: "",
              [formFields?.assignUser?.name]: "",
            })
          }
          onBlur={handleBlur}
          inputValues={allDistricts || []}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12}>
        <SingleAutoComplete
          label={formFields?.sevaKendra?.label}
          name={formFields?.sevaKendra?.name}
          value={values?.sevaKendraId}
          errors={errors?.sevaKendraId}
          touched={touched?.sevaKendraId}
          customOnchange={(_, value) =>
            setValues({
              ...values,
              [formFields?.sevaKendra?.name]: value?.id,
              [formFields?.assignUser?.name]: "",
            })
          }
          onBlur={handleBlur}
          inputValues={allSevaKendras || []}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12}>
        <SingleAutoComplete
          label={formFields?.assignUser?.label}
          name={formFields?.assignUser?.name}
          getOptionLabel={formFields?.assignUser?.getOptionLabel}
          value={values?.userId}
          errors={errors?.userId}
          touched={touched?.userId}
          onChange={setFieldValue}
          onBlur={handleBlur}
          inputValues={allSevaKendraUsers || []}
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
          value={values?.serviceTypeId}
          errors={errors?.serviceTypeId}
          touched={touched?.serviceTypeId}
          onChange={setFieldValue}
          onBlur={handleBlur}
          inputValues={allServiceType || []}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <SingleAutoComplete
          label={formFields?.serviceSubtype?.label}
          name={formFields?.serviceSubtype?.name}
          value={values?.serviceId}
          errors={errors?.serviceId}
          touched={touched?.serviceId}
          onChange={setFieldValue}
          onBlur={handleBlur}
          inputValues={allService || []}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomDatePicker
          name={formFields?.dateOfService?.name}
          label={formFields?.dateOfService?.label}
          minDate={formFields?.dateOfService?.minDate}
          value={values?.dateOfService}
          errors={errors?.dateOfService}
          touched={touched?.dateOfService}
          onChange={setFieldValue}
          setTouched={setFieldTouched}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomDatePicker
          name={formFields?.completedBefore?.name}
          label={formFields?.completedBefore?.label}
          minDate={formFields?.completedBefore?.minDate}
          value={values?.dueDate}
          errors={errors?.dueDate}
          touched={touched?.dueDate}
          onChange={setFieldValue}
          setTouched={setFieldTouched}
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
          fieldType={formFields?.contactPersonName?.fieldType}
          value={values?.nonSevaKendraFollowUp?.name}
          errors={errors?.nonSevaKendraFollowUp?.name}
          touched={touched?.nonSevaKendraFollowUp?.name}
          onChange={handleChange}
          onBlur={handleBlur}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={formFields?.mobileNo?.label}
          name={formFields?.mobileNo?.name}
          fieldType={formFields?.mobileNo?.fieldType}
          value={values?.nonSevaKendraFollowUp?.mobileNumber}
          errors={errors?.nonSevaKendraFollowUp?.mobileNumber}
          touched={touched?.nonSevaKendraFollowUp?.mobileNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={formFields?.emailId?.label}
          name={formFields?.emailId?.name}
          fieldType={formFields?.mobileNo?.fieldType}
          value={values?.nonSevaKendraFollowUp?.email}
          errors={errors?.nonSevaKendraFollowUp?.email}
          touched={touched?.nonSevaKendraFollowUp?.email}
          onChange={handleChange}
          onBlur={handleBlur}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomRadioButton
          name={formFields?.emailStatus?.name}
          label={formFields?.emailStatus?.label}
          inputValues={formFields?.emailStatus?.inputValues}
          labelStyle={formFields?.emailStatus?.labelStyle}
          value={values?.nonSevaKendraFollowUp?.sendMail}
          touched={touched?.nonSevaKendraFollowUp?.sendMail}
          errors={errors?.nonSevaKendraFollowUp?.sendMail}
          onChange={handleChange}
          onBlur={handleBlur}
          isViewMode={isViewMode}
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
