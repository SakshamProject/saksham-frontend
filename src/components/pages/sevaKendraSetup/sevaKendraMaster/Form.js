import { Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import {
  getApiService,
  getByIdApiService,
  postApiService,
  updateApiService,
} from "../../../../api/api";
import { API_PATHS } from "../../../../api/apiPaths";
import {
  ADDED_SUCCESSFULLY,
  UPDATED_SUCCESSFULLY,
  statusSeeds,
} from "../../../../constants/globalConstants";
import {
  fields,
  initialValues,
} from "../../../../constants/sevaKendraSetup/master";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import { formatDate, getValidValues } from "../../../../utils/common";
import { validationSchema } from "../../../../validations/sevaKendraSetup/master";
import {
  CustomDatePicker,
  CustomTextField,
  DividerLine,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
  WithCondition,
} from "../../../shared";
import StatusFields from "../../../shared/StatusFields";
import CustomAutoComplete from "../../../shared/formFields/CustomAutoComplete";
import { CustomTypography } from "../../../../styles";
import { dispatchNotifySuccess } from "../../../../utils/dispatch";

const transformServices = (services) =>
  services.map(({ id }) => ({ serviceId: id }));

const Form = () => {
  const { state } = useLocation();
  const isViewMode = state?.viewDetails;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get("editId");

  const handleOnSubmit = (values) => {
    const payload = getValidValues({
      ...values,
      startDate: formatDate({ date: values?.startDate }),
      servicesBySevaKendra: transformServices(values?.servicesBySevaKendra),
      auditLog: getValidValues({
        ...values?.auditLog,
        date: formatDate({ date: values?.auditLog?.date }),
      }),
    });
    onSubmit(payload);
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["create and update"],
    mutationFn: (data) =>
      editId
        ? updateApiService(API_PATHS?.SEVAKENDRA, editId, data)
        : postApiService(API_PATHS?.SEVAKENDRA, data),
    onSuccess: () => {
      dispatchNotifySuccess(
        editId
          ? UPDATED_SUCCESSFULLY("Seva Kendra")
          : ADDED_SUCCESSFULLY("Seva Kendra")
      );
      navigate(ROUTE_PATHS.SEVA_KENDRA_MASTER_LIST);
    },
  });

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

  useEffect(() => {
    !editId && setFieldValue(fields?.startDate?.name, new Date());
  }, []);

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
          label={fields?.contactPerson?.name?.label}
          name={fields?.contactPerson?.name?.name}
          value={values?.contactPerson?.name}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.contactPerson?.name}
          touched={touched?.contactPerson?.name}
          isViewMode={isViewMode}
          fieldType={fields?.contactPerson?.name?.type}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.contactPerson?.email?.label}
          name={fields?.contactPerson?.email?.name}
          value={values?.contactPerson?.email}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.contactPerson?.email}
          touched={touched?.contactPerson?.email}
          isViewMode={isViewMode}
          fieldType={fields?.contactPerson?.email?.type}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.contactPerson?.phoneNumber1?.label}
          name={fields?.contactPerson?.phoneNumber1?.name}
          value={values?.contactPerson?.phoneNumber1}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.contactPerson?.phoneNumber1}
          touched={touched?.contactPerson?.phoneNumber1}
          isViewMode={isViewMode}
          fieldType={fields?.contactPerson?.phoneNumber1?.type}
          maxLength={10}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.contactPerson?.phoneNumber2?.label}
          name={fields?.contactPerson?.phoneNumber2?.name}
          value={values?.contactPerson?.phoneNumber2}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.contactPerson?.phoneNumber2}
          touched={touched?.contactPerson?.phoneNumber2}
          isViewMode={isViewMode}
          fieldType={fields?.contactPerson?.phoneNumber2?.type}
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
          label={fields?.servicesBySevaKendra?.label}
          name={fields?.servicesBySevaKendra?.name}
          value={values?.servicesBySevaKendra}
          onChange={(_, value) => {
            setFieldValue(fields?.servicesBySevaKendra?.name, [...value]);
          }}
          onBlur={handleBlur}
          touched={touched?.servicesBySevaKendra}
          error={errors?.servicesBySevaKendra}
          isViewMode={isViewMode}
          inputValues={serviceTypeList || []}
          getOptionLabel={(option) =>
            `${option?.name} - ${option?.serviceType?.name} `
          }
          // accessor={fields?.servicesBySevaKendra?.accessor}
          // labelAccessor="role"
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
          navigate(ROUTE_PATHS?.SEVA_KENDRA_MASTER_LIST);
        }}
        isUpdate={false}
      />

      {/* {editId ? <AuditLog data={parameterDetails?.data} /> : <></>} */}
    </FormWrapper>
  );
};

export default Form;
