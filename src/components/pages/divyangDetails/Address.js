import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  CustomCheckBox,
  CustomRadioButton,
  CustomTextField,
  DivyangDetail,
  FormActions,
  SingleAutoComplete,
  WithCondition,
} from "../../shared";
import { CustomTypography, StyledFormContainer, theme } from "../../../styles";
import {
  fields,
  initialValues,
  dependedValues,
  dependentValuesCommunication,
} from "../../../constants/divyangDetails/address";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { getValidValues } from "../../../utils/common";
import { getApiService, getByIdApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { locationSeed } from "../../../constants/seeds";
import { CODES } from "../../../constants/globalConstants";
import { validationSchema } from "../../../validations/divyangDetails/address";

const Address = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [params] = useSearchParams();
  const isViewMode = state?.viewDetails;
  const editId = params.get("editId");

  const handleOnReset = () => navigate(ROUTE_PATHS?.DIVYANG_DETAILS_LIST);
  const handleSkip = () => navigate(ROUTE_PATHS?.DIVYANG_DETAILS_FORM_IDPROOF);

  const handleOnSubmit = (values) => {
    const payload = getValidValues(values);
    console.log(payload);
    // onSubmit(payload);
    // navigate(ROUTE_PATHS?.DIVYANG_DETAILS_FORM_DISABILITY);
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
    setTouched,
  } = formik;

  const { data: stateList } = useQuery({
    queryKey: ["getAllStates"],
    queryFn: () => getApiService(API_PATHS?.STATES),
    select: ({ data }) => data?.data,
  });

  const { data: districtList } = useQuery({
    queryKey: ["getAllDistrictByState", values?.stateId],
    queryFn: () => getByIdApiService(API_PATHS?.STATES, values?.stateId),
    select: ({ data }) => data?.data,
    enabled: !!values?.stateId,
  });

  const { data: districtListCommunication } = useQuery({
    queryKey: ["getAllDistrictByStateCom", values?.stateIdCommunication],
    queryFn: () =>
      getByIdApiService(API_PATHS?.STATES, values?.stateIdCommunication),
    select: ({ data }) => data?.data,
    enabled: !!values?.stateIdCommunication,
  });

  const { data: district } = useQuery({
    queryKey: ["getAllDistrictByState", values?.districtId],
    queryFn: () => getByIdApiService(API_PATHS?.DISTRICTS, values?.districtId),
    select: ({ data }) => data?.data,
    enabled: !!values?.districtId,
  });

  const { data: districtCommunication } = useQuery({
    queryKey: ["getAllDistrictByState", values?.districtIdCommunication],
    queryFn: () =>
      getByIdApiService(API_PATHS?.DISTRICTS, values?.districtIdCommunication),
    select: ({ data }) => data?.data,
    enabled: !!values?.districtIdCommunication,
  });

  const removePermanentTouched = () => {
    setTouched({
      ...touched,
      villageName: false,
      panchayatUnionId: false,
      talukId: false,
      townPanchayatId: false,
      municipalityId: false,
      corporationId: false,
      MLAConstituencyId: false,
      MPConstituancyId: false,
      pincode: false,
    });
  };

  const removeCommunicationTouched = (only) => {
    setTouched({
      ...touched,
      doorNumberCommunication: only ? touched?.doorNumberCommunication : false,
      streetNameCommunication: only ? touched?.streetNameCommunication : false,
      stateIdCommunication: only ? touched?.stateIdCommunication : false,
      districtIdCommunication: only ? touched?.districtIdCommunication : false,
      villageNameCommunication: false,
      panchayatUnionIdCommunication: false,
      talukIdCommunication: false,
      townPanchayatIdCommunication: false,
      municipalityIdCommunication: false,
      corporationIdCommunication: false,
      MLAConstituencyIdCommunication: false,
      MPConstituancyIdCommunication: false,
      pincodeCommunication: false,
    });
  };

  return (
    <Grid container direction={"column"} width={"100%"} rowSpacing={2}>
      <Grid item xs={12}>
        <DivyangDetail />
      </Grid>
      <Grid item xs={12}>
        <StyledFormContainer width="100%">
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item xs={12}>
              <CustomTypography
                capitalize
                variant="h6"
                style={{ fontSize: "24px" }}
              >
                Permanent address
              </CustomTypography>
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.doorNumber?.label}
                name={fields?.doorNumber?.name}
                value={values?.doorNumber}
                onChange={(e) => {
                  setFieldValue(fields?.doorNumber?.name, e?.target?.value);
                  if (values?.isSameAddress)
                    setFieldValue(
                      fields?.doorNumberCommunication?.name,
                      e?.target.value
                    );
                }}
                onBlur={handleBlur}
                errors={errors?.doorNumber}
                touched={touched?.doorNumber}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.flatNumber?.label}
                name={fields?.flatNumber?.name}
                value={values?.flatNumber}
                onChange={(e) => {
                  setFieldValue(fields?.flatNumber?.name, e?.target.value);
                  if (values?.isSameAddress)
                    setFieldValue(
                      fields?.flatNumberCommunication?.name,
                      e?.target.value
                    );
                }}
                onBlur={handleBlur}
                errors={errors?.flatNumber}
                touched={touched?.flatNumber}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label={fields?.streetName?.label}
                name={fields?.streetName?.name}
                value={values?.streetName}
                onChange={(e) => {
                  setFieldValue(fields?.streetName?.name, e?.target.value);
                  if (values?.isSameAddress)
                    setFieldValue(
                      fields?.streetNameCommunication?.name,
                      e?.target.value
                    );
                }}
                onBlur={handleBlur}
                errors={errors?.streetName}
                touched={touched?.streetName}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label={fields?.nagarName?.label}
                name={fields?.nagarName?.name}
                value={values?.nagarName}
                onChange={(e) => {
                  setFieldValue(fields?.nagarName?.name, e?.target.value);
                  if (values?.isSameAddress)
                    setFieldValue(
                      fields?.nagarNameCommunication?.name,
                      e?.target.value
                    );
                }}
                onBlur={handleBlur}
                errors={errors?.nagarName}
                touched={touched?.nagarName}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SingleAutoComplete
                label={fields?.stateId?.label}
                name={fields?.stateId?.name}
                value={values?.stateId}
                onChange={(_, value) => {
                  setValues({
                    ...values,
                    stateId: value,
                    districtId: "",
                    ...dependedValues,
                    ...(values?.isSameAddress
                      ? {
                          ...dependentValuesCommunication,
                          stateIdCommunication: value,
                        }
                      : {}),
                  });
                  setFieldTouched(fields?.districtId?.name, false);
                  removePermanentTouched();
                  if (values?.isSameAddress) removeCommunicationTouched();
                }}
                onBlur={handleBlur}
                isViewMode={isViewMode}
                errors={errors?.stateId}
                touched={touched?.stateId}
                inputValues={stateList || []}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SingleAutoComplete
                label={fields?.districtId?.label}
                name={fields?.districtId?.name}
                value={values?.districtId}
                onChange={(_, value) => {
                  setValues({
                    ...values,
                    districtId: value,
                    ...dependedValues,
                    ...(values?.isSameAddress
                      ? {
                          ...dependentValuesCommunication,
                          districtIdCommunication: value,
                        }
                      : {}),
                  });
                  removePermanentTouched();
                  if (values?.isSameAddress) removeCommunicationTouched();
                }}
                onBlur={handleBlur}
                errors={errors?.districtId}
                touched={touched?.districtId}
                isViewMode={isViewMode}
                inputValues={districtList?.districts || []}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomRadioButton
                name={fields?.isRural?.name}
                label={fields?.isRural?.label}
                onChange={(_, value) => {
                  setValues({
                    ...values,
                    isRural: value,
                    ...dependedValues,
                    ...(values?.isSameAddress
                      ? {
                          ...dependentValuesCommunication,
                          isRuralCommunication: value,
                        }
                      : {}),
                  });
                  removePermanentTouched();
                  if (values?.isSameAddress) removeCommunicationTouched();
                }}
                onBlur={handleBlur}
                value={values?.isRural || ""}
                touched={touched?.isRural}
                errors={errors?.isRural}
                isViewMode={isViewMode}
                inputValues={locationSeed}
                rowBreak
                labelStyle={{
                  color: theme?.palette?.commonColor?.blue,
                  fontSize: "16px",
                }}
              />
            </Grid>

            <WithCondition isValid={values?.isRural === CODES?.RURAL}>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label={fields?.villageName?.label}
                  name={fields?.villageName?.name}
                  value={values?.villageName}
                  onChange={(e) => {
                    setFieldValue(fields?.villageName?.name, e?.target.value);
                    if (values?.isSameAddress)
                      setFieldValue(
                        fields?.villageNameCommunication?.name,
                        e?.target.value
                      );
                  }}
                  onBlur={handleBlur}
                  errors={errors?.villageName}
                  touched={touched?.villageName}
                  isViewMode={isViewMode}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SingleAutoComplete
                  label={fields?.panchayatUnionId?.label}
                  name={fields?.panchayatUnionId?.name}
                  value={values?.panchayatUnionId}
                  onChange={(_, value) => {
                    setFieldValue(fields?.panchayatUnionId?.name, value);
                    if (values?.isSameAddress)
                      setFieldValue(
                        fields?.panchayatUnionIdCommunication?.name,
                        value
                      );
                  }}
                  onBlur={handleBlur}
                  isViewMode={isViewMode}
                  errors={errors?.panchayatUnionId}
                  touched={touched?.panchayatUnionId}
                  inputValues={district?.PanchayatUnions || []}
                />
              </Grid>
            </WithCondition>

            <Grid item xs={12} md={6}>
              <SingleAutoComplete
                label={fields?.talukId?.label}
                name={fields?.talukId?.name}
                value={values?.talukId}
                onChange={(_, value) => {
                  setFieldValue(fields?.talukId?.name, value);
                  if (values?.isSameAddress)
                    setFieldValue(fields?.talukIdCommunication?.name, value);
                }}
                onBlur={handleBlur}
                isViewMode={isViewMode}
                errors={errors?.talukId}
                touched={touched?.talukId}
                inputValues={district?.Taluks || []}
              />
            </Grid>

            <WithCondition isValid={values?.isRural === CODES?.URBAN}>
              <Grid item xs={12} md={6}>
                <SingleAutoComplete
                  label={fields?.townPanchayatId?.label}
                  name={fields?.townPanchayatId?.name}
                  value={values?.townPanchayatId}
                  onChange={(_, value) => {
                    setFieldValue(fields?.townPanchayatId?.name, value);
                    if (values?.isSameAddress)
                      setFieldValue(
                        fields?.townPanchayatIdCommunication?.name,
                        value
                      );
                  }}
                  onBlur={handleBlur}
                  isViewMode={isViewMode}
                  errors={errors?.townPanchayatId}
                  touched={touched?.townPanchayatId}
                  inputValues={district?.TownPanchayats || []}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SingleAutoComplete
                  label={fields?.municipalityId?.label}
                  name={fields?.municipalityId?.name}
                  value={values?.municipalityId}
                  onChange={(_, value) => {
                    setFieldValue(fields?.municipalityId?.name, value);
                    if (values?.isSameAddress)
                      setFieldValue(
                        fields?.municipalityIdCommunication?.name,
                        value
                      );
                  }}
                  onBlur={handleBlur}
                  isViewMode={isViewMode}
                  errors={errors?.municipalityId}
                  touched={touched?.municipalityId}
                  inputValues={district?.Municipalities || []}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SingleAutoComplete
                  label={fields?.corporationId?.label}
                  name={fields?.corporationId?.name}
                  value={values?.corporationId}
                  onChange={(_, value) => {
                    setFieldValue(fields?.corporationId?.name, value);
                    if (values?.isSameAddress)
                      setFieldValue(
                        fields?.corporationIdCommunication?.name,
                        value
                      );
                  }}
                  onBlur={handleBlur}
                  errors={errors?.corporationId}
                  isViewMode={isViewMode}
                  touched={touched?.corporationId}
                  inputValues={district?.Corporations || []}
                />
              </Grid>
            </WithCondition>

            <Grid item xs={12} md={6}>
              <SingleAutoComplete
                label={fields?.MLAConstituencyId?.label}
                name={fields?.MLAConstituencyId?.name}
                value={values?.MLAConstituencyId}
                onChange={(_, value) => {
                  setFieldValue(fields?.MLAConstituencyId?.name, value);
                  if (values?.isSameAddress)
                    setFieldValue(
                      fields?.MLAConstituencyIdCommunication?.name,
                      value
                    );
                }}
                isViewMode={isViewMode}
                onBlur={handleBlur}
                errors={errors?.MLAConstituencyId}
                touched={touched?.MLAConstituencyId}
                inputValues={district?.MLAConstituencies || []}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SingleAutoComplete
                label={fields?.MPConstituancyId?.label}
                name={fields?.MPConstituancyId?.name}
                value={values?.MPConstituancyId}
                onChange={(_, value) => {
                  setFieldValue(fields?.MPConstituancyId?.name, value);
                  if (values?.isSameAddress)
                    setFieldValue(
                      fields?.MPConstituancyIdCommunication?.name,
                      value
                    );
                }}
                isViewMode={isViewMode}
                onBlur={handleBlur}
                errors={errors?.MPConstituancyId}
                touched={touched?.MPConstituancyId}
                inputValues={district?.MPConstituencies || []}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.pincode?.label}
                name={fields?.pincode?.name}
                value={values?.pincode}
                onChange={(e) => {
                  setFieldValue(fields?.pincode?.name, e?.target.value);
                  if (values?.isSameAddress)
                    setFieldValue(
                      fields?.pincodeCommunication?.name,
                      e?.target.value
                    );
                }}
                onBlur={handleBlur}
                errors={errors?.pincode}
                touched={touched?.pincode}
                isViewMode={isViewMode}
                fieldType={fields?.pincode?.type}
                maxLength={6}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomCheckBox
                name={fields?.isSameAddress?.name}
                label={fields?.isSameAddress?.label}
                style={{ marginBlock: "16px" }}
                onChange={(e, value) => {
                  setValues({
                    ...values,
                    isSameAddress: value,
                    doorNumberCommunication: value ? values?.doorNumber : "",
                    flatNumberCommunication: value ? values?.flatNumber : "",
                    streetNameCommunication: value ? values?.streetName : "",
                    nagarNameCommunication: value ? values?.nagarName : "",
                    stateIdCommunication: value ? values?.stateId : "",
                    districtIdCommunication: value ? values?.districtId : "",
                    isRuralCommunication: value
                      ? values?.isRural
                      : CODES?.RURAL,
                    villageNameCommunication: value ? values?.villageName : "",
                    panchayatUnionIdCommunication: value
                      ? values?.panchayatUnionId
                      : "",
                    talukIdCommunication: value ? values?.talukId : "",
                    townPanchayatIdCommunication: value
                      ? values?.townPanchayatId
                      : "",
                    municipalityIdCommunication: value
                      ? values?.municipalityId
                      : "",
                    corporationIdCommunication: value
                      ? values?.corporationId
                      : "",
                    MLAConstituencyIdCommunication: value
                      ? values?.MLAConstituencyId
                      : "",
                    MPConstituancyIdCommunication: value
                      ? values?.MPConstituancyId
                      : "",
                    pincodeCommunication: value ? values?.pincode : "",
                  });
                  removeCommunicationTouched();
                }}
                checked={values?.isSameAddress}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTypography
                capitalize
                variant="h6"
                style={{ fontSize: "24px" }}
              >
                Communication address
              </CustomTypography>
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.doorNumberCommunication?.label}
                name={fields?.doorNumberCommunication?.name}
                value={values?.doorNumberCommunication}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.doorNumberCommunication}
                touched={touched?.doorNumberCommunication}
                isViewMode={isViewMode || values?.isSameAddress}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.flatNumberCommunication?.label}
                name={fields?.flatNumberCommunication?.name}
                value={values?.flatNumberCommunication}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.flatNumberCommunication}
                touched={touched?.flatNumberCommunication}
                isViewMode={isViewMode || values?.isSameAddress}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label={fields?.streetNameCommunication?.label}
                name={fields?.streetNameCommunication?.name}
                value={values?.streetNameCommunication}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.streetNameCommunication}
                touched={touched?.streetNameCommunication}
                isViewMode={isViewMode || values?.isSameAddress}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label={fields?.nagarNameCommunication?.label}
                name={fields?.nagarNameCommunication?.name}
                value={values?.nagarNameCommunication}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.nagarNameCommunication}
                touched={touched?.nagarNameCommunication}
                isViewMode={isViewMode || values?.isSameAddress}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SingleAutoComplete
                label={fields?.stateIdCommunication?.label}
                name={fields?.stateIdCommunication?.name}
                value={values?.stateIdCommunication}
                onChange={(_, value) => {
                  setValues({
                    ...values,
                    stateIdCommunication: value,
                    districtIdCommunication: "",
                    ...dependentValuesCommunication,
                  });
                  setFieldTouched(fields?.districtIdCommunication?.name, false);
                  removeCommunicationTouched();
                }}
                onBlur={handleBlur}
                isViewMode={isViewMode || values?.isSameAddress}
                errors={errors?.stateIdCommunication}
                touched={touched?.stateIdCommunication}
                inputValues={stateList || []}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SingleAutoComplete
                label={fields?.districtIdCommunication?.label}
                name={fields?.districtIdCommunication?.name}
                value={values?.districtIdCommunication}
                onChange={(_, value) => {
                  setValues({
                    ...values,
                    districtIdCommunication: value,
                    ...dependentValuesCommunication,
                  });
                  removeCommunicationTouched();
                }}
                onBlur={handleBlur}
                errors={errors?.districtIdCommunication}
                isViewMode={isViewMode || values?.isSameAddress}
                touched={touched?.districtIdCommunication}
                inputValues={districtListCommunication?.districts || []}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomRadioButton
                name={fields?.isRuralCommunication?.name}
                label={fields?.isRuralCommunication?.label}
                onChange={(e, value) => {
                  setValues({
                    ...values,
                    isRuralCommunication: value,
                    ...dependentValuesCommunication,
                  });
                  removeCommunicationTouched(true);
                }}
                onBlur={handleBlur}
                value={values?.isRuralCommunication || ""}
                touched={touched?.isRuralCommunication}
                errors={errors?.isRuralCommunication}
                isViewMode={isViewMode || values?.isSameAddress}
                inputValues={locationSeed}
                rowBreak
                labelStyle={{
                  color: theme?.palette?.commonColor?.blue,
                  fontSize: "16px",
                }}
              />
            </Grid>

            <WithCondition
              isValid={values?.isRuralCommunication === CODES?.RURAL}
            >
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label={fields?.villageNameCommunication?.label}
                  name={fields?.villageNameCommunication?.name}
                  value={values?.villageNameCommunication}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors?.villageNameCommunication}
                  touched={touched?.villageNameCommunication}
                  isViewMode={isViewMode || values?.isSameAddress}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SingleAutoComplete
                  label={fields?.panchayatUnionIdCommunication?.label}
                  name={fields?.panchayatUnionIdCommunication?.name}
                  value={values?.panchayatUnionIdCommunication}
                  onChange={(_, value) => {
                    setFieldValue(
                      fields?.panchayatUnionIdCommunication?.name,
                      value
                    );
                  }}
                  onBlur={handleBlur}
                  errors={errors?.panchayatUnionIdCommunication}
                  touched={touched?.panchayatUnionIdCommunication}
                  inputValues={districtCommunication?.PanchayatUnions || []}
                  isViewMode={isViewMode || values?.isSameAddress}
                />
              </Grid>
            </WithCondition>

            <Grid item xs={12} md={6}>
              <SingleAutoComplete
                label={fields?.talukIdCommunication?.label}
                name={fields?.talukIdCommunication?.name}
                value={values?.talukIdCommunication}
                onChange={(_, value) => {
                  setFieldValue(fields?.talukIdCommunication?.name, value);
                }}
                onBlur={handleBlur}
                isViewMode={isViewMode || values?.isSameAddress}
                errors={errors?.talukIdCommunication}
                touched={touched?.talukIdCommunication}
                inputValues={districtCommunication?.Taluks || []}
              />
            </Grid>

            <WithCondition
              isValid={values?.isRuralCommunication === CODES?.URBAN}
            >
              <Grid item xs={12} md={6}>
                <SingleAutoComplete
                  label={fields?.townPanchayatIdCommunication?.label}
                  name={fields?.townPanchayatIdCommunication?.name}
                  value={values?.townPanchayatIdCommunication}
                  onChange={(_, value) => {
                    setFieldValue(
                      fields?.townPanchayatIdCommunication?.name,
                      value
                    );
                  }}
                  isViewMode={isViewMode || values?.isSameAddress}
                  onBlur={handleBlur}
                  errors={errors?.townPanchayatIdCommunication}
                  touched={touched?.townPanchayatIdCommunication}
                  inputValues={districtCommunication?.TownPanchayats || []}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SingleAutoComplete
                  label={fields?.municipalityIdCommunication?.label}
                  name={fields?.municipalityIdCommunication?.name}
                  value={values?.municipalityIdCommunication}
                  onChange={(_, value) => {
                    setFieldValue(
                      fields?.municipalityIdCommunication?.name,
                      value
                    );
                  }}
                  isViewMode={isViewMode || values?.isSameAddress}
                  onBlur={handleBlur}
                  errors={errors?.municipalityIdCommunication}
                  touched={touched?.municipalityIdCommunication}
                  inputValues={districtCommunication?.Municipalities || []}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SingleAutoComplete
                  label={fields?.corporationIdCommunication?.label}
                  name={fields?.corporationIdCommunication?.name}
                  value={values?.corporationIdCommunication}
                  onChange={(_, value) => {
                    setFieldValue(
                      fields?.corporationIdCommunication?.name,
                      value
                    );
                  }}
                  onBlur={handleBlur}
                  errors={errors?.corporationIdCommunication}
                  isViewMode={isViewMode || values?.isSameAddress}
                  touched={touched?.corporationIdCommunication}
                  inputValues={districtCommunication?.Corporations || []}
                />
              </Grid>
            </WithCondition>

            <Grid item xs={12} md={6}>
              <SingleAutoComplete
                label={fields?.MLAConstituencyIdCommunication?.label}
                name={fields?.MLAConstituencyIdCommunication?.name}
                value={values?.MLAConstituencyIdCommunication}
                onChange={(_, value) => {
                  setFieldValue(
                    fields?.MLAConstituencyIdCommunication?.name,
                    value
                  );
                }}
                onBlur={handleBlur}
                errors={errors?.MLAConstituencyIdCommunication}
                touched={touched?.MLAConstituencyIdCommunication}
                isViewMode={isViewMode || values?.isSameAddress}
                inputValues={districtCommunication?.MLAConstituencies || []}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SingleAutoComplete
                label={fields?.MPConstituancyIdCommunication?.label}
                name={fields?.MPConstituancyIdCommunication?.name}
                value={values?.MPConstituancyIdCommunication}
                onChange={(_, value) => {
                  setFieldValue(
                    fields?.MPConstituancyIdCommunication?.name,
                    value
                  );
                }}
                onBlur={handleBlur}
                isViewMode={isViewMode || values?.isSameAddress}
                errors={errors?.MPConstituancyIdCommunication}
                touched={touched?.MPConstituancyIdCommunication}
                inputValues={districtCommunication?.MPConstituencies || []}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.pincodeCommunication?.label}
                name={fields?.pincodeCommunication?.name}
                value={values?.pincodeCommunication}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.pincodeCommunication}
                touched={touched?.pincodeCommunication}
                isViewMode={isViewMode || values?.isSameAddress}
                fieldType={fields?.pincodeCommunication?.type}
                maxLength={6}
              />
            </Grid>

            <FormActions
              handleSubmit={handleSubmit}
              handleOnReset={handleOnReset}
              isUpdate={!!editId}
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

export default Address;
