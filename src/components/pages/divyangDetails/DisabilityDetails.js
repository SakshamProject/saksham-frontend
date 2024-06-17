import { Grid, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getApiService,
  getByIdApiService,
  updateApiService,
} from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import {
  columnData,
  fields,
  initialValues,
  multiPartInitialState,
} from "../../../constants/divyangDetails/disabilityDetails";
import { getFilesUrl } from "../../../constants/divyangDetails/personalDetails";
import { CODES } from "../../../constants/globalConstants";
import { authorities, yesNoSeed } from "../../../constants/seeds";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { CustomTypography, StyledFormContainer, theme } from "../../../styles";
import { formatDate } from "../../../utils/common";
import {
  dispatchResponseAction,
  dispatchSnackbarError,
} from "../../../utils/dispatch";
import { multiPartFormData } from "../../../utils/multipartFormData";
import {
  multiValidationSchema,
  validationSchema,
} from "../../../validations/divyangDetails/disabilityDetails";
import {
  CustomDatePicker,
  CustomRadioButton,
  CustomReactTable,
  CustomTextField,
  DividerLine,
  DivyangDetail,
  FileUpload,
  FormActions,
  SingleAutoComplete,
  WithCondition,
} from "../../shared";

const DisabilityDetails = () => {
  const navigate = useNavigate();
  const { state, search } = useLocation();
  const userInfo = useSelector((state) => state?.userInfo);
  const params = new URLSearchParams(search);
  const action = params.get("action");
  const isViewMode = state?.viewDetails || false;
  const editId = state?.editId;
  const [tableEditId, setTableEditId] = useState("");
  const handleOnReset = () => navigate(ROUTE_PATHS?.DIVYANG_DETAILS_LIST);

  const handleSkip = () =>
    navigate(
      { pathname: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_ADDRESS, search },
      { state }
    );

  const handleOnSubmit = (values) => {
    if (values?.disabilities?.length < 1) {
      dispatchSnackbarError("At least one Disabilities must be specified");
    } else {
      const disabilities = values?.disabilities?.map((disability) => {
        console.log(multiPartFormData(disability, ["disabilityCard"]));
        return multiPartFormData(disability, ["disabilityCard"]);
      });
      console.log(disabilities);
      const payload = multiPartFormData(
        {
          disabilityDetails: {
            ...values,
            UDIDCardFile:
              typeof values?.UDIDCardFile === "object"
                ? "null"
                : values.UDIDCardFile,
          },
          UDIDCard: values?.UDIDCardFile,
          fileNames: { UDIDCardFileName: values?.UDIDCardFile?.name },
          pageNumber: 4,
          id: values?.id,
          personId: values?.person?.id,
        },
        ["UDIDCard"]
      );
      payload.set("disabilityDetails.disabilityCard", disabilities);
      onSubmit(payload);
    }
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["update"],
    mutationFn: (data) =>
      updateApiService(API_PATHS?.DIVYANG_DETAILS, editId, data),
    onSuccess: () => {
      dispatchResponseAction(
        "Disability Details",
        action ? CODES?.UPDATED : CODES?.SAVED
      );
      navigate(
        { pathname: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_EMPLOYMENT, search },
        { state }
      );
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
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  });

  const {
    values: multiValues,
    handleChange: multiHandleChange,
    handleBlur: multiHandleBlur,
    touched: multiTouched,
    errors: multiErrors,
    handleSubmit: multiHandleSubmit,
    setFieldValue: multiSetFieldValue,
    setFieldTouched: multiSetFieldTouched,
    setValues: multiSetValues,
    resetForm: multiResetForm,
  } = useFormik({
    initialValues: multiPartInitialState,
    validationSchema: multiValidationSchema,
    onSubmit: () => {
      const dataValue = {
        ...multiValues,
        isDisabilitySinceBirth:
          multiValues?.isDisabilitySinceBirth === CODES?.YES ? "true" : "false",
        disabilitySince:
          multiValues?.isDisabilitySinceBirth === CODES?.NO
            ? formatDate({
                date: multiValues?.disabilitySince,
                format: "iso",
              })
            : "",
        disabilityPercentage: Number(multiValues?.disabilityPercentage),
        dateOfIssue: formatDate({
          date: multiValues?.dateOfIssue,
          format: "iso",
        }),
        fileNames: {
          disabilityCardFileName: multiValues?.disabilityCard?.name,
        },
      };
      setValues({
        ...values,
        ...(!!tableEditId || tableEditId === 0
          ? {
              disabilities: [
                ...values?.disabilities?.slice(0, tableEditId),
                dataValue,
                ...values?.disabilities?.slice(tableEditId + 1),
              ],
            }
          : {
              disabilities: [...values?.disabilities, dataValue],
            }),
      });
      multiResetForm();
      setTableEditId("");
    },
  });

  console.log(multiErrors);

  const { data: disabilityTypes } = useQuery({
    queryKey: ["disabilityTypes"],
    queryFn: () => getApiService(API_PATHS?.DISABILITY_TYPE),
    select: ({ data }) => data?.data,
  });

  const { data: disabilitySubTypes } = useQuery({
    queryKey: ["disabilitySubTypes", multiValues?.disabilityTypeId],
    queryFn: () =>
      getByIdApiService(
        API_PATHS?.DISABILITY_TYPE,
        multiValues.disabilityTypeId
      ),
    select: ({ data }) => data?.data,
    enabled: !!multiValues.disabilityTypeId,
  });

  const { mutate } = useMutation({
    mutationKey: ["divyangGetById"],
    mutationFn: () => getByIdApiService(API_PATHS?.DIVYANG_DETAILS, editId),
    onSuccess: ({ data }) => {
      const { auditLog, ...remaining } = data?.data;
      setValues({
        ...initialValues,
        ...remaining,
        UDIDCardNumber: remaining?.udidCardNumber,
        UDIDEnrollmentNumber: remaining?.udidEnrollmentNumber,
        ...getFilesUrl(data?.files),
      });
    },
  });

  useEffect(() => {
    if (editId) mutate();
  }, []);

  const handleEditList = (id) => {
    setTableEditId(id);
    multiSetValues({
      ...values?.disabilities?.[id],
      isDisabilitySinceBirth:
        values?.disabilities?.[id]?.isDisabilitySinceBirth === "true" ||
        values?.disabilities?.[id]?.isDisabilitySinceBirth === true
          ? CODES?.YES
          : CODES?.NO,
    });
  };

  const handleDeleteList = (id) =>
    setFieldValue(
      "disabilities",
      values?.disabilities?.filter((_, index) => id !== index)
    );

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
            <WithCondition isValid={!isViewMode}>
              <Grid item xs={12} md={6}>
                <SingleAutoComplete
                  label={fields?.disabilityType?.label}
                  name={fields?.disabilityType?.name}
                  value={multiValues?.disabilityTypeId}
                  onChange={(_, value) => {
                    multiSetFieldValue(fields?.disabilityType?.name, value);
                    multiSetFieldValue(fields?.disabilities?.name, "");
                    multiSetFieldTouched(fields?.disabilities?.name, false);
                  }}
                  onBlur={multiHandleBlur}
                  errors={multiErrors?.disabilityTypeId}
                  touched={multiTouched?.disabilityTypeId}
                  inputValues={disabilityTypes || []}
                  isViewMode={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SingleAutoComplete
                  label={fields?.disabilities?.label}
                  name={fields?.disabilities?.name}
                  value={multiValues?.disabilitySubTypeId}
                  onChange={(_, value) => {
                    multiSetFieldValue(fields?.disabilities?.name, value);
                  }}
                  onBlur={multiHandleBlur}
                  errors={multiErrors?.disabilitySubTypeId}
                  touched={multiTouched?.disabilitySubTypeId}
                  inputValues={disabilitySubTypes?.disability || []}
                  isViewMode={isViewMode}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomRadioButton
                  name={fields?.isDisabilitySinceBirth?.name}
                  label={fields?.isDisabilitySinceBirth?.label}
                  onChange={(_, value) => {
                    multiSetValues({
                      ...multiValues,
                      isDisabilitySinceBirth: value,
                      disabilitySince: "",
                    });
                    multiSetFieldTouched(fields?.disabilitySince?.name, false);
                  }}
                  onBlur={multiHandleBlur}
                  value={multiValues?.isDisabilitySinceBirth || ""}
                  touched={multiTouched?.isDisabilitySinceBirth}
                  errors={multiErrors?.isDisabilitySinceBirth}
                  isViewMode={isViewMode}
                  inputValues={yesNoSeed}
                  rowBreak
                  labelStyle={{
                    color: theme?.palette?.commonColor?.blue,
                    fontSize: "16px",
                  }}
                />
              </Grid>

              <WithCondition
                isValid={multiValues?.isDisabilitySinceBirth === CODES?.NO}
              >
                <Grid item xs={12} md={6}>
                  <CustomDatePicker
                    label={fields?.disabilitySince?.label}
                    name={fields?.disabilitySince?.name}
                    value={multiValues?.disabilitySince}
                    onChange={multiSetFieldValue}
                    isViewMode={isViewMode}
                    maxDate={new Date()}
                    onBlur={multiHandleBlur}
                    setTouched={multiSetFieldTouched}
                    errors={multiErrors?.disabilitySince}
                    touched={multiTouched?.disabilitySince}
                  />
                </Grid>

                <Grid item xs={12} md={6} />
              </WithCondition>

              <Grid item xs={12} md={6}>
                <CustomTextField
                  label={fields?.disabilityArea?.label}
                  name={fields?.disabilityArea?.name}
                  value={multiValues?.disabilityArea}
                  onChange={multiHandleChange}
                  onBlur={multiHandleBlur}
                  errors={multiErrors?.disabilityArea}
                  touched={multiTouched?.disabilityArea}
                  isViewMode={isViewMode}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label={fields?.disabilityPercentage?.label}
                  name={fields?.disabilityPercentage?.name}
                  value={multiValues?.disabilityPercentage}
                  onChange={multiHandleChange}
                  onBlur={multiHandleBlur}
                  errors={multiErrors?.disabilityPercentage}
                  touched={multiTouched?.disabilityPercentage}
                  isViewMode={isViewMode}
                  maxLength={3}
                  fieldType={fields?.disabilityPercentage?.type}
                  endAdornment={
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: theme?.palette?.commonColor?.adornment,
                        userSelect: "none",
                      }}
                    >
                      %
                    </Typography>
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <CustomTextField
                  label={fields?.disabilityDueTo?.label}
                  name={fields?.disabilityDueTo?.name}
                  value={multiValues?.disabilityDueTo}
                  onChange={multiHandleChange}
                  onBlur={multiHandleBlur}
                  errors={multiErrors?.disabilityDueTo}
                  touched={multiTouched?.disabilityDueTo}
                  isViewMode={isViewMode}
                />
              </Grid>

              <Grid item xs={12}>
                <SingleAutoComplete
                  label={fields?.certificateIssuingAuthority?.label}
                  name={fields?.certificateIssuingAuthority?.name}
                  value={multiValues?.certificateIssueAuthority}
                  onChange={(_, value) => {
                    multiSetFieldValue(
                      fields?.certificateIssuingAuthority?.name,
                      value
                    );
                  }}
                  onBlur={handleBlur}
                  errors={multiErrors?.certificateIssueAuthority}
                  touched={multiTouched?.certificateIssueAuthority}
                  inputValues={authorities || []}
                  isViewMode={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FileUpload
                  type={"image"}
                  accept={"image/*"}
                  setFieldValue={multiSetFieldValue}
                  name={fields?.disabilityCard?.name}
                  label={fields?.disabilityCard?.label}
                  defaultLabel={fields?.disabilityCard?.label}
                  value={multiValues?.disabilityCard}
                  error={multiErrors?.disabilityCard}
                  touched={multiTouched?.disabilityCard}
                  onChange={(e) =>
                    multiSetFieldValue(
                      fields?.disabilityCard?.name,
                      e?.target?.files[0]
                    )
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <CustomDatePicker
                  label={fields?.dateOfIssue?.label}
                  name={fields?.dateOfIssue?.name}
                  value={multiValues?.dateOfIssue}
                  onChange={multiSetFieldValue}
                  isViewMode={isViewMode}
                  maxDate={new Date()}
                  onBlur={multiHandleBlur}
                  setTouched={multiSetFieldTouched}
                  errors={multiErrors?.dateOfIssue}
                  touched={multiTouched?.dateOfIssue}
                />
              </Grid>

              <FormActions
                handleSubmit={multiHandleSubmit}
                handleOnReset={() => {
                  multiResetForm();
                  setTableEditId("");
                }}
                resetLabel={"Clear"}
                isUpdate={!!tableEditId || tableEditId === 0}
                submitLabel="Add"
              />
            </WithCondition>

            <Grid item xs={12} mb={6}>
              <CustomReactTable
                columnData={
                  columnData({
                    data: disabilityTypes,
                    tableEditId,
                    handleDeleteList,
                    handleEditList,
                  }) || []
                }
                rawData={values?.disabilities || []}
                manualSort
                disablePagination
                disableLayout
              />
            </Grid>

            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <Grid item xs={12}>
              <CustomTypography capitalize={"capitalize"}>
                State Disability Book Details
              </CustomTypography>
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.stateCode?.label}
                name={fields?.stateCode?.name}
                value={values?.stateCode}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.stateCode}
                touched={touched?.stateCode}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.districtCode?.label}
                name={fields?.districtCode?.name}
                value={values?.districtCode}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.districtCode}
                touched={touched?.districtCode}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.identityCardNumber?.label}
                name={fields?.identityCardNumber?.name}
                value={values?.identityCardNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.identityCardNumber}
                touched={touched?.identityCardNumber}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.udidCardNumber?.label}
                name={fields?.udidCardNumber?.name}
                value={values?.UDIDCardNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.UDIDCardNumber}
                touched={touched?.UDIDCardNumber}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.udidEnrollmentNumber?.label}
                name={fields?.udidEnrollmentNumber?.name}
                value={values?.UDIDEnrollmentNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.UDIDEnrollmentNumber}
                touched={touched?.UDIDEnrollmentNumber}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                name={fields?.udidCardUrl?.name}
                label={fields?.udidCardUrl?.label}
                defaultLabel={fields?.udidCardUrl?.label}
                value={values?.UDIDCardFile}
                error={errors?.UDIDCardFile}
                touched={touched?.UDIDCardFile}
                onChange={(e) =>
                  setFieldValue(fields?.udidCardUrl?.name, e?.target?.files[0])
                }
              />
            </Grid>

            <FormActions
              handleSubmit={handleSubmit}
              handleOnReset={handleOnReset}
              isViewMode={isViewMode}
              disableSubmit={isViewMode}
              handleSkip={handleSkip}
              skipLabel={"Prev"}
              submitLabel={"Save\xa0&\xa0Next"}
            />
          </Grid>
        </StyledFormContainer>
      </Grid>
    </Grid>
  );
};

export default DisabilityDetails;
