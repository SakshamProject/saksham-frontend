import { Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  deleteApiService,
  getApiService,
  getByIdApiService,
  postApiService,
  updateApiService,
} from "../../../../api/api";
import { API_PATHS } from "../../../../api/apiPaths";
import { ADDED_SUCCESSFULLY } from "../../../../constants/globalConstants";
import {
  DISABILITY_TYPE,
  DISTRICT,
  EDUCATIONAL_QUALIFICATION,
  fields,
  generalColumns,
  generalTypeApiPath,
  getGeneralPayload,
  initialValues,
} from "../../../../constants/typeMasters/generalTypes";
import useNotify from "../../../../hooks/useNotify";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import { getValidValues } from "../../../../utils/common";
import { validationSchema } from "../../../../validations/typeMaster/generaltypes";
import {
  CustomRadioButton,
  CustomReactTable,
  CustomTextField,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
  WithCondition,
} from "../../../shared";
import { ChipTextField } from "../../../shared/formFields/ChipTextField";

const Form = () => {
  const { notifySuccess } = useNotify();
  const { state, pathname, search } = useLocation();
  const isViewMode = state?.viewDetails;
  const navigate = useNavigate();
  const [tableId, setTableId] = useState("");

  const { mutate: handleOnSubmit } = useMutation({
    mutationKey: ["create and update"],
    mutationFn: (value) => {
      const payload = getGeneralPayload(getValidValues(value));
      const apiPath = generalTypeApiPath(value);
      return !!tableId
        ? updateApiService(apiPath, payload)
        : postApiService(apiPath, payload);
    },
    onSuccess: () => {
      notifySuccess(ADDED_SUCCESSFULLY(values?.typeMaster));
      handleReset();
      refetch();
    },
  });

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: handleOnSubmit,
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setValues,
    handleBlur,
    setFieldValue,
    resetForm,
  } = formik;

  const { data: allGeneralTypes } = useQuery({
    queryKey: ["get all general types"],
    queryFn: () => getApiService(API_PATHS.GENERAL_MASTER_SEED),
    select: ({ data }) => data?.data,
  });

  const {
    data: generalTypeList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get all general types", values?.typeMaster],
    queryFn: () => {
      const apiPath = generalTypeApiPath(values);
      return (
        !!apiPath && apiPath !== API_PATHS.DISTRICTS && getApiService(apiPath)
      );
    },
    select: ({ data }) => data,
  });

  const { data: allStates } = useQuery({
    queryKey: ["get all states", values?.typeMaster],
    queryFn: () =>
      generalTypeApiPath(values) === API_PATHS.DISTRICTS &&
      getApiService(API_PATHS.STATES),
    select: ({ data }) => data?.data,
  });

  const { mutate: handleDeleteList } = useMutation({
    mutationKey: ["deleteQualification"],
    mutationFn: (id) => deleteApiService(API_PATHS.QUALIFICATION, id),
    onSuccess: ({ data }) => {
      notifySuccess(data?.message);
      // getQualifications();
    },
  });

  const { mutate: handleEditList } = useMutation({
    mutationKey: ["editQualification"],
    mutationFn: (id) => getByIdApiService(API_PATHS.QUALIFICATION, id),
    onSuccess: ({ data }, id) => {
      // setValues({
      //   ...data,
      //   certificate: data?.certificateUrl || "",
      //   qualification: data?.qualification || "",
      //   collegeOrSchool: data?.collegeOrSchool || "",
      //   yearOfPassing: data?.yearOfPassing?.toString() || "",
      //   percentageSecured: data?.percentageSecured || "",
      //   qualificationTypeId: data?.qualificationType?.code,
      // });
      // setQualificationId(id);
    },
  });

  const handleReset = () => {
    const typeMaster = values?.typeMaster;
    resetForm();
    setFieldValue("typeMaster", typeMaster);
  };

  return (
    <FormWrapper
      navigateTo={ROUTE_PATHS.GENERAL_TYPES_LIST}
      title="Type Master"
    >
      <Grid item xs={12}>
        <CustomRadioButton
          name={fields?.typeMaster?.name}
          label={fields?.typeMaster?.label}
          labelStyle={fields?.typeMaster?.labelStyle}
          accessor={fields?.typeMaster?.accessor}
          inputValues={allGeneralTypes || []}
          value={values?.typeMaster}
          errors={errors?.typeMaster}
          touched={touched?.typeMaster}
          onBlur={handleBlur}
          onChange={handleChange}
          rowBreak
        />
      </Grid>

      <WithCondition isValid={values?.typeMaster === DISTRICT}>
        <Grid item xs={6}>
          <SingleAutoComplete
            label={fields?.stateId?.label}
            name={fields?.stateId?.name}
            value={values?.stateId}
            errors={errors?.stateId}
            touched={touched?.stateId}
            onChange={setFieldValue}
            inputValues={allStates || []}
          />
        </Grid>
      </WithCondition>

      <Grid item xs={12}>
        <CustomTextField
          label={fields?.name?.label}
          name={fields?.name?.name}
          value={values?.name}
          errors={errors?.name}
          touched={touched?.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>

      <WithCondition
        isValid={[EDUCATIONAL_QUALIFICATION, DISABILITY_TYPE].includes(
          values?.typeMaster
        )}
      >
        <Grid item xs={12}>
          <ChipTextField
            name={fields?.chipSetField?.name}
            placeholder={fields?.chipSetField?.placeHolder}
            chipVariant={fields?.chipSetField?.chipVariant}
            value={values?.chip}
            errors={errors?.chip}
            touched={touched?.chip}
            onBlur={handleBlur}
            customOnChange={({ value }) => {
              setFieldValue(fields?.name?.name, value);
            }}
          />
        </Grid>
      </WithCondition>

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={handleReset}
        resetLabel="Clear"
        submitLabel="Add"
      />

      <Grid item xs={12}>
        <CustomReactTable
          columnData={generalColumns({}) || []}
          rawData={
            generalTypeList?.data?.educationQualificationType ||
            generalTypeList?.data ||
            []
          }
          isLoading={isLoading}
          disablePagination
          disableSort
          disableColumnHiding
          disableLayout
        />
      </Grid>
    </FormWrapper>
  );
};

export default Form;
