import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../routes/routePaths";

import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getByIdApiService, updateApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import {
  fields,
  initialValues,
} from "../../../constants/divyangDetails/employementDetails";
import { getFilesUrl } from "../../../constants/divyangDetails/personalDetails";
import { CODES } from "../../../constants/globalConstants";
import { yesNoSeed } from "../../../constants/seeds";
import { StyledFormContainer, theme } from "../../../styles";
import { formatDate } from "../../../utils/common";
import { dispatchResponseAction } from "../../../utils/dispatch";
import { multiPartFormData } from "../../../utils/multipartFormData";
import { validationSchema } from "../../../validations/divyangDetails/employementDetails";
import {
  CustomDatePicker,
  CustomRadioButton,
  CustomTextField,
  DivyangDetail,
  FormActions,
  WithCondition,
} from "../../shared";

const EmploymentDetails = () => {
  const navigate = useNavigate();
  const { state, search } = useLocation();
  const userInfo = useSelector((state) => state?.userInfo);
  const params = new URLSearchParams(search);
  const action = params.get("action");
  const isViewMode = state?.viewDetails || false;
  const editId = state?.editId;

  const handleOnReset = () =>
    navigate(ROUTE_PATHS?.DIVYANG_DETAILS_LIST, {
      state: {
        isViewMode: isViewMode,
        editId: editId,
      },
    });
  const handleSkip = () =>
    navigate(ROUTE_PATHS?.DIVYANG_DETAILS_FORM_DISABILITY, {
      state: {
        isViewMode: isViewMode,
        editId: editId,
      },
    });

  const handleOnSubmit = (values) => {
    const payload = multiPartFormData({
      employmentDetails: {
        ...values,
        isEmployed: values?.isEmployed === CODES?.YES ? "true" : "false",
        unemployedSince:
          values?.isEmployed === CODES?.NO
            ? formatDate({
                date: values?.unemployedSince,
                format: "iso",
              })
            : "",
      },
      pageNumber: 5,
    });
    onSubmit(payload);
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["update"],
    mutationFn: (data) =>
      updateApiService(API_PATHS?.DIVYANG_DETAILS, editId, data),
    onSuccess: () => {
      dispatchResponseAction(
        "Employment Details",
        action ? CODES?.UPDATED : CODES?.SAVED
      );
      navigate(ROUTE_PATHS?.DIVYANG_DETAILS_LIST);
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
    setTouched,
  } = formik;

  const { mutate } = useMutation({
    mutationKey: ["divyangGetById"],
    mutationFn: () => getByIdApiService(API_PATHS?.DIVYANG_DETAILS, editId),
    onSuccess: ({ data }) => {
      const { auditLog, ...remaining } = data?.data;
      setValues({
        ...initialValues,
        ...remaining,
        isEmployed: data?.data?.isEmployed === false ? CODES.NO : CODES.YES,
        ...getFilesUrl(data?.files),
      });
    },
  });

  useEffect(() => {
    if (editId) mutate();
  }, []);

  return (
    <Grid container direction={"column"} width={"100%"} rowSpacing={2}>
      <WithCondition isValid={userInfo?.role !== CODES?.DIVYANG}>
        <Grid item xs={12}>
          <DivyangDetail divyangDetail={values || ""} />
        </Grid>
      </WithCondition>

      <Grid item xs={12}>
        <StyledFormContainer style={{ width: "100%", marginTop: "8px" }}>
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item xs={12}>
              <CustomRadioButton
                name={fields?.isEmployed?.name}
                label={fields?.isEmployed?.label}
                onChange={(_, value) => {
                  setValues({
                    ...values,
                    isEmployed: value,
                    unemployedSince: "",
                  });
                  setFieldTouched(fields?.unemployedSince?.name, false);
                }}
                onBlur={handleBlur}
                value={values?.isEmployed || ""}
                touched={touched?.isEmployed}
                errors={errors?.isEmployed}
                isViewMode={isViewMode}
                inputValues={yesNoSeed}
                rowBreak
                labelStyle={{
                  color: theme?.palette?.commonColor?.blue,
                  fontSize: "16px",
                }}
              />
            </Grid>

            <WithCondition isValid={values?.isEmployed === CODES?.NO}>
              <Grid item xs={12} md={6}>
                <CustomDatePicker
                  label={fields?.unemployedSince?.label}
                  name={fields?.unemployedSince?.name}
                  value={values?.unemployedSince}
                  onChange={setFieldValue}
                  isViewMode={isViewMode}
                  maxDate={new Date()}
                  onBlur={handleBlur}
                  setTouched={setFieldTouched}
                  errors={errors?.unemployedSince}
                  touched={touched?.unemployedSince}
                />
              </Grid>

              <Grid item xs={12} md={6} />
            </WithCondition>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.occupation?.label}
                name={fields?.occupation?.name}
                value={values?.occupation}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.occupation}
                touched={touched?.occupation}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.income?.label}
                name={fields?.income?.name}
                value={values?.income}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.income}
                touched={touched?.income}
                isViewMode={isViewMode}
                fieldType={fields?.income?.type}
                maxLength={12}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.fatherOccupation?.label}
                name={fields?.fatherOccupation?.name}
                value={values?.fatherOccupation}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.fatherOccupation}
                touched={touched?.fatherOccupation}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.fatherIncome?.label}
                name={fields?.fatherIncome?.name}
                value={values?.fatherIncome}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.fatherIncome}
                touched={touched?.fatherIncome}
                isViewMode={isViewMode}
                fieldType={fields?.fatherIncome?.type}
                maxLength={12}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.motherOccupation?.label}
                name={fields?.motherOccupation?.name}
                value={values?.motherOccupation}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.motherOccupation}
                touched={touched?.motherOccupation}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.motherIncome?.label}
                name={fields?.motherIncome?.name}
                value={values?.motherIncome}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.motherIncome}
                touched={touched?.motherIncome}
                isViewMode={isViewMode}
                fieldType={fields?.motherIncome?.type}
                maxLength={12}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.spouseOccupation?.label}
                name={fields?.spouseOccupation?.name}
                value={values?.spouseOccupation}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.spouseOccupation}
                touched={touched?.spouseOccupation}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.spouseIncome?.label}
                name={fields?.spouseIncome?.name}
                value={values?.spouseIncome}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.spouseIncome}
                touched={touched?.spouseIncome}
                isViewMode={isViewMode}
                fieldType={fields?.spouseIncome?.type}
                maxLength={12}
              />
            </Grid>

            <FormActions
              handleSubmit={handleSubmit}
              handleOnReset={handleOnReset}
              isViewMode={isViewMode}
              disableSubmit={isViewMode}
              handleSkip={handleSkip}
              skipLabel={"Prev"}
            />
          </Grid>
        </StyledFormContainer>
      </Grid>
    </Grid>
  );
};

export default EmploymentDetails;
