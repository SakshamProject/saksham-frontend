import { Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { theme } from "../../../styles";
import { formatDate } from "../../../utils/common";
import { dispatchResponseAction } from "../../../utils/dispatch";
import { multiPartFormData } from "../../../utils/multipartFormData";
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
  const navigate = useNavigate();
  const isViewMode = state?.viewDetails || false;
  const editId = state?.editId;

  const handleOnSubmit = (value) => {
    const { profilePhoto = "", ...remains } = value;
    const sendData = {
      ...remains,
      currentStatus: value?.status,
      dateOfBirth: formatDate({
        date: value?.dateOfBirth,
        format: "iso",
      }),
      effectiveDate: formatDate({
        date: value?.date,
        format: "iso",
      }),
      auditlog: {
        status: value?.status,
        date: formatDate({ date: value?.date, format: "iso" }),
        description: value?.description,
      },
      fileNames: {
        ...(typeof profilePhoto !== "string"
          ? {
              profilePhotoFileName: profilePhoto?.name,
            }
          : !profilePhoto && { profilePhotoFileName: "null" }),
      },
      ...(typeof profilePhoto !== "string" && { profilePhoto }),
    };
    if (typeof profilePhoto === "string" && profilePhoto)
      sendData.fileNames = undefined;
    const payload = multiPartFormData(sendData, ["profilePhoto"]);
    onSubmit(payload);
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["create and update"],
    mutationFn: (data) =>
      editId
        ? updateApiService(API_PATHS?.SEVAKENDRA_USERS, editId, data)
        : postApiService(API_PATHS?.SEVAKENDRA_USERS, data),
    onSuccess: () => {
      dispatchResponseAction("User", editId ? CODES?.UPDATED : CODES?.ADDED);
      navigate(state?.backPath || ROUTE_PATHS?.SEVA_KENDRA_USERS_LIST);
    },
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
  } = useFormik({
    initialValues,
    validationSchema: validationSchema(editId),
    onSubmit: handleOnSubmit,
  });

  const { data: stateList } = useQuery({
    queryKey: ["get all states"],
    queryFn: () => getApiService(API_PATHS?.STATES),
    select: ({ data }) => data?.data,
  });

  const { data: districtList } = useQuery({
    queryKey: ["get all district by state", values?.stateId],
    queryFn: () => getByIdApiService(API_PATHS?.STATES, values?.stateId),
    select: ({ data }) => data?.data,
    enabled: !!values?.stateId,
  });

  const { data: sevaKendraList } = useQuery({
    queryKey: ["seva kendra list by district", values?.districtId],
    queryFn: () =>
      getByIdApiService(
        API_PATHS?.DISTRICTS,
        `${values?.districtId}${API_PATHS?.SEVAKENDRA}`,
        { status: CODES?.ACTIVE }
      ),
    select: ({ data }) => data?.data,
    enabled: !!values?.districtId,
  });

  const { data: designationsList } = useQuery({
    queryKey: ["designations list by seva kendra", values?.sevaKendraId],
    queryFn: () =>
      getByIdApiService(
        API_PATHS?.SEVAKENDRAS,
        `${values?.sevaKendraId}${API_PATHS?.DESIGNATIONS}`,
        { status: CODES?.ACTIVE }
      ),
    select: ({ data }) => data?.data,
    enabled: !!values?.sevaKendraId,
  });

  const { mutate } = useMutation({
    mutationKey: ["seva kendra users by id"],
    mutationFn: () => getByIdApiService(API_PATHS?.SEVAKENDRA_USERS, editId),
    onSuccess: ({ data }) => {
      setValues({
        ...data?.data,
        ...data?.data?.person,
        stateId: data?.data?.designation?.sevaKendra?.district?.state?.id,
        districtId: data?.data?.designation?.sevaKendra?.district?.id,
        sevaKendraId: data?.data?.designation?.sevaKendra?.id,
        designationId: data?.data?.designation?.id,
        profilePhoto: data?.file?.profilePhoto?.url,
        status: data?.data?.status,
        date:
          data?.data?.status === CODES?.DEACTIVE
            ? data?.data?.effectiveFromDate
            : new Date(),
        description:
          data?.data?.status === CODES?.DEACTIVE ? data?.data?.description : "",
      });
    },
  });

  useEffect(() => {
    if (editId) mutate();
  }, []);

  return (
    <FormWrapper
      title="Seva Kendra User"
      navigateTo={state?.backPath || ROUTE_PATHS?.SEVA_KENDRA_USERS_LIST}
    >
      <Grid item xs={12} sm={6}>
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
          isViewMode={isViewMode || state?.backPath}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
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
          isViewMode={isViewMode || state?.backPath}
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
          isViewMode={isViewMode || state?.backPath}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine gap={"8px 0 24px"} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={fields?.userId?.label}
          name={fields?.userId?.name}
          value={values?.userId}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.userId}
          touched={touched?.userId}
          isViewMode={isViewMode || !!editId}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FileUpload
          type={"image"}
          accept={"image/*"}
          name={fields?.profilePhoto?.name}
          defaultLabel={fields?.profilePhoto?.label}
          label={values?.profilePhotoFileName}
          value={values?.profilePhoto}
          error={errors?.profilePhoto}
          touched={touched?.profilePhoto}
          onChange={(e) =>
            setFieldValue(fields?.profilePhoto?.name, e?.target?.files[0])
          }
          setFieldValue={setFieldValue}
          disabled={isViewMode}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={fields?.firstName?.label}
          name={fields?.firstName?.name}
          value={values?.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.firstName}
          touched={touched?.firstName}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={fields?.lastName?.label}
          name={fields?.lastName?.name}
          value={values?.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.lastName}
          touched={touched?.lastName}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomRadioButton
          name={fields?.gender?.name}
          label={fields?.gender?.label}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.gender}
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

      <Grid item xs={12} sm={6}>
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

      <Grid item xs={12} sm={6}>
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
          isViewMode={isViewMode || state?.backPath}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine gap={"8px 0 24px"} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={fields?.email?.label}
          name={fields?.email?.name}
          fieldType={fields?.email?.fieldType}
          value={values?.email}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.email}
          touched={touched?.email}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={fields?.contactNumber?.label}
          name={fields?.contactNumber?.name}
          fieldType={fields?.contactNumber?.fieldType}
          value={values?.contactNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.contactNumber}
          touched={touched?.contactNumber}
          isViewMode={isViewMode}
          maxLength={10}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextField
          label={fields?.whatsappNumber?.label}
          name={fields?.whatsappNumber?.name}
          fieldType={fields?.whatsappNumber?.fieldType}
          value={values?.whatsappNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.whatsappNumber}
          touched={touched?.whatsappNumber}
          isViewMode={isViewMode}
          maxLength={10}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine gap={"8px 0 24px"} />
      </Grid>

      <Grid item xs={12}>
        <CustomTextField
          label={fields?.userName?.label}
          name={fields?.userName?.name}
          value={values?.userName}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.userName}
          touched={touched?.userName}
          isViewMode={isViewMode}
        />
      </Grid>

      <WithCondition isValid={!editId}>
        <Grid item xs={12} sm={6}>
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

        <Grid item xs={12} sm={6}>
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

      <WithCondition isValid={!state?.backPath && !!editId}>
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
          statusHistory={values?.auditLog}
          disableListLayout
          editId={editId}
        />
      </WithCondition>

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={() =>
          navigate(state?.backPath || ROUTE_PATHS?.SEVA_KENDRA_USERS_LIST)
        }
        isUpdate={!!editId}
        isViewMode={isViewMode}
      />

      <Grid item xs={12}>
        <AuditLog
          hide={!editId}
          auditLog={{
            createdAt: values?.createdAt,
            updatedAt: values?.updatedAt,
            createdBy:
              values?.createdBy?.userName || values?.createdBy?.firstName || "",
            updatedBy:
              values?.updatedBy?.userName || values?.updatedBy?.firstName || "",
          }}
        />
      </Grid>
    </FormWrapper>
  );
};

export default Form;
