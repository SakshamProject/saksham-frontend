import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import useNotify from "../../../../hooks/useNotify";
import {
  STEPS,
  fields,
  formDetails,
  initialValues as initialValue,
} from "../../../../constants/typeMasters/stateMaster";
import { validationSchema as validation } from "../../../../validations/typeMaster/stateMaster";
import { useFormik } from "formik";
import { getValidValues } from "../../../../utils/common";
import { StyledFormContainer, theme } from "../../../../styles";
import { Box, Grid } from "@mui/material";
import {
  CommonList,
  CustomTextField,
  DividerLine,
  FormActions,
  SingleAutoComplete,
} from "../../../shared";
import { API_PATHS } from "../../../../api/apiPaths";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getApiService,
  getByIdApiService,
  postApiService,
} from "../../../../api/api";
import { ADDED_SUCCESSFULLY } from "../../../../constants/globalConstants";

const StateType = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { notifySuccess } = useNotify();
  const { pathname } = useLocation();
  const currentScreen = useMemo(() => pathname.split("/")[3], [pathname]);
  const currentForm = formDetails?.[currentScreen];
  const allSteps = STEPS.map((item) => item?.value);

  const initialValues = useMemo(
    () => initialValue(currentForm?.name),
    [currentForm]
  );

  const validationSchema = useMemo(
    () =>
      validation({
        name: currentForm?.name,
        label: currentForm?.validationLabel,
      }),
    [currentForm?.name, currentForm?.validationLabel]
  );

  const handleOnSubmit = (values) => {
    const payload = getValidValues(values);
    onSubmit(payload);
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: [currentForm?.apiPath, currentScreen],
    mutationFn: (data) => postApiService(currentForm?.apiPath, data),
    onSuccess: (data) => {
      notifySuccess(ADDED_SUCCESSFULLY(currentForm?.validationLabel));
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
    enableReinitialize: true,
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
    handleReset,
  } = formik;

  const { data: stateList } = useQuery({
    queryKey: [API_PATHS.STATES],
    queryFn: () => getApiService(API_PATHS.STATES),
  });

  const { data: districtList } = useQuery({
    queryKey: [API_PATHS.DISTRICTS, values?.stateId],
    queryFn: () =>
      values?.stateId && getByIdApiService(API_PATHS.STATES, values?.stateId),
  });

  useEffect(handleReset, [pathname]);

  return (
    <Grid direction={"column"}>
      <StyledFormContainer width="100%">
        <Grid container rowSpacing={2} columnSpacing={3}>
          <Grid item xs={6}>
            <SingleAutoComplete
              label={fields?.stateId?.label}
              name={fields?.stateId?.name}
              value={values?.stateId}
              onChange={(_, value) => {
                setFieldValue(fields?.stateId?.name, value);
              }}
              onBlur={handleBlur}
              errors={errors?.stateId}
              touched={touched?.stateId}
              inputValues={stateList?.data?.data || []}
              accessor={fields?.stateId?.accessor}
            />
          </Grid>

          <Grid item xs={6}>
            <SingleAutoComplete
              label={fields?.districtId?.label}
              name={fields?.districtId?.name}
              value={values?.districtId}
              onChange={(_, value) => {
                setFieldValue(fields?.districtId?.name, value);
              }}
              onBlur={handleBlur}
              errors={errors?.districtId}
              touched={touched?.districtId}
              inputValues={districtList?.data?.data?.districts || []}
              accessor={fields?.districtId?.accessor}
            />
          </Grid>
          <Grid item xs={12}>
            <DividerLine />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label={currentForm?.label}
              name={currentForm?.name}
              fieldType={"alphabets"}
              value={values?.[currentForm?.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.[currentForm?.name]}
              touched={touched?.[currentForm?.name]}
            />
          </Grid>
          <FormActions
            handleSubmit={handleSubmit}
            handleOnReset={handleReset}
            // isUpdate={state?.editMode}
            // disableSubmit={isViewMode}
            submitLabel="Add"
            disableCancel
            submitButtonStyle={{
              backgroundColor: theme?.palette?.success?.main,
            }}
          />
        </Grid>
      </StyledFormContainer>

      <Box width={1}>
        <CommonList
          disableFilter
          disableLayout
          // columns={columns}
        />
      </Box>
    </Grid>
  );
};

export default StateType;
