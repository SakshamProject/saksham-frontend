import { Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  deleteApiService,
  getApiService,
  getByIdApiService,
  postApiService,
  updateApiService,
} from "../../../../api/api";
import { API_PATHS } from "../../../../api/apiPaths";
import {
  ADDED_SUCCESSFULLY,
  DELETED_SUCCESSFULLY,
  UPDATED_SUCCESSFULLY,
} from "../../../../constants/globalConstants";
import {
  DISABILITY_TYPE,
  DISTRICT,
  EDUCATIONAL_QUALIFICATION,
  fields,
  generalColumns,
  generalTypeApiPath,
  getGeneralTypePayload,
  initialValues,
} from "../../../../constants/typeMasters/generalTypes";
import useNotify from "../../../../hooks/useNotify";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
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
  const { notifySuccess, notifyError } = useNotify();
  const { state } = useLocation();
  const isViewMode = state?.viewDetails;
  const generalType = state?.field;
  const [tableEditId, setTableEditId] = useState("");

  // create and update api service
  const { mutate } = useMutation({
    mutationKey: ["create and update"],
    mutationFn: ({ apiPath, payload }) => {
      return !!tableEditId
        ? updateApiService(apiPath, tableEditId, payload)
        : postApiService(apiPath, payload);
    },
    onSuccess: () => {
      notifySuccess(
        !!tableEditId
          ? UPDATED_SUCCESSFULLY(values?.typeMaster)
          : ADDED_SUCCESSFULLY(values?.typeMaster)
      );
      handleReset();
      refetch();
      setTableEditId("");
      values?.typeMaster === DISTRICT && fetchDistrict();
    },
  });

  const handleOnSubmit = (value) => {
    if (
      value?.chips?.length < 1 &&
      [EDUCATIONAL_QUALIFICATION, DISABILITY_TYPE].includes(values?.typeMaster)
    ) {
      notifyError("Sub type name minimum one is required");
      return;
    }

    const payload = getGeneralTypePayload(value);
    const apiPath = generalTypeApiPath(value);
    mutate({ payload, apiPath });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
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

  // general type seed api service
  const { data: allGeneralTypes } = useQuery({
    queryKey: ["get all general types"],
    queryFn: () => getApiService(API_PATHS.GENERAL_MASTER_SEED),
    select: ({ data }) => data?.data,
  });

  // table data api service
  const { data: generalTypeList, refetch } = useQuery({
    queryKey: ["get general types list", values?.typeMaster],
    queryFn: () => {
      const apiPath = generalTypeApiPath(values);
      return apiPath !== API_PATHS.DISTRICTS && getApiService(apiPath);
    },
    select: ({ data }) => data,
  });

  // get all districts
  const { data: allDistricts, refetch: fetchDistrict } = useQuery({
    queryKey: ["get all districts", values?.stateId],
    queryFn: () =>
      values?.stateId && getByIdApiService(API_PATHS.STATES, values?.stateId),
    select: ({ data }) => data?.data?.districts,
  });

  // get all states
  const { data: allStates } = useQuery({
    queryKey: ["get all states", values?.typeMaster],
    queryFn: () =>
      generalTypeApiPath(values) === API_PATHS.DISTRICTS &&
      getApiService(API_PATHS.STATES),
    select: ({ data }) => data?.data,
  });

  const { mutate: handleDelete } = useMutation({
    mutationKey: ["delete general type"],
    mutationFn: (id) => {
      const apiPath = generalTypeApiPath(values);
      return deleteApiService(apiPath, id);
    },
    onSuccess: () => {
      notifySuccess(DELETED_SUCCESSFULLY(values?.typeMaster));
      handleReset();
      refetch();
      values?.typeMaster === DISTRICT && fetchDistrict();
    },
  });

  const { mutate: handleEdit } = useMutation({
    mutationKey: ["edit general type"],
    mutationFn: (id) => {
      const apiPath = generalTypeApiPath(values);
      return getByIdApiService(apiPath, id);
    },
    onSuccess: ({ data }, id) => {
      setValues(
        getGeneralTypePayload(
          { ...data?.data, typeMaster: values?.typeMaster },
          false
        )
      );
      setTableEditId(id);
    },
  });

  const handleReset = useCallback(() => {
    const typeMaster = values?.typeMaster;
    const stateId = values?.stateId;
    resetForm();
    setTableEditId("");
    setFieldValue("typeMaster", typeMaster);
    typeMaster === DISTRICT && setFieldValue("stateId", stateId);
  }, [resetForm, setFieldValue, values?.stateId, values?.typeMaster]);

  useEffect(() => {
    if (!!generalType) setFieldValue("typeMaster", generalType);
  }, [generalType, setFieldValue]);

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
          onChange={(e) => {
            resetForm();
            setFieldValue("typeMaster", e.target.value);
          }}
          isViewMode={isViewMode || !!tableEditId || !!generalType}
          rowBreak
        />
      </Grid>

      <WithCondition isValid={!isViewMode}>
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
              isViewMode={isViewMode}
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
            isViewMode={isViewMode}
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
              label={fields?.chipSetField?.label}
              placeholder={fields?.chipSetField?.placeHolder}
              chipVariant={fields?.chipSetField?.chipVariant}
              value={values?.chip}
              chipValue={values?.chips}
              errors={errors?.chip || errors?.chips}
              touched={touched?.chip || touched?.chips}
              onBlur={handleBlur}
              customOnChange={({ value }) => setFieldValue("chip", value)}
              handleKeyPress={(chips) => setFieldValue("chips", chips)}
              isViewMode={isViewMode}
              chipAccessor={!!tableEditId ? "name" : ""}
            />
          </Grid>
        </WithCondition>
      </WithCondition>

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={handleReset}
        resetLabel="Clear"
        submitLabel={!!tableEditId ? "Update" : "Add"}
        isViewMode={isViewMode}
      />

      <Grid item xs={12}>
        <CustomReactTable
          columnData={
            generalColumns({
              handleDelete,
              tableEditId,
              handleEdit,
              isViewMode,
            }) || []
          }
          rawData={
            generalTypeList?.data?.educationQualificationType ||
            allDistricts ||
            generalTypeList?.data ||
            []
          }
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
