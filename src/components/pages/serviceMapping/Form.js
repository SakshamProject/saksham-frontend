import { Box, Grid, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  getApiService,
  getByIdApiService,
  postApiService,
} from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { appApi } from "../../../api/config";
import user from "../../../assets/profile.png";
import { divyangDetailsColumn } from "../../../constants/globalConstants";
import {
  formFields,
  initialValues,
} from "../../../constants/serviceMapping/serviceMapping";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { CustomTypography, theme } from "../../../styles";
import { validationSchema } from "../../../validations/serviceMapping/serviceMapping";
import {
  AuditLog,
  CustomDatePicker,
  CustomRadioButton,
  CustomTextField,
  DividerLine,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
  WithCondition,
} from "../../shared";

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
    queryFn: () =>
      allServiceType?.find((item) => item?.id === values?.serviceTypeId),
    select: ({ data }) => {},
    enabled: !!values?.serviceTypeId,
  });

  const { mutate: getDivyang, data: searchedDivyang } = useMutation({
    mutationKey: ["getDivyang"],
    mutationFn: (payload) =>
      appApi.get(API_PATHS.DIVYANG_DETAILS, { params: payload }),
  });

  const onKeyPress = (e, column) => {
    if (e?.target?.value?.trim() && (e?.key === "Enter" || e?.keyCode === 13))
      getDivyang({ column, value: e?.target?.value });
  };

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

      <Grid item xs={12} sm={12} md={6}>
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
          onKeyPress={(e) => onKeyPress(e, "divyangId")}
          disabled={
            !!values?.searchAadharNo ||
            !!values?.searchMobileNo ||
            !!values?.searchUDIDNo
          }
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
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
          onKeyPress={(e) => onKeyPress(e, "mobileNumber")}
          disabled={
            !!values?.searchAadharNo ||
            !!values?.searchDivyangId ||
            !!values?.searchUDIDNo
          }
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
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
          onKeyPress={(e) => onKeyPress(e, "aadharCardNumber")}
          disabled={
            !!values?.searchDivyangId ||
            !!values?.searchMobileNo ||
            !!values?.searchUDIDNo
          }
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
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
          onKeyPress={(e) => onKeyPress(e, "udidCardNumber")}
          disabled={
            !!values?.searchDivyangId ||
            !!values?.searchMobileNo ||
            !!values?.searchAadharNo
          }
        />
      </Grid>

      {/* <WithCondition isValid={!!searchedDivyang?.data?.data}>
        <Grid container item xs={12} gap={3} sx={{ marginBottom: "22px" }}>
          {searchedDivyang?.data?.data?.map((item, key) => (
            <DivyangCard divyangDetail={item} key={key + item?.id} />
          ))}
        </Grid>
      </WithCondition> */}

      <Grid item xs={12}>
        <DividerLine />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
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

      <Grid item xs={12} sm={12} md={6}>
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

      <Grid item xs={12} sm={12} md={6}>
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

      <Grid item xs={12} sm={12} md={6}>
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

      <Grid item xs={12} marginBottom={"-20px"}>
        <CustomRadioButton
          name={formFields?.isNonSevaKendraFollowUpRequired?.name}
          label={formFields?.isNonSevaKendraFollowUpRequired?.label}
          inputValues={formFields?.isNonSevaKendraFollowUpRequired?.inputValues}
          value={values?.isNonSevaKendraFollowUpRequired}
          touched={touched?.isNonSevaKendraFollowUpRequired}
          errors={errors?.isNonSevaKendraFollowUpRequired}
          onChange={handleChange}
          onBlur={handleBlur}
          isViewMode={isViewMode}
          rowBreak
        />
      </Grid>

      <WithCondition isValid={values?.isNonSevaKendraFollowUpRequired === "NO"}>
        <Grid item xs={12} sm={12} md={6}>
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

        <Grid item xs={12} sm={12} md={6}>
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
      </WithCondition>

      <WithCondition
        isValid={values?.isNonSevaKendraFollowUpRequired === "YES"}
      >
        <Grid item xs={12} sm={12} md={6}>
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

        <Grid item xs={12} sm={12} md={6}>
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

        <Grid item xs={12} sm={12} md={6}>
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

        <Grid item xs={12} sm={12} md={6}>
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
      </WithCondition>

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

const DivyangCard = ({ divyangDetail }) => (
  <Box
    sx={{
      display: "flex",
      borderRadius: "16px",
      boxShadow: `2px 2px 4px ${theme?.palette?.shadowColor?.main}`,
      flexWrap: "wrap",
      flex: 1,
      columnGap: 2,
    }}
  >
    <img
      style={{
        width: 120,
        aspectRatio: 1,
        objectFit: "cover",
        borderRadius: "16px",
      }}
      src={divyangDetail?.profileImageUrl || user}
      onError={(e) => (e.target.src = user)}
      alt="divyang profile"
    />

    <Box>
      {divyangDetailsColumn?.map((item, key) => (
        <WithCondition
          isValid={!!item?.Cell || !!divyangDetail?.[item?.accessor]}
          key={key + item?.accessor}
        >
          <Box sx={{ display: "flex" }}>
            <Typography>{`${item?.Header} : `}</Typography>
            <Typography>
              {!!item?.Cell
                ? item?.Cell(divyangDetail)
                : divyangDetail?.[item?.accessor]}
            </Typography>
          </Box>
        </WithCondition>
      ))}
    </Box>
  </Box>
);
