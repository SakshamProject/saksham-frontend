import { Grid, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

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
import useTableCustomHooks from "../../../../hooks/useTableCustomHooks";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import { validationSchema } from "../../../../validations/typeMaster/generalTypes";
import {
  CustomRadioButton,
  CustomReactTable,
  CustomTextField,
  FormActions,
  FormWrapper,
  ListTopbar,
  SingleAutoComplete,
  WithCondition,
} from "../../../shared";
import { ChipTextField } from "../../../shared/formFields/ChipTextField";
import CustomModal from "../../../shared/CustomModal";
import { findNameById } from "../../../../utils/common";
import styled from "@emotion/styled";
import { theme } from "../../../../styles";

const CustomTypography = styled(Typography)({
  color: theme?.palette?.textColor?.blue,
  textTransform: "uppercase",
  fontSize: "16px",
  fontWeight: "bold",
  marginBottom: 16,
});

const Form = () => {
  const [name] = useSearchParams();
  const editId = name.get("editId");
  const { notifySuccess, notifyError } = useNotify();
  const { state } = useLocation();
  const isViewMode = state?.viewDetails;
  const generalType = state?.field;
  const [tableEditId, setTableEditId] = useState("");
  const { tableReRenderActions } = useTableCustomHooks(
    ROUTE_PATHS.GENERAL_TYPES_FORM
  );
  const { searchData } = tableReRenderActions();
  const [open, setOpen] = useState(false);

  // create and update api call
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

  // general type seed api call
  const { data: allGeneralTypes } = useQuery({
    queryKey: ["get all general types"],
    queryFn: () => getApiService(API_PATHS.GENERAL_MASTER_SEED),
    select: ({ data }) => data?.data,
  });

  // table data api call
  const { data: generalTypeList, refetch } = useQuery({
    queryKey: ["get general types list", values?.typeMaster, searchData],
    queryFn: () => {
      const apiPath = generalTypeApiPath(values);
      return getApiService(
        `${apiPath}${!!searchData ? `?searchText=${searchData}` : ""}`
      );
    },
    select: ({ data }) => data,
  });

  // all states api call
  const { data: allStates } = useQuery({
    queryKey: ["get all states", values?.typeMaster],
    queryFn: () =>
      generalTypeApiPath(values) === API_PATHS.DISTRICTS &&
      getApiService(API_PATHS.STATES),
    select: ({ data }) => data?.data,
  });

  // delete api call
  const { mutate: onDelete } = useMutation({
    mutationKey: ["delete general type"],
    mutationFn: (id) => {
      const apiPath = generalTypeApiPath(values);
      return deleteApiService(apiPath, id);
    },
    onSuccess: () => {
      notifySuccess(DELETED_SUCCESSFULLY(values?.typeMaster));
      refetch();
      setOpen(false);
    },
  });

  const handleDelete = (id) => {
    setOpen(id);
  };

  // edit api call
  const { mutate: handleEdit } = useMutation({
    mutationKey: ["editGeneralType"],
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
    setValues({ ...initialValues, typeMaster, stateId });
  }, [resetForm, setValues, values?.stateId, values?.typeMaster]);

  useEffect(() => {
    if (!!generalType) setFieldValue("typeMaster", generalType);
  }, [generalType, setFieldValue]);

  return (
    <FormWrapper
      navigateTo={ROUTE_PATHS.GENERAL_TYPES_LIST}
      title="Type Master"
    >
      <WithCondition
        isValid={!editId}
        nullComponent={
          <Grid item xs={12}>
            <CustomTypography>{generalType}</CustomTypography>
          </Grid>
        }
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
            disabled={isViewMode || !!tableEditId || !!generalType}
            rowBreak
          />
        </Grid>
      </WithCondition>

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

      <ListTopbar
        disableNewForm
        disableFilter
        style={{ width: "100%", ".searchField": { margin: 0 } }}
      />

      <Grid item xs={12}>
        <CustomReactTable
          columnData={
            generalColumns({
              handleDelete,
              tableEditId,
              handleEdit,
              isViewMode,
              type: values?.typeMaster,
            }) || []
          }
          rawData={
            generalTypeList?.data?.educationQualificationType ||
            generalTypeList?.data ||
            []
          }
          disablePagination
          disableSort
          disableColumnHiding
          disableLayout
        />
      </Grid>

      <CustomModal
        open={open}
        setOpen={setOpen}
        content={`Are you sure you want to delete this ${values?.typeMaster} ${
          findNameById(
            open,
            generalTypeList?.data?.educationQualificationType ||
              generalTypeList?.data
          ) || ""
        }?`}
        handle={() => onDelete(open)}
      />
    </FormWrapper>
  );
};

export default Form;
