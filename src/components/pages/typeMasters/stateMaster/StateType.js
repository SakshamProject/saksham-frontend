import { Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

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
  fields,
  formDetails,
  initialValues as initialValue,
  stateMasterColumns,
  tableStyles,
} from "../../../../constants/typeMasters/stateMaster";
import useTableCustomHooks from "../../../../hooks/useTableCustomHooks";
import { StyledFormContainer } from "../../../../styles";
import { findNameById, getValidValues } from "../../../../utils/common";
import { dispatchNotifyAction } from "../../../../utils/dispatch";
import { validationSchema as validation } from "../../../../validations/typeMaster/stateMaster";
import {
  CustomModal,
  CustomReactTable,
  CustomTextField,
  DividerLine,
  FormActions,
  ListTopbar,
  SingleAutoComplete,
} from "../../../shared";

const StateType = () => {
  const { pathname } = useLocation();
  const currentScreen = useMemo(() => pathname.split("/")[3], [pathname]);
  const currentForm = formDetails?.[currentScreen];
  const [tableEditId, setTableEditId] = useState("");
  const { tableReRenderActions } = useTableCustomHooks(currentForm?.routePath);
  const { searchData } = tableReRenderActions();
  const [open, setOpen] = useState(false);

  const handleEditList = (id) => {
    handleReset();
    setValues({ ...dataList?.data?.[id] });
    setFieldValue("stateId", dataList?.data?.[id]?.district?.state?.id);
    setTableEditId(dataList?.data?.[id]?.id);
  };

  const handleDeleteList = (id) => {
    setOpen(dataList?.data?.[id]?.id);
  };

  const { mutate: onDelete } = useMutation({
    mutationKey: ["delete", currentForm?.apiPath, currentScreen],
    mutationFn: (id) => deleteApiService(currentForm?.apiPath, id),
    onSuccess: ({ data }) => {
      dispatchNotifyAction(currentForm?.validationLabel, CODES?.DELETE);
      refetch();
      setOpen(false);
    },
  });

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
    mutationKey: ["create and update", currentForm?.apiPath, currentScreen],
    mutationFn: (data) =>
      tableEditId
        ? updateApiService(currentForm?.apiPath, tableEditId, data)
        : postApiService(currentForm?.apiPath, data),
    onSuccess: () => {
      dispatchNotifyAction(
        currentForm?.validationLabel,
        !!tableEditId ? CODES?.UPDATE : CODES?.ADDED
      );
      if (tableEditId) handleReset();
      else {
        setFieldValue(currentForm?.name, "");
        setTouched({});
      }
      refetch();
      setTableEditId("");
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
    setValues,
    handleReset,
    setTouched,
    setFieldTouched,
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

  const {
    data: dataList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["search", currentForm?.apiPath, currentScreen, searchData],
    queryFn: () =>
      getApiService(
        `${currentForm?.apiPath}${
          !!searchData ? `?searchText=${searchData}` : ""
        }`
      ),
    select: ({ data }) => data,
  });

  useEffect(() => {
    handleReset();
    setTableEditId("");
  }, [pathname]); //eslint-disable-line

  return (
    <Grid direction={"column"} width={"100%"}>
      <StyledFormContainer width="100%">
        <Grid container columnSpacing={3}>
          <Grid item xs={6}>
            <SingleAutoComplete
              label={fields?.stateId?.label}
              name={fields?.stateId?.name}
              value={values?.stateId}
              onChange={(_, value) => {
                setFieldValue(fields?.stateId?.name, value);
                setFieldValue(fields?.districtId?.name, "");
                setFieldTouched(fields?.districtId?.name, false);
              }}
              onBlur={handleBlur}
              errors={errors?.stateId}
              touched={touched?.stateId}
              inputValues={stateList || []}
              readOnly={tableEditId}
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
              readOnly={tableEditId}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DividerLine gap={"6px 0 24px"} />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            label={currentForm?.label}
            name={currentForm?.name}
            fieldType={currentForm?.fieldType}
            value={values?.[currentForm?.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors?.[currentForm?.name]}
            touched={touched?.[currentForm?.name]}
          />
        </Grid>
        <FormActions
          handleSubmit={handleSubmit}
          handleOnReset={() => {
            handleReset();
            setTableEditId("");
          }}
          resetLabel={"Clear"}
          isUpdate={tableEditId}
          submitLabel="Add"
        />
      </StyledFormContainer>

      <Grid item xs={12} mb={6}>
        <ListTopbar
          disableFilter
          disableNewForm
          style={{
            width: "100%",
            marginLeft: 0,
            ".searchField": { margin: 0 },
          }}
          placeholder={`Search ${currentForm?.validationLabel}`}
        />
        <CustomReactTable
          columnData={
            stateMasterColumns({
              currentForm,
              tableEditId,
              handleDeleteList,
              handleEditList,
            }) || []
          }
          rawData={dataList?.data || []}
          isLoading={isLoading}
          manualSort
          disablePagination
          disableLayout
          count={dataList?.total}
          style={tableStyles}
        />
      </Grid>

      <CustomModal
        open={open}
        setOpen={setOpen}
        content={`${DELETE_MSG}${currentForm?.validationLabel} ${
          findNameById(open, dataList?.data) || ""
        }?`}
        handle={() => onDelete(open)}
      />
    </Grid>
  );
};

export default StateType;
