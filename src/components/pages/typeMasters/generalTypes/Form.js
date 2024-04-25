import { Grid } from "@mui/material";
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
import { CODES, DELETE_MSG } from "../../../../constants/globalConstants";
import {
  GENERALTYPE_INCLUDE,
  GENERAL_TYPES,
  fields,
  generalColumns,
  generalTypeApiPath,
  getGeneralTypePayload,
  initialValues,
} from "../../../../constants/typeMasters/generalTypes";
import useTableCustomHooks from "../../../../hooks/useTableCustomHooks";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import { CustomTypography } from "../../../../styles";
import { findNameById } from "../../../../utils/common";
import {
  dispatchNotifyAction,
  dispatchNotifyError,
} from "../../../../utils/dispatch";
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
  CustomModal,
} from "../../../shared";
import { ChipTextField } from "../../../shared/formFields/ChipTextField";

const Form = () => {
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const { state } = useLocation();
  const isViewMode = state?.viewDetails;
  const generalType = state?.field;
  const [tableEditId, setTableEditId] = useState("");
  const { tableReRenderActions } = useTableCustomHooks(
    ROUTE_PATHS.GENERAL_TYPES_FORM
  );
  const { searchData } = tableReRenderActions();
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["createAndUpdate"],
    mutationFn: ({ apiPath, payload }) => {
      return tableEditId
        ? updateApiService(apiPath, tableEditId, payload)
        : postApiService(apiPath, payload);
    },
    onSuccess: () => {
      dispatchNotifyAction(
        values?.typeMaster,
        tableEditId ? CODES?.UPDATE : CODES?.ADDED
      );
      handleReset();
      refetch();
      setTableEditId("");
    },
  });

  const handleOnSubmit = (value) => {
    if (
      value?.chips?.length < 1 &&
      GENERALTYPE_INCLUDE.includes(values?.typeMaster)
    ) {
      dispatchNotifyError("Minimum one Sub type name is required");
      return;
    }
    const payload = getGeneralTypePayload(value);
    const apiPath = generalTypeApiPath?.[values?.typeMaster];

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

  const { data: allGeneralTypes } = useQuery({
    queryKey: ["getAllGeneralTypes"],
    queryFn: () => getApiService(API_PATHS.GENERAL_MASTER_SEED),
    select: ({ data }) => data?.data,
  });

  const { data: generalTypeList, refetch } = useQuery({
    queryKey: ["getGeneralTypeList", values?.typeMaster, searchData],
    queryFn: () => {
      const apiPath = generalTypeApiPath?.[values?.typeMaster];
      return getApiService(
        `${apiPath}${searchData ? "?searchText=" + searchData : ""}`
      );
    },
    select: ({ data }) => data,
  });

  const { data: allStates } = useQuery({
    queryKey: ["getAllStates", values?.typeMaster],
    queryFn: () => getApiService(API_PATHS.STATES),
    select: ({ data }) => data?.data,
    enabled: generalTypeApiPath?.[values?.typeMaster] === API_PATHS.DISTRICTS,
  });

  const { mutate: onDelete } = useMutation({
    mutationKey: ["deleteGeneralType"],
    mutationFn: (id) => {
      const apiPath = generalTypeApiPath?.[values?.typeMaster];
      return deleteApiService(apiPath, id);
    },
    onSuccess: () => {
      dispatchNotifyAction(values?.typeMaster, CODES?.DELETE);
      refetch();
      setOpen(false);
    },
  });

  const handleDelete = (id) => setOpen(id);

  const { mutate: handleEdit } = useMutation({
    mutationKey: ["editGeneralType"],
    mutationFn: (id) => {
      const apiPath = generalTypeApiPath?.[values?.typeMaster];
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
    if (generalType) setFieldValue("typeMaster", generalType);
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
        <WithCondition isValid={values?.typeMaster === GENERAL_TYPES.DISTRICT}>
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
          isValid={GENERALTYPE_INCLUDE.includes(values?.typeMaster)}
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
              chipAccessor={tableEditId ? "name" : ""}
            />
          </Grid>
        </WithCondition>
      </WithCondition>

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={handleReset}
        resetLabel="Clear"
        submitLabel={tableEditId ? "Update" : "Add"}
        isViewMode={isViewMode}
      />

      <ListTopbar
        disableNewForm
        disableFilter
        placeholder={values?.typeMaster}
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
        content={`${DELETE_MSG}${values?.typeMaster} ${
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
