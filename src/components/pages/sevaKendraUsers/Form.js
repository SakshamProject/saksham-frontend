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
} from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { CODES } from "../../../constants/globalConstants";
import { genderSeed, statusSeed } from "../../../constants/seeds";
import {
  fields,
  initialValues,
} from "../../../constants/sevaKendraUsers/sevaKendraUsers";
import { useCustomQuery } from "../../../hooks/useCustomQuery";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { theme } from "../../../styles";
import { formatDate, getValidValues } from "../../../utils/common";
import { dispatchNotifyAction } from "../../../utils/dispatch";
import { validationSchema } from "../../../validations/sevaKendraUsers/sevaKendraUsers";
import {
  AuditLog,
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
      status: values?.status,
      date: formatDate({ date: values?.auditLog?.date, format: "iso" }),
      dateOfBirth: formatDate({ date: values?.dateOfBirth, format: "iso" }),
      effectiveDate: editId
        ? values?.effectiveDate || ""
        : formatDate({ date: new Date(), format: "iso" }),
      auditlog: getValidValues({
        status: values?.status,
        date: formatDate({ date: values?.date, format: "iso" }),
        description: values?.description,
      }),
      currentStatus: values?.status,
    });
    onSubmit(payload);
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["create and update"],
    mutationFn: (data) =>
      editId
        ? updateApiService(API_PATHS?.SEVAKENDRA_USERS, editId, data)
        : postApiService(API_PATHS?.SEVAKENDRA_USERS, data),
    onSuccess: () => {
      dispatchNotifyAction("User", editId ? CODES?.UPDATE : CODES?.ADDED);
      navigate(ROUTE_PATHS.SEVA_KENDRA_USERS_LIST);
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

  const { data: sevaKendraList } = useQuery({
    queryKey: ["sevaKendraListByDistrict", values?.districtId],
    queryFn: () =>
      getByIdApiService(
        API_PATHS?.DISTRICTS,
        API_PATHS?.ACTIVE(`${values?.districtId}${API_PATHS?.SEVAKENDRA}`)
      ),
    select: ({ data }) => data?.data,
    enabled: !!values?.districtId,
  });

  const { data: designationsList } = useQuery({
    queryKey: ["designationsListBySevaKendra", values?.sevaKendraId],
    queryFn: () =>
      getByIdApiService(
        API_PATHS?.SEVAKENDRA,
        API_PATHS?.ACTIVE(`${values?.sevaKendraId}${API_PATHS?.DESIGNATIONS}`)
      ),
    select: ({ data }) => data?.data,
    enabled: !!values?.sevaKendraId,
  });

  const { data } = useCustomQuery({
    queryKey: ["sevaKendraUsersGetById"],
    queryFn: () => getByIdApiService(API_PATHS?.SEVAKENDRA_USERS, editId),
    enabled: !!editId,
    onSuccess: (data) => {
      setValues({
        ...data,
        ...data?.person,
        stateId: data?.designation?.sevaKendra?.district?.state?.id,
        districtId: data?.designation?.sevaKendra?.district?.id,
        sevaKendraId: data?.designation?.sevaKendra?.id,
        designationId: data?.designation?.id,
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
      title="Seva Kendra User"
      navigateTo={ROUTE_PATHS?.SEVA_KENDRA_USERS_LIST}
    >
      <Grid item xs={6}>
        <SingleAutoComplete
          label={fields?.stateId?.label}
          name={fields?.stateId?.name}
          value={values?.stateId}
          onChange={(_, value) => {
            setValues({
              ...values,
              stateId: value,
              districtId: "",
              sevaKendraId: "",
              designationId: "",
            });
            setTouched({
              ...touched,
              districtId: false,
              sevaKendraId: false,
              designationId: false,
            });
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
            setValues({
              ...values,
              districtId: value,
              sevaKendraId: "",
              designationId: "",
            });
            setTouched({
              ...touched,
              sevaKendraId: false,
              designationId: false,
            });
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
            setValues({
              ...values,
              sevaKendraId: value,
              designationId: "",
            });
            setFieldTouched(fields?.designationId?.name, false);
          }}
          onBlur={handleBlur}
          errors={errors?.sevaKendraId}
          touched={touched?.sevaKendraId}
          inputValues={sevaKendraList || []}
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
          isViewMode={isViewMode || editId}
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
            setFieldValue(fields?.picture?.name, e?.target?.files[0])
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
          name={fields?.gender?.name}
          label={fields?.gender?.label}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.gender || ""}
          touched={touched?.gender}
          errors={errors?.gender}
          isViewMode={isViewMode}
          inputValues={genderSeed()}
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
          onBlur={handleBlur}
          setTouched={setFieldTouched}
          maxDate={new Date()}
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
          inputValues={designationsList || []}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine gap={"8px 0 24px"} />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.email?.label}
          name={fields?.email?.name}
          value={values?.email}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.email}
          touched={touched?.email}
          isViewMode={isViewMode}
          fieldType={fields?.email?.type}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.contactNumber?.label}
          name={fields?.contactNumber?.name}
          value={values?.contactNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.contactNumber}
          touched={touched?.contactNumber}
          isViewMode={isViewMode}
          fieldType={fields?.contactNumber?.type}
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
          isViewMode={isViewMode || editId}
          fieldType={fields?.loginId?.type}
          maxLength={10}
        />
      </Grid>

      <WithCondition isValid={!editId}>
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
      </WithCondition>

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
          statusHistory={values?.userAuditLog}
          disableListLayout
        />
      </WithCondition>

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={() => {
          navigate(ROUTE_PATHS?.SEVA_KENDRA_USERS_LIST);
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
