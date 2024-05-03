import { Grid } from "@mui/material";
import { useFormik } from "formik";
import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import {
  fields,
  initialValues,
} from "../../../constants/divyangDetails/idProffUploads";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { StyledFormContainer } from "../../../styles";
import { getValidValues } from "../../../utils/common";
import { dispatchSnackbarError } from "../../../utils/dispatch";
import { multiPartFormData } from "../../../utils/multipartFormData";
import { validationSchema } from "../../../validations/divyangDetails/idProffUploads";
import {
  CustomTextField,
  DividerLine,
  DivyangDetail,
  FileUpload,
  FormActions,
} from "../../shared";

const IdProffUploads = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isViewMode = state?.isViewMode;
  const editId = state?.editId;

  const handleOnReset = () =>
    navigate(ROUTE_PATHS?.DIVYANG_DETAILS_LIST, {
      state: {
        isViewMode: isViewMode,
        editId: editId,
      },
    });
  const handleSkip = () =>
    navigate(ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL, {
      state: {
        isViewMode: isViewMode,
        editId: editId,
      },
    });

  const handleOnSubmit = (values) => {
    if (Object.keys(getValidValues(values))?.length < 4 && false) {
      dispatchSnackbarError("Atleast Upload any 2 Id Proofs");
    } else {
      const payload = multiPartFormData(values);
      // onSubmit(payload);
      navigate(ROUTE_PATHS?.DIVYANG_DETAILS_FORM_ADDRESS, {
        state: {
          isViewMode: isViewMode,
          editId: editId,
        },
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
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

  return (
    <Grid container direction={"column"} width={"100%"} rowSpacing={2}>
      <Grid item xs={12}>
        <DivyangDetail />
      </Grid>
      <Grid item xs={12}>
        <StyledFormContainer width="100%">
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.voterId?.label}
                name={fields?.voterId?.name}
                value={values?.voterId}
                onChange={(e) => {
                  setFieldValue(
                    fields?.voterId?.name,
                    e?.target?.value?.toUpperCase()
                  );
                  if (!values?.voterId)
                    setFieldTouched(fields?.voterIdPicture?.name, false);
                }}
                onBlur={handleBlur}
                errors={errors?.voterId}
                touched={touched?.voterId}
                isViewMode={isViewMode}
                fieldType={fields?.voterId?.type}
                maxLength={10}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                name={fields?.voterIdPicture?.name}
                label={fields?.voterIdPicture?.label}
                defaultLabel={fields?.voterIdPicture?.label}
                value={values?.voterIdPicture}
                error={errors?.voterIdPicture}
                touched={touched?.voterIdPicture}
                onChange={(e) => {
                  setFieldValue(
                    fields?.voterIdPicture?.name,
                    e?.target?.files[0] || ""
                  );
                  if (e?.target?.files[0])
                    setFieldTouched(fields?.voterIdPicture?.name, false);
                  setFieldTouched(fields?.voterId?.name, false);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.panCardNumber?.label}
                name={fields?.panCardNumber?.name}
                value={values?.panCardNumber}
                onChange={(e) => {
                  setFieldValue(
                    fields?.panCardNumber?.name,
                    e?.target?.value?.toUpperCase()
                  );
                  if (!values?.panCardNumber)
                    setFieldTouched(fields?.panCardPicture?.name, false);
                }}
                onBlur={handleBlur}
                errors={errors?.panCardNumber}
                touched={touched?.panCardNumber}
                isViewMode={isViewMode}
                fieldType={fields?.panCardNumber?.type}
                maxLength={10}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                name={fields?.panCardPicture?.name}
                label={fields?.panCardPicture?.label}
                defaultLabel={fields?.panCardPicture?.label}
                value={values?.panCardPicture}
                error={errors?.panCardPicture}
                touched={touched?.panCardPicture}
                onChange={(e) => {
                  setFieldValue(
                    fields?.panCardPicture?.name,
                    e?.target?.files[0] || ""
                  );
                  if (e?.target?.files[0])
                    setFieldTouched(fields?.panCardPicture?.name, false);
                  setFieldTouched(fields?.panCardNumber?.name, false);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.drivingLicense?.label}
                name={fields?.drivingLicense?.name}
                value={values?.drivingLicense}
                onChange={(e) => {
                  setFieldValue(
                    fields?.drivingLicense?.name,
                    e?.target?.value?.toUpperCase()
                  );
                  if (!values?.drivingLicense)
                    setFieldTouched(fields?.drivingLicensePicture?.name, false);
                }}
                onBlur={handleBlur}
                errors={errors?.drivingLicense}
                touched={touched?.drivingLicense}
                isViewMode={isViewMode}
                fieldType={fields?.drivingLicense?.type}
                maxLength={15}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                name={fields?.drivingLicensePicture?.name}
                label={fields?.drivingLicensePicture?.label}
                defaultLabel={fields?.drivingLicensePicture?.label}
                value={values?.drivingLicensePicture}
                error={errors?.drivingLicensePicture}
                touched={touched?.drivingLicensePicture}
                onChange={(e) => {
                  setFieldValue(
                    fields?.drivingLicensePicture?.name,
                    e?.target?.files[0] || ""
                  );
                  if (e?.target?.files[0])
                    setFieldTouched(fields?.drivingLicensePicture?.name, false);
                  setFieldTouched(fields?.drivingLicense?.name, false);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.rationCardNumber?.label}
                name={fields?.rationCardNumber?.name}
                value={values?.rationCardNumber}
                onChange={(e) => {
                  setFieldValue(
                    fields?.rationCardNumber?.name,
                    e?.target?.value
                  );
                  if (!values?.rationCardNumber)
                    setFieldTouched(fields?.rationCardPicture?.name, false);
                }}
                onBlur={handleBlur}
                errors={errors?.rationCardNumber}
                touched={touched?.rationCardNumber}
                isViewMode={isViewMode}
                fieldType={fields?.rationCardNumber?.type}
                maxLength={12}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                name={fields?.rationCardPicture?.name}
                label={fields?.rationCardPicture?.label}
                defaultLabel={fields?.rationCardPicture?.label}
                value={values?.rationCardPicture}
                error={errors?.rationCardPicture}
                touched={touched?.rationCardPicture}
                onChange={(e) => {
                  setFieldValue(
                    fields?.rationCardPicture?.name,
                    e?.target?.files[0] || ""
                  );
                  if (e?.target?.files[0])
                    setFieldTouched(fields?.rationCardPicture?.name, false);
                  setFieldTouched(fields?.rationCardNumber?.name, false);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.aadharCardNumber?.label}
                name={fields?.aadharCardNumber?.name}
                value={values?.aadharCardNumber}
                onChange={(e) => {
                  setFieldValue(
                    fields?.aadharCardNumber?.name,
                    e?.target?.value
                  );
                  if (!values?.aadharCardNumber)
                    setFieldTouched(fields?.aadharCardPicture?.name, false);
                }}
                onBlur={handleBlur}
                errors={errors?.aadharCardNumber}
                touched={touched?.aadharCardNumber}
                isViewMode={isViewMode}
                fieldType={fields?.aadharCardNumber?.type}
                maxLength={12}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                name={fields?.aadharCardPicture?.name}
                label={fields?.aadharCardPicture?.label}
                defaultLabel={fields?.aadharCardPicture?.label}
                value={values?.aadharCardPicture}
                error={errors?.aadharCardPicture}
                touched={touched?.aadharCardPicture}
                onChange={(e) => {
                  setFieldValue(
                    fields?.aadharCardPicture?.name,
                    e?.target?.files[0] || ""
                  );
                  if (e?.target?.files[0])
                    setFieldTouched(fields?.aadharCardPicture?.name, false);
                  setFieldTouched(fields?.aadharCardNumber?.name, false);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.pensionCardNumber?.label}
                name={fields?.pensionCardNumber?.name}
                value={values?.pensionCardNumber}
                onChange={(e) => {
                  setFieldValue(
                    fields?.pensionCardNumber?.name,
                    e?.target?.value
                  );
                  if (!values?.pensionCardNumber)
                    setFieldTouched(fields?.pensionCardPicture?.name, false);
                }}
                onBlur={handleBlur}
                errors={errors?.pensionCardNumber}
                touched={touched?.pensionCardNumber}
                isViewMode={isViewMode}
                fieldType={fields?.pensionCardNumber?.type}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                name={fields?.pensionCardPicture?.name}
                label={fields?.pensionCardPicture?.label}
                defaultLabel={fields?.pensionCardPicture?.label}
                value={values?.pensionCardPicture}
                error={errors?.pensionCardPicture}
                touched={touched?.pensionCardPicture}
                onChange={(e) => {
                  setFieldValue(
                    fields?.pensionCardPicture?.name,
                    e?.target?.files[0] || ""
                  );
                  if (e?.target?.files[0])
                    setFieldTouched(fields?.pensionCardPicture?.name, false);
                  setFieldTouched(fields?.pensionCardNumber?.name, false);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.medicalInsuranceNumber?.label}
                name={fields?.medicalInsuranceNumber?.name}
                value={values?.medicalInsuranceNumber}
                onChange={(e) => {
                  setFieldValue(
                    fields?.medicalInsuranceNumber?.name,
                    e?.target?.value
                  );
                  if (!values?.medicalInsuranceNumber)
                    setFieldTouched(
                      fields?.medicalInsurancePicture?.name,
                      false
                    );
                }}
                onBlur={handleBlur}
                errors={errors?.medicalInsuranceNumber}
                touched={touched?.medicalInsuranceNumber}
                isViewMode={isViewMode}
                fieldType={fields?.medicalInsuranceNumber?.type}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                name={fields?.medicalInsurancePicture?.name}
                label={fields?.medicalInsurancePicture?.label}
                defaultLabel={fields?.medicalInsurancePicture?.label}
                value={values?.medicalInsurancePicture}
                error={errors?.medicalInsurancePicture}
                touched={touched?.medicalInsurancePicture}
                onChange={(e) => {
                  setFieldValue(
                    fields?.medicalInsurancePicture?.name,
                    e?.target?.files[0] || ""
                  );
                  if (e?.target?.files[0])
                    setFieldTouched(
                      fields?.medicalInsurancePicture?.name,
                      false
                    );
                  setFieldTouched(fields?.medicalInsuranceNumber?.name, false);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.disabilitySchemeNumber?.label}
                name={fields?.disabilitySchemeNumber?.name}
                value={values?.disabilitySchemeNumber}
                onChange={(e) => {
                  setFieldValue(
                    fields?.disabilitySchemeNumber?.name,
                    e?.target?.value
                  );
                  if (!values?.disabilitySchemeNumber)
                    setFieldTouched(
                      fields?.disabilitySchemePicture?.name,
                      false
                    );
                }}
                onBlur={handleBlur}
                errors={errors?.disabilitySchemeNumber}
                touched={touched?.disabilitySchemeNumber}
                isViewMode={isViewMode}
                fieldType={fields?.disabilitySchemeNumber?.type}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                name={fields?.disabilitySchemePicture?.name}
                label={fields?.disabilitySchemePicture?.label}
                defaultLabel={fields?.disabilitySchemePicture?.label}
                value={values?.disabilitySchemePicture}
                error={errors?.disabilitySchemePicture}
                touched={touched?.disabilitySchemePicture}
                onChange={(e) => {
                  setFieldValue(
                    fields?.disabilitySchemePicture?.name,
                    e?.target?.files[0] || ""
                  );
                  if (e?.target?.files[0])
                    setFieldTouched(
                      fields?.disabilitySchemePicture?.name,
                      false
                    );
                  setFieldTouched(fields?.disabilitySchemeNumber?.name, false);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.BPL_OR_APL_Number?.label}
                name={fields?.BPL_OR_APL_Number?.name}
                value={values?.BPL_OR_APL_Number}
                onChange={(e) => {
                  setFieldValue(
                    fields?.BPL_OR_APL_Number?.name,
                    e?.target?.value
                  );
                  if (!values?.BPL_OR_APL_Number)
                    setFieldTouched(fields?.BPL_OR_APL_Picture?.name, false);
                }}
                onBlur={handleBlur}
                errors={errors?.BPL_OR_APL_Number}
                touched={touched?.BPL_OR_APL_Number}
                isViewMode={isViewMode}
                fieldType={fields?.BPL_OR_APL_Number?.type}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                name={fields?.BPL_OR_APL_Picture?.name}
                label={fields?.BPL_OR_APL_Picture?.label}
                defaultLabel={fields?.BPL_OR_APL_Picture?.label}
                value={values?.BPL_OR_APL_Picture}
                error={errors?.BPL_OR_APL_Picture}
                touched={touched?.BPL_OR_APL_Picture}
                onChange={(e) => {
                  setFieldValue(
                    fields?.BPL_OR_APL_Picture?.name,
                    e?.target?.files[0] || ""
                  );
                  if (e?.target?.files[0])
                    setFieldTouched(fields?.BPL_OR_APL_Picture?.name, false);
                  setFieldTouched(fields?.BPL_OR_APL_Number?.name, false);
                }}
              />
            </Grid>

            <FormActions
              handleSubmit={handleSubmit}
              handleOnReset={handleOnReset}
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

export default IdProffUploads;
