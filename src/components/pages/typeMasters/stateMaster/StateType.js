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
import { StyledFormContainer } from "../../../../styles";
import { Grid } from "@mui/material";
import {
  CustomTextField,
  DividerLine,
  SingleAutoComplete,
} from "../../../shared";

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
    // onSubmit(payload);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
    // enableReinitialize: true,
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

  useEffect(handleReset, [pathname]);

  return (
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
            // inputValues={stateList?.data || []}
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
            // inputValues={districtList?.data || []}
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
      </Grid>
    </StyledFormContainer>
  );
};

export default StateType;
