import { Grid } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getByIdApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import {
  fields,
  initialValues,
} from "../../../constants/divyangDetails/idProffUploads";
import { useCustomQuery } from "../../../hooks/useCustomQuery";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { StyledFormContainer } from "../../../styles";
import { getNeededValues, getValidValues } from "../../../utils/common";
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
  const isViewMode = state?.isViewMode || false;
  const editId = state?.editId;

  const handleOnReset = () =>
    navigate(ROUTE_PATHS?.DIVYANG_DETAILS_LIST, {
      state: {
        isViewMode,
        editId,
      },
    });

  const handleSkip = () =>
    navigate(ROUTE_PATHS?.DIVYANG_DETAILS_FORM_PERSONAL, {
      state: {
        isViewMode,
        editId,
      },
    });

  const handleOnSubmit = (values) => {
    console.log(getValidValues(values));
    if (Object.keys(getValidValues(values))?.length < 4) {
      dispatchSnackbarError("At least Upload any 2 Id Proofs");
    } else {
      const payload = multiPartFormData(values);

      console.log({ payload });

      // onSubmit(payload);
      // navigate(ROUTE_PATHS?.DIVYANG_DETAILS_FORM_ADDRESS, {
      //   state: {
      //     isViewMode: isViewMode,
      //     editId: editId,
      //   },
      // });
    }
  };

  useCustomQuery({
    queryKey: ["divyangGetById", editId],
    queryFn: () => getByIdApiService(API_PATHS?.DIVYANG_DETAILS, editId),
    enabled: !!editId,
    onSuccess: ({ data }) => {
      setValues(
        getNeededValues(
          {
            ...initialValues,
            ...data?.data,
          },
          {
            ...initialValues,
            voterIdFileName: "",
            panCardFileName: "",
            drivingLicenseFileName: "",
            rationCardFileName: "",
            aadharCardFileName: "",
            pensionCardFileName: "",
            medicalInsuranceCardFileName: "",
            disabilitySchemeCardFileName: "",
            BPL_OR_APL_CardFileName: "",
            firstName: "",
            lastName: "",
            mobileNumber: "",
            divyangId: "",
          }
        )
      );
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: handleOnSubmit,
  });

  const {
    values,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    setValues,
  } = formik;

  return (
    <Grid container direction={"column"} width={"100%"} rowSpacing={2}>
      <Grid item xs={12}>
        <DivyangDetail divyangDetail={values || ""} />
      </Grid>

      <Grid item xs={12}>
        <StyledFormContainer sx={{ width: "100% !important" }}>
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.voterIdNumber?.label}
                name={fields?.voterIdNumber?.name}
                value={values?.voterIdNumber}
                onChange={(e) => {
                  setFieldValue(
                    fields?.voterIdNumber?.name,
                    e?.target?.value?.toUpperCase()
                  );
                }}
                onBlur={handleBlur}
                errors={errors?.voterIdNumber}
                touched={touched?.voterIdNumber}
                isViewMode={isViewMode}
                fieldType={fields?.voterIdNumber?.fieldType}
                maxLength={10}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                disabled={isViewMode}
                name={fields?.voterId?.name}
                defaultLabel={fields?.voterId?.label}
                label={values?.voterIdFileName}
                value={values?.voterId}
                error={errors?.voterId}
                touched={touched?.voterId}
                onChange={(e) => {
                  setFieldValue(fields?.voterId?.name, e?.target?.files[0]);
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
                }}
                onBlur={handleBlur}
                errors={errors?.panCardNumber}
                touched={touched?.panCardNumber}
                isViewMode={isViewMode}
                fieldType={fields?.panCardNumber?.fieldType}
                maxLength={10}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                disabled={isViewMode}
                name={fields?.panCard?.name}
                defaultLabel={fields?.panCard?.label}
                label={values?.panCardFileName}
                value={values?.panCard}
                error={errors?.panCard}
                touched={touched?.panCard}
                onChange={(e) => {
                  setFieldValue(fields?.panCard?.name, e?.target?.files[0]);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <DividerLine gap={"8px 0 24px"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.drivingLicenseNumber?.label}
                name={fields?.drivingLicenseNumber?.name}
                value={values?.drivingLicenseNumber}
                onChange={(e) => {
                  setFieldValue(
                    fields?.drivingLicenseNumber?.name,
                    e?.target?.value?.toUpperCase()
                  );
                }}
                onBlur={handleBlur}
                errors={errors?.drivingLicenseNumber}
                touched={touched?.drivingLicenseNumber}
                isViewMode={isViewMode}
                fieldType={fields?.drivingLicenseNumber?.fieldType}
                maxLength={15}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                disabled={isViewMode}
                name={fields?.drivingLicense?.name}
                defaultLabel={fields?.drivingLicense?.label}
                label={values?.drivingLicenseFileName}
                value={values?.drivingLicense}
                error={errors?.drivingLicense}
                touched={touched?.drivingLicense}
                onChange={(e) => {
                  setFieldValue(
                    fields?.drivingLicense?.name,
                    e?.target?.files[0]
                  );
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
                }}
                onBlur={handleBlur}
                errors={errors?.rationCardNumber}
                touched={touched?.rationCardNumber}
                isViewMode={isViewMode}
                fieldType={fields?.rationCardNumber?.fieldType}
                maxLength={12}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                disabled={isViewMode}
                name={fields?.rationCard?.name}
                defaultLabel={fields?.rationCard?.label}
                label={values?.rationCardFileName}
                value={values?.rationCard}
                error={errors?.rationCard}
                touched={touched?.rationCard}
                onChange={(e) => {
                  setFieldValue(fields?.rationCard?.name, e?.target?.files[0]);
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
                }}
                onBlur={handleBlur}
                errors={errors?.aadharCardNumber}
                touched={touched?.aadharCardNumber}
                isViewMode={isViewMode}
                type={fields?.aadharCardNumber?.type}
                maxLength={12}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                disabled={isViewMode}
                name={fields?.aadharCard?.name}
                defaultLabel={fields?.aadharCard?.label}
                label={values?.aadharCardFileName}
                value={values?.aadharCard}
                error={errors?.aadharCard}
                touched={touched?.aadharCard}
                onChange={(e) => {
                  setFieldValue(fields?.aadharCard?.name, e?.target?.files[0]);
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
                }}
                onBlur={handleBlur}
                errors={errors?.pensionCardNumber}
                touched={touched?.pensionCardNumber}
                isViewMode={isViewMode}
                fieldType={fields?.pensionCardNumber?.fieldType}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                disabled={isViewMode}
                name={fields?.pensionCard?.name}
                defaultLabel={fields?.pensionCard?.label}
                label={values?.pensionCardFileName}
                value={values?.pensionCard}
                error={errors?.pensionCard}
                touched={touched?.pensionCard}
                onChange={(e) => {
                  setFieldValue(fields?.pensionCard?.name, e?.target?.files[0]);
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
                }}
                onBlur={handleBlur}
                errors={errors?.medicalInsuranceNumber}
                touched={touched?.medicalInsuranceNumber}
                isViewMode={isViewMode}
                fieldType={fields?.medicalInsuranceNumber?.fieldType}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                disabled={isViewMode}
                name={fields?.medicalInsuranceCard?.name}
                defaultLabel={fields?.medicalInsuranceCard?.label}
                label={values?.medicalInsuranceCardFileName}
                value={values?.medicalInsuranceCard}
                error={errors?.medicalInsuranceCard}
                touched={touched?.medicalInsuranceCard}
                onChange={(e) => {
                  setFieldValue(
                    fields?.medicalInsuranceCard?.name,
                    e?.target?.files[0]
                  );
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
                }}
                onBlur={handleBlur}
                errors={errors?.disabilitySchemeNumber}
                touched={touched?.disabilitySchemeNumber}
                isViewMode={isViewMode}
                fieldType={fields?.disabilitySchemeNumber?.fieldType}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                disabled={isViewMode}
                name={fields?.disabilitySchemeCard?.name}
                defaultLabel={fields?.disabilitySchemeCard?.label}
                label={values?.disabilitySchemeCardFileName}
                value={values?.disabilitySchemeCard}
                error={errors?.disabilitySchemeCard}
                touched={touched?.disabilitySchemeCard}
                onChange={(e) => {
                  setFieldValue(
                    fields?.disabilitySchemeCard?.name,
                    e?.target?.files[0]
                  );
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
                }}
                onBlur={handleBlur}
                errors={errors?.BPL_OR_APL_Number}
                touched={touched?.BPL_OR_APL_Number}
                isViewMode={isViewMode}
                fieldType={fields?.BPL_OR_APL_Number?.fieldType}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                type={"image"}
                accept={"image/*"}
                setFieldValue={setFieldValue}
                disabled={isViewMode}
                name={fields?.BPL_OR_APL_Card?.name}
                defaultLabel={fields?.BPL_OR_APL_Card?.label}
                label={values?.BPL_OR_APL_CardFileName}
                value={values?.BPL_OR_APL_Card}
                error={errors?.BPL_OR_APL_Card}
                touched={touched?.BPL_OR_APL_Card}
                onChange={(e) => {
                  setFieldValue(
                    fields?.BPL_OR_APL_Card?.name,
                    e?.target?.files[0]
                  );
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
