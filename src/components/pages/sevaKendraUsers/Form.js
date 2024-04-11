import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";

import useNotify from "../../../hooks/useNotify";
import {
  DividerLine,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
  WithCondition,
} from "../../shared";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import {
  fields,
  initialValues,
} from "../../../constants/sevaKendraUsers/sevaKendraUsers";
import { validationSchema } from "../../../validations/sevaKendraUsers/sevaKendraUsers";
import { getApiService, getByIdApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { getValidValues } from "../../../utils/common";
import { Grid } from "@mui/material";
import StatusFields from "../../shared/StatusFields";

const Form = () => {
  const { notifySuccess } = useNotify();
  const { state } = useLocation();
  const isViewMode = state?.viewDetails;
  const navigate = useNavigate();

  const handleOnSubmit = (values) => {
    const payload = getValidValues(values);
    // onSubmit(payload);
    console.log(JSON.stringify(payload));
    console.log(payload);
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
    handleReset,
  } = formik;

  const { data: stateList } = useQuery({
    queryKey: ["getAllStates"],
    queryFn: () => getApiService(API_PATHS.STATES),
    select: ({ data }) => data?.data,
  });

  const { data: districtList } = useQuery({
    queryKey: ["getAllDistrictByState", values?.stateId],
    queryFn: () => getByIdApiService(API_PATHS.STATES, values?.stateId),
    select: ({ data }) => data?.data,
    enabled: !!values?.stateId,
  });

  return (
    <FormWrapper
      title="Seva Kendra"
      navigateTo={ROUTE_PATHS?.SEVA_KENDRA_USERS_LIST}
      columnSpacing={3}
    >
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
          inputValues={stateList || []}
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
          inputValues={districtList?.districts || []}
        />
      </Grid>

      <Grid item xs={12}>
        <SingleAutoComplete
          label={fields?.sevaKendraId?.label}
          name={fields?.sevaKendraId?.name}
          value={values?.sevaKendraId}
          onChange={(_, value) => {
            setFieldValue(fields?.sevaKendraId?.name, value);
          }}
          onBlur={handleBlur}
          errors={errors?.sevaKendraId}
          touched={touched?.sevaKendraId}
          inputValues={districtList?.sevaKendra || []}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine gap={"6px 0 24px"} />
      </Grid>

      {/* <WithCondition isValid={editId}>
        <StatusFields
          setFieldTouched={setFieldTouched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          values={values}
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
          statusSeeds={statusSeeds}
          isViewMode={isViewMode}
          rowBreak={false}
          // statusHistory={clientDetail?.data?.status}
          disableListLayout
        />
      </WithCondition>  */}

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={() => {
          navigate(ROUTE_PATHS?.SEVA_KENDRA_USERS_LIST);
        }}
        isUpdate={false}
      />

      {/* {editId ? <AuditLog data={parameterDetails?.data} /> : <></>} */}
    </FormWrapper>
  );
};

export default Form;
