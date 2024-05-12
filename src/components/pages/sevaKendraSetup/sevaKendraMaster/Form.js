import { Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  getApiService,
  getByIdApiService,
  postApiService,
  updateApiService,
} from "../../../../api/api";
import { API_PATHS } from "../../../../api/apiPaths";
import { CODES } from "../../../../constants/globalConstants";
import { statusSeed } from "../../../../constants/seeds";
import {
  fields,
  initialValues,
  transformServices,
} from "../../../../constants/sevaKendraSetup/master";
import { useCustomQuery } from "../../../../hooks/useCustomQuery";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import { CustomTypography } from "../../../../styles";
import { formatDate, getValidValues } from "../../../../utils/common";
import { dispatchResponseAction } from "../../../../utils/dispatch";
import { validationSchema } from "../../../../validations/sevaKendraSetup/master";
import {
  AuditLog,
  CustomAutoComplete,
  CustomDatePicker,
  CustomTextField,
  DividerLine,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
  WithCondition,
} from "../../../shared";
import StatusFields from "../../../shared/StatusFields";

const Form = () => {
  const { state } = useLocation();
  const isViewMode = state?.viewDetails || false;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get("editId");

  const handleOnSubmit = (values) => {
    const payload = getValidValues({
      ...values,
      startDate: formatDate({ date: values?.startDate, format: "iso" }),
      servicesBySevaKendra: transformServices(values?.servicesBySevaKendra),
      services: transformServices(values?.servicesBySevaKendra),
      currentStatus: values?.status,
      auditLog: {
        date: formatDate({ date: values?.date, format: "iso" }),
        status: values?.status,
        description: values?.description,
      },
    });
    onSubmit(payload);
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["createAndUpdate"],
    mutationFn: (data) =>
      editId
        ? updateApiService(API_PATHS?.SEVAKENDRA, editId, data)
        : postApiService(API_PATHS?.SEVAKENDRA, data),
    onSuccess: () => {
      dispatchResponseAction(
        "Seva Kendra",
        editId ? CODES?.UPDATED : CODES?.ADDED
      );
      navigate(ROUTE_PATHS?.SEVA_KENDRA_MASTER_LIST);
    },
  });

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
  } = formik;

  const { data: stateList } = useQuery({
    queryKey: ["getAllStates"],
    queryFn: () => getApiService(API_PATHS?.STATES),
    select: ({ data }) => data?.data,
  });

  const { data: districtList } = useQuery({
    queryKey: ["getAllDistrictsByState", values?.stateId],
    queryFn: () => getByIdApiService(API_PATHS?.STATES, values?.stateId),
    select: ({ data }) => data?.data,
    enabled: !!values?.stateId,
  });

  const { data: serviceTypeList } = useQuery({
    queryKey: ["getAllServiceTypes"],
    queryFn: () => getApiService(API_PATHS?.SERVICES),
    select: ({ data }) => data?.data,
  });

  const { data } = useCustomQuery({
    queryKey: ["sevaKendraGetById", editId],
    queryFn: () => getByIdApiService(API_PATHS?.SEVAKENDRA, editId),
    enabled: !!editId,
    onSuccess: (data) => {
      setValues({
        ...data,
        stateId: data?.district?.state?.id,
        servicesBySevaKendra: data?.services?.map(({ service }) => ({
          id: service.id,
          name: service.name,
          serviceType: {
            id: service.serviceType.id,
            name: service.serviceType.name,
          },
        })),
        status: data?.status,
        date:
          data?.status === CODES?.ACTIVE ? new Date() : data?.effectiveFromDate,
        description: data?.status === CODES?.ACTIVE ? "" : data?.description,
      });
    },
    select: ({ data }) => data?.data,
  });

  return (
    <FormWrapper
      title="Seva Kendra"
      navigateTo={ROUTE_PATHS?.SEVA_KENDRA_MASTER_LIST}
    >
      <Grid item xs={12}>
        <CustomTextField
          label={fields?.name?.label}
          name={fields?.name?.name}
          isViewMode={isViewMode}
          value={values?.name}
          errors={errors?.name}
          touched={touched?.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <SingleAutoComplete
          label={fields?.stateId?.label}
          name={fields?.stateId?.name}
          inputValues={stateList || []}
          isViewMode={isViewMode}
          value={values?.stateId}
          errors={errors?.stateId}
          touched={touched?.stateId}
          onBlur={handleBlur}
          onChange={(_, value) => {
            setValues({
              ...values,
              [fields?.stateId?.name]: value,
              [fields?.districtId?.name]: "",
            });
            setFieldTouched(fields?.districtId?.name, false);
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <SingleAutoComplete
          label={fields?.districtId?.label}
          name={fields?.districtId?.name}
          inputValues={districtList?.districts || []}
          isViewMode={isViewMode}
          value={values?.districtId}
          errors={errors?.districtId}
          touched={touched?.districtId}
          onChange={(_, value) => {
            setFieldValue(fields?.districtId?.name, value);
          }}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTextField
          label={fields?.address?.label}
          name={fields?.address?.name}
          isViewMode={isViewMode}
          value={values?.address}
          errors={errors?.address}
          touched={touched?.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={fields?.landLineNumber?.label}
          name={fields?.landLineNumber?.name}
          fieldType={fields?.landLineNumber?.fieldType}
          maxLength={fields?.landLineNumber?.maxLength}
          isViewMode={isViewMode}
          value={values?.landLineNumber}
          errors={errors?.landLineNumber}
          touched={touched?.landLineNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={fields?.mobileNumber?.label}
          name={fields?.mobileNumber?.name}
          fieldType={fields?.mobileNumber?.fieldType}
          maxLength={fields?.mobileNumber?.maxLength}
          isViewMode={isViewMode}
          value={values?.mobileNumber}
          errors={errors?.mobileNumber}
          touched={touched?.mobileNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomDatePicker
          label={fields?.startDate?.label}
          name={fields?.startDate?.name}
          minDate={fields?.startDate?.minDate}
          isViewMode={isViewMode}
          value={values?.startDate}
          errors={errors?.startDate}
          touched={touched?.startDate}
          onChange={setFieldValue}
          onBlur={handleBlur}
          setTouched={setFieldTouched}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine gap={"6px 0 24px"} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={fields?.contactPerson?.name?.label}
          name={fields?.contactPerson?.name?.name}
          isViewMode={isViewMode}
          value={values?.contactPerson?.name}
          errors={errors?.contactPerson?.name}
          touched={touched?.contactPerson?.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={fields?.contactPerson?.email?.label}
          name={fields?.contactPerson?.email?.name}
          fieldType={fields?.contactPerson?.email?.fieldType}
          isViewMode={isViewMode}
          value={values?.contactPerson?.email}
          errors={errors?.contactPerson?.email}
          touched={touched?.contactPerson?.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={fields?.contactPerson?.phoneNumber1?.label}
          name={fields?.contactPerson?.phoneNumber1?.name}
          fieldType={fields?.contactPerson?.phoneNumber1?.fieldType}
          maxLength={fields?.contactPerson?.phoneNumber1?.maxLength}
          isViewMode={isViewMode}
          value={values?.contactPerson?.phoneNumber1}
          errors={errors?.contactPerson?.phoneNumber1}
          touched={touched?.contactPerson?.phoneNumber1}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={fields?.contactPerson?.phoneNumber2?.label}
          name={fields?.contactPerson?.phoneNumber2?.name}
          fieldType={fields?.contactPerson?.phoneNumber2?.fieldType}
          maxLength={fields?.contactPerson?.phoneNumber2?.maxLength}
          isViewMode={isViewMode}
          value={values?.contactPerson?.phoneNumber2}
          errors={errors?.contactPerson?.phoneNumber2}
          touched={touched?.contactPerson?.phoneNumber2}
          onChange={handleChange}
          onBlur={handleBlur}
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
          getOptionLabel={fields?.servicesBySevaKendra?.getOptionLabel}
          inputValues={serviceTypeList || []}
          isViewMode={isViewMode}
          value={values?.servicesBySevaKendra || []}
          touched={touched?.servicesBySevaKendra}
          errors={errors?.servicesBySevaKendra}
          onChange={(_, value) => {
            setFieldValue(fields?.servicesBySevaKendra?.name, [...value]);
          }}
          onBlur={handleBlur}
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
          statusSeeds={statusSeed}
          isViewMode={isViewMode}
          rowBreak={false}
          statusHistory={values?.auditLog}
          disableListLayout
        />
      </WithCondition>

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={() => {
          navigate(ROUTE_PATHS?.SEVA_KENDRA_MASTER_LIST);
        }}
        isUpdate={!!editId}
        isViewMode={isViewMode}
      />

      <AuditLog
        hide={!editId}
        auditLog={{
          createdAt: data?.createdAt,
          createdBy: `${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`,
          updatedAt: data?.updatedAt,
          updatedBy: data?.updatedBy
            ? `${data?.updatedBy?.firstName} ${data?.updatedBy?.lastName}`
            : "",
        }}
      />
    </FormWrapper>
  );
};

export default Form;
