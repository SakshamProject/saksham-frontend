import { Grid, useMediaQuery } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useFormik } from "formik";
import { useTheme } from "@mui/material/styles";

import { CustomTypography, StyledFormContainer, theme } from "../../../styles";
import {
  fields,
  initialValues,
} from "../../../constants/divyangDetails/personalDetails";
import {
  CustomDatePicker,
  CustomPasswordField,
  CustomRadioButton,
  CustomTextField,
  CustomTextarea,
  DividerLine,
  FileUpload,
  FormActions,
  SingleAutoComplete,
  WithCondition,
} from "../../shared";
import {
  getAge,
  getMinimumAgeDate,
  getValidValues,
} from "../../../utils/common";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { genders, yesNoSeed } from "../../../constants/seeds";
import { API_PATHS } from "../../../api/apiPaths";
import { getApiService, getByIdApiService } from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { validationSchema } from "../../../validations/divyangDetails/personalDetails";
import { CODES } from "../../../constants/globalConstants";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [params] = useSearchParams();
  const isViewMode = state?.viewDetails;
  const editId = params.get("editId");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const handleOnReset = () => navigate(ROUTE_PATHS?.DIVYANG_DETAILS_LIST);

  const handleOnSubmit = (values) => {
    const payload = getValidValues(values);
    console.log(payload);
    // onSubmit(payload);
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
  } = formik;

  const { data: educationQualification } = useQuery({
    queryKey: ["educationQualificationList"],
    queryFn: () => getApiService(API_PATHS?.EDUCATION_QUALIFICATION),
    select: ({ data }) => data?.data,
  });

  const { data: communityCategory } = useQuery({
    queryKey: ["communityCategory"],
    queryFn: () => getApiService(API_PATHS?.COMMUNITY_CATEGORY),
    select: ({ data }) => data?.data,
  });

  const { data: educationQualificationSubType } = useQuery({
    queryKey: ["educationQualificationSubType", values?.qualification],
    queryFn: () =>
      getByIdApiService(
        API_PATHS.EDUCATION_QUALIFICATION,
        values?.qualification
      ),
    select: ({ data }) => data?.data?.educationQualification,
    enabled: !!values?.qualification,
  });

  useEffect(() => {
    if (values?.dateOfBirth)
      setFieldValue(fields?.age?.name, getAge(values?.dateOfBirth));
    else setFieldValue(fields?.age?.name, "");
  }, [values?.dateOfBirth]);

  useEffect(() => {
    if (values?.isMarried === CODES?.NO) {
      setFieldValue(fields?.spouseName?.name, "");
      setFieldValue(fields?.spouseNumber?.name, "");
      setFieldTouched(fields?.spouseName?.name, false);
      setFieldTouched(fields?.spouseNumber?.name, false);
    }
  }, [values?.isMarried]);

  useEffect(() => {
    setFieldValue(fields?.community?.name, "");
    setFieldTouched(fields?.community?.name, false);
  }, [values?.communityCategoryId]);

  return (
    <Grid direction={"column"} width={"100%"}>
      <StyledFormContainer width="100%">
        <Grid container columnSpacing={3} rowSpacing={1}>
          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.firstName?.label}
              name={fields?.firstName?.name}
              value={values?.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.firstName}
              touched={touched?.firstName}
              isViewMode={isViewMode}
              fieldType={fields?.firstName?.type}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.lastName?.label}
              name={fields?.lastName?.name}
              value={values?.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.lastName}
              touched={touched?.lastName}
              isViewMode={isViewMode}
              fieldType={fields?.lastName?.type}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.divyangId?.label}
              name={fields?.divyangId?.name}
              value={values?.divyangId}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.divyangId}
              touched={touched?.divyangId}
              isViewMode={isViewMode}
              fieldType={fields?.divyangId?.type}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FileUpload
              type={"image"}
              accept={"image/*"}
              setFieldValue={setFieldValue}
              name={fields?.picture?.name}
              // Blood Group
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

          <Grid item xs={12} md={6}>
            <CustomRadioButton
              name={fields?.gender?.name}
              label={fields?.gender?.label}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.gender || ""}
              touched={touched?.gender}
              errors={errors?.gender}
              isViewMode={isViewMode}
              accessor="code"
              inputValues={genders(true)}
              rowBreak
              labelStyle={{
                color: theme?.palette?.commonColor?.blue,
                fontSize: "16px",
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.bloodGroup?.label}
              name={fields?.bloodGroup?.name}
              value={values?.bloodGroup}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.bloodGroup}
              touched={touched?.bloodGroup}
              isViewMode={isViewMode}
              fieldType={fields?.bloodGroup?.type}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomDatePicker
              label={fields?.dateOfBirth?.label}
              name={fields?.dateOfBirth?.name}
              value={values?.dateOfBirth}
              onChange={setFieldValue}
              isViewMode={isViewMode}
              fullWidth
              maxDate={new Date()}
              onBlur={handleBlur}
              setTouched={setFieldTouched}
              errors={errors?.dateOfBirth}
              touched={touched?.dateOfBirth}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.age?.label}
              name={fields?.age?.name}
              value={values?.age}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.age}
              touched={touched?.age}
              isViewMode
              fieldType={fields?.age?.type}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.mailId?.label}
              name={fields?.mailId?.name}
              value={values?.mailId}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.mailId}
              touched={touched?.mailId}
              isViewMode={isViewMode}
              fieldType={fields?.mailId?.type}
            />
          </Grid>

          <Grid item xs={12} md={6}>
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

          <Grid item xs={12}>
            <DividerLine gap={"6px 0 24px"} />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.fatherName?.label}
              name={fields?.fatherName?.name}
              value={values?.fatherName}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.fatherName}
              touched={touched?.fatherName}
              isViewMode={isViewMode}
              fieldType={fields?.fatherName?.type}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.motherName?.label}
              name={fields?.motherName?.name}
              value={values?.motherName}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.motherName}
              touched={touched?.motherName}
              isViewMode={isViewMode}
              fieldType={fields?.motherName?.type}
            />
          </Grid>

          <Grid item xs={12}>
            <DividerLine gap={"6px 0 24px"} />
          </Grid>

          <Grid item xs={12}>
            <CustomRadioButton
              name={fields?.isMarried?.name}
              label={fields?.isMarried?.label}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.isMarried || ""}
              touched={touched?.isMarried}
              errors={errors?.isMarried}
              isViewMode={isViewMode}
              inputValues={yesNoSeed}
              rowBreak
              labelStyle={{
                color: theme?.palette?.commonColor?.blue,
                fontSize: "16px",
              }}
            />
          </Grid>
          <WithCondition isValid={values?.isMarried === CODES?.YES}>
            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.spouseName?.label}
                name={fields?.spouseName?.name}
                value={values?.spouseName}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.spouseName}
                touched={touched?.spouseName}
                isViewMode={isViewMode}
                fieldType={fields?.spouseName?.type}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.spouseNumber?.label}
                name={fields?.spouseNumber?.name}
                value={values?.spouseNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.spouseNumber}
                touched={touched?.spouseNumber}
                isViewMode={isViewMode}
                fieldType={fields?.spouseNumber?.type}
                maxLength={10}
              />
            </Grid>
          </WithCondition>

          <Grid item xs={12}>
            <DividerLine gap={"8px 0 24px"} />
          </Grid>

          <Grid item xs={12} md={6}>
            <SingleAutoComplete
              label={fields?.qualification?.label}
              name={fields?.qualification?.name}
              value={values?.qualification}
              onChange={(_, value) => {
                setFieldValue(fields?.qualification?.name, value);
                setFieldValue(fields?.eductionQualification?.name, "");
              }}
              onBlur={handleBlur}
              errors={errors?.qualification}
              touched={touched?.qualification}
              inputValues={educationQualification || []}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SingleAutoComplete
              label={fields?.eductionQualification?.label}
              name={fields?.eductionQualification?.name}
              value={values?.eductionQualification}
              onChange={(_, value) => {
                setFieldValue(fields?.eductionQualification?.name, value);
              }}
              onBlur={handleBlur}
              errors={errors?.eductionQualification}
              touched={touched?.eductionQualification}
              inputValues={educationQualificationSubType || []}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid item xs={12}>
            <DividerLine gap={"8px 0 24px"} />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.religion?.label}
              name={fields?.religion?.name}
              value={values?.religion}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.religion}
              touched={touched?.religion}
              isViewMode={isViewMode}
              fieldType={fields?.religion?.type}
            />
          </Grid>

          <Grid item xs={12} md={6} />

          <Grid item xs={12} md={6}>
            <SingleAutoComplete
              label={fields?.communityCategoryId?.label}
              name={fields?.communityCategoryId?.name}
              value={values?.communityCategoryId}
              onChange={(_, value) => {
                setFieldValue(fields?.communityCategoryId?.name, value);
              }}
              onBlur={handleBlur}
              errors={errors?.communityCategoryId}
              touched={touched?.communityCategoryId}
              inputValues={communityCategory || []}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.community?.label}
              name={fields?.community?.name}
              value={values?.community}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.community}
              touched={touched?.community}
              isViewMode={isViewMode}
              fieldType={fields?.community?.type}
            />
          </Grid>

          <Grid item xs={12}>
            <DividerLine gap={"8px 0 24px"} />
          </Grid>

          <Grid item xs={12}>
            <CustomTextarea
              minRows={3}
              label={fields?.extraCurricularActivity?.label}
              name={fields?.extraCurricularActivity?.name}
              value={values?.extraCurricularActivity}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.extraCurricularActivity}
              touched={touched?.extraCurricularActivity}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid item xs={12}>
            <DividerLine gap={"6px 0 24px"} />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomPasswordField
              label={fields?.password?.label}
              name={fields?.password?.name}
              showEyeIcon
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.password}
              touched={touched.password}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomPasswordField
              label={fields?.confirmPassword?.label}
              name={fields?.confirmPassword?.name}
              showEyeIcon
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
          </Grid>

          <FormActions
            handleSubmit={handleSubmit}
            handleOnReset={handleOnReset}
            isUpdate={!!editId}
            disableSubmit={isViewMode}
            submitLabel={"Save & Next"}
          />
        </Grid>
      </StyledFormContainer>
    </Grid>
  );
};

export default PersonalDetails;
