import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getApiService, getByIdApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { statusSeeds } from "../../../constants/globalConstants";
import {
  fields,
  genderSeeds,
  initialValues,
} from "../../../constants/sevaKendraUsers/sevaKendraUsers";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { theme } from "../../../styles";
import { formatDate, getValidValues } from "../../../utils/common";
import { validationSchema } from "../../../validations/sevaKendraUsers/sevaKendraUsers";
import {
  CustomDatePicker,
  CustomRadioButton,
  CustomTextField,
  DividerLine,
  FileUpload,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
  WithCondition,
} from "../../shared";
import StatusFields from "../../shared/StatusFields";

const Form = () => {
  const { state } = useLocation();
  const isViewMode = state?.viewDetails;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get("editId");

  const handleOnSubmit = (values) => {
    const payload = getValidValues({
      ...values,
      auditLog: getValidValues({
        ...values?.auditLog,
        date: formatDate({ date: values?.auditLog?.date }),
      }),
    });
    // onSubmit(payload);
    console.log(payload);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(editId),
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

  return (
    <FormWrapper
      title="Seva Kendra User"
      navigateTo={ROUTE_PATHS?.SEVA_KENDRA_USERS_LIST}
    >
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
        <SingleAutoComplete
          label={fields?.sevaKendraId?.label}
          name={fields?.sevaKendraId?.name}
          value={values?.sevaKendraId}
          onChange={(_, value) => {
            setFieldValue(fields?.sevaKendraId?.name, value);
          }}
          onBlur={handleBlur}
          errors={errors?.sevaKendraId}
          touched={touched?.sevaKendraId}
          inputValues={districtList?.sevaKendra || []}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine gap={"8px 0 24px"} />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.userId?.label}
          name={fields?.userId?.name}
          value={values?.userId}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.userId}
          touched={touched?.userId}
          isViewMode={isViewMode}
          type={fields?.userId?.type}
        />
      </Grid>

      <Grid item xs={6}>
        <FileUpload
          type={"image"}
          accept={"image/*"}
          setFieldValue={setFieldValue}
          name={fields?.picture?.name}
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

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.firstName?.label}
          name={fields?.firstName?.name}
          value={values?.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.firstName}
          touched={touched?.firstName}
          isViewMode={isViewMode}
          type={fields?.firstName?.type}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.lastName?.label}
          name={fields?.lastName?.name}
          value={values?.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.lastName}
          touched={touched?.lastName}
          isViewMode={isViewMode}
          type={fields?.lastName?.type}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomRadioButton
          name="genderId"
          label={fields?.genderId?.label}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.genderId || ""}
          touched={touched?.genderId}
          errors={errors?.genderId}
          isViewMode={isViewMode}
          accessor="code"
          inputValues={genderSeeds}
          rowBreak
          labelStyle={{
            color: theme?.palette?.textColor?.blue,
            fontSize: "16px",
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomDatePicker
          label={fields?.dateOfBirth?.label}
          name={fields?.dateOfBirth?.name}
          value={values?.dateOfBirth}
          onChange={setFieldValue}
          isViewMode={isViewMode}
          fullWidth
          onBlur={handleBlur}
          setTouched={setFieldTouched}
          errors={errors?.dateOfBirth}
          touched={touched?.dateOfBirth}
        />
      </Grid>

      <Grid item xs={6}>
        <SingleAutoComplete
          label={fields?.designationId?.label}
          name={fields?.designationId?.name}
          value={values?.designationId}
          onChange={(_, value) => {
            setFieldValue(fields?.designationId?.name, value);
          }}
          onBlur={handleBlur}
          errors={errors?.designationId}
          touched={touched?.designationId}
          inputValues={districtList?.sevaKendra || []}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine gap={"8px 0 24px"} />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.personalMailId?.label}
          name={fields?.personalMailId?.name}
          value={values?.personalMailId}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.personalMailId}
          touched={touched?.personalMailId}
          isViewMode={isViewMode}
          fieldType={fields?.personalMailId?.type}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.personalContactNumber?.label}
          name={fields?.personalContactNumber?.name}
          value={values?.personalContactNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.personalContactNumber}
          touched={touched?.personalContactNumber}
          isViewMode={isViewMode}
          fieldType={fields?.personalContactNumber?.type}
          maxLength={10}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.whatsAppNumber?.label}
          name={fields?.whatsAppNumber?.name}
          value={values?.whatsAppNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.whatsAppNumber}
          touched={touched?.whatsAppNumber}
          isViewMode={isViewMode}
          fieldType={fields?.whatsAppNumber?.type}
          maxLength={10}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine gap={"8px 0 24px"} />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.loginId?.label}
          name={fields?.loginId?.name}
          value={values?.loginId}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.loginId}
          touched={touched?.loginId}
          isViewMode={isViewMode}
          fieldType={fields?.loginId?.type}
          maxLength={10}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.password?.label}
          name={fields?.password?.name}
          value={values?.password}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.password}
          touched={touched?.password}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.confirmPassword?.label}
          name={fields?.confirmPassword?.name}
          value={values?.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.confirmPassword}
          touched={touched?.confirmPassword}
          isViewMode={isViewMode}
        />
      </Grid>

      <WithCondition isValid={editId}>
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
      </WithCondition>

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={() => {
          navigate(ROUTE_PATHS?.SEVA_KENDRA_USERS_LIST);
        }}
        isUpdate={false}
      />

      {/* {editId ? <AuditLog data={parameterDetails?.data} /> : <></>} */}
    </FormWrapper>
  );
};

export default Form;
