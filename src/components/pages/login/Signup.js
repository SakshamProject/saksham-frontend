import { ArrowBack } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { postApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { CODES } from "../../../constants/globalConstants";
import { fields, initialValues } from "../../../constants/login/signup";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import {
  BackIcon,
  FormWrapper,
  SignupContainer,
  SignupWrapper,
  Title,
  TitleContainer,
} from "../../../styles/signup";
import { formatDate } from "../../../utils/common";
import { dispatchResponseAction } from "../../../utils/dispatch";
import { multiPartFormData } from "../../../utils/multipartFormData";
import { validationSchema } from "../../../validations/login/signup";
import {
  CustomDatePicker,
  CustomPasswordField,
  CustomRadioButton,
  CustomTextField,
  DividerLine,
  FileUpload,
  FormActions,
} from "../../shared";

const Signup = () => {
  const navigate = useNavigate();

  const handleOnReset = () => navigate(ROUTE_PATHS?.LOGIN);

  const handleOnSubmit = (values) => {
    const payload = multiPartFormData(
      {
        ...values,
        dateOfBirth: formatDate({ date: values?.dateOfBirth, format: "iso" }),
      },
      [],
      ["profilePhoto"]
    );
    onSubmit(payload);
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["divyangSignup"],
    mutationFn: (data) => postApiService(API_PATHS?.SIGNUP, data),
    onSuccess: () => {
      dispatchResponseAction("Divyang", CODES?.CREATED);
      handleOnReset();
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
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  });

  return (
    <SignupContainer>
      <SignupWrapper>
        <TitleContainer>
          <BackIcon onClick={() => handleOnReset()}>
            <ArrowBack />
          </BackIcon>
          <Title>Sign Up</Title>
        </TitleContainer>

        <FormWrapper container rowSpacing={2} columnSpacing={3}>
          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.firstName?.label}
              name={fields?.firstName?.name}
              fieldType={fields?.firstName?.fieldType}
              value={values?.firstName}
              errors={errors?.firstName}
              touched={touched?.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.lastName?.label}
              name={fields?.lastName?.name}
              fieldType={fields?.lastName?.fieldType}
              value={values?.lastName}
              errors={errors?.lastName}
              touched={touched?.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.divyangId?.label}
              name={fields?.divyangId?.name}
              value={values?.divyangId}
              errors={errors?.divyangId}
              touched={touched?.divyangId}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FileUpload
              name={fields?.profilePhoto?.name}
              type={fields?.profilePhoto?.type}
              accept={fields?.profilePhoto?.accept}
              defaultLabel={fields?.profilePhoto?.label}
              setFieldValue={setFieldValue}
              value={values?.profilePhoto}
              error={errors?.profilePhoto}
              touched={touched?.profilePhoto}
              onChange={(e) =>
                setFieldValue(fields?.profilePhoto?.name, e?.target?.files[0])
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomRadioButton
              rowBreak
              name={fields?.gender?.name}
              label={fields?.gender?.label}
              isHelperText={fields?.gender?.isHelperText}
              inputValues={fields?.gender?.inputValues}
              labelStyle={fields?.gender?.labelStyle}
              value={values?.gender}
              touched={touched?.gender}
              errors={errors?.gender}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomDatePicker
              label={fields?.dateOfBirth?.label}
              name={fields?.dateOfBirth?.name}
              maxDate={fields?.dateOfBirth?.maxDate}
              value={values?.dateOfBirth}
              errors={errors?.dateOfBirth}
              touched={touched?.dateOfBirth}
              onChange={setFieldValue}
              setTouched={setFieldTouched}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.mailId?.label}
              name={fields?.mailId?.name}
              fieldType={fields?.mailId?.fieldType}
              value={values?.mailId}
              errors={errors?.mailId}
              touched={touched?.mailId}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.mobileNumber?.label}
              name={fields?.mobileNumber?.name}
              type={fields?.mobileNumber?.type}
              maxLength={fields?.mobileNumber?.maxLength}
              value={values?.mobileNumber}
              errors={errors?.mobileNumber}
              touched={touched?.mobileNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.aadharCardNumber?.label}
              name={fields?.aadharCardNumber?.name}
              type={fields?.aadharCardNumber?.type}
              maxLength={fields?.aadharCardNumber?.maxLength}
              value={values?.aadharCardNumber}
              errors={errors?.aadharCardNumber}
              touched={touched?.aadharCardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.UDIDCardNumber?.label}
              name={fields?.UDIDCardNumber?.name}
              value={values?.UDIDCardNumber}
              errors={errors?.UDIDCardNumber}
              touched={touched?.UDIDCardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12}>
            <DividerLine gap={"-8px 0 14px 0px"} />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label={fields?.userName?.label}
              name={fields?.userName?.name}
              value={values?.userName}
              errors={errors?.userName}
              touched={touched?.userName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomPasswordField
              showEyeIcon
              label={fields?.password?.label}
              name={fields?.password?.name}
              value={values?.password}
              errors={errors?.password}
              touched={touched?.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomPasswordField
              showEyeIcon
              label={fields?.confirmPassword?.label}
              name={fields?.confirmPassword?.name}
              value={values?.confirmPassword}
              errors={errors?.confirmPassword}
              touched={touched?.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item container sx={{ marginTop: "-24px" }}>
            <FormActions
              handleOnReset={handleOnReset}
              handleSubmit={handleSubmit}
            />
          </Grid>
        </FormWrapper>

        <Box sx={{ height: "28px" }}></Box>
      </SignupWrapper>
    </SignupContainer>
  );
};

export default Signup;
