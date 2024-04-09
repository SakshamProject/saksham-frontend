import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import useNotify from "../../../../hooks/useNotify";
import {
  STEPS,
  fields,
  formDetails,
  initialValues as initialValue,
  stateMasterColumns,
} from "../../../../constants/typeMasters/stateMaster";
import { validationSchema as validation } from "../../../../validations/typeMaster/stateMaster";
import { useFormik } from "formik";
import { getValidValues } from "../../../../utils/common";
import { StyledFormContainer, theme } from "../../../../styles";
import { Box, Grid } from "@mui/material";
import {
  CommonList,
  CustomReactTable,
  CustomTextField,
  DividerLine,
  FormActions,
  ListTopbar,
  SingleAutoComplete,
} from "../../../shared";
import { API_PATHS } from "../../../../api/apiPaths";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteApiService,
  getApiService,
  getByIdApiService,
  postApiService,
  updateApiService,
} from "../../../../api/api";
import {
  ADDED_SUCCESSFULLY,
  DELETED_SUCCESSFULLY,
  UPDATED_SUCCESSFULLY,
} from "../../../../constants/globalConstants";
import useTableCustomHooks from "../../../../hooks/useTableCustomHooks";

const StateType = () => {
  const { notifySuccess } = useNotify();
  const { pathname } = useLocation();
  const currentScreen = useMemo(() => pathname.split("/")[3], [pathname]);
  const currentForm = formDetails?.[currentScreen];
  const [tableEditId, setTableEditId] = useState("");
  const { tableReRenderActions } = useTableCustomHooks(currentForm?.routePath);
  const { searchData } = tableReRenderActions();

  const handleEditList = (id) => {
    setValues({ ...dataList?.[id] });
    setFieldValue("stateId", dataList?.[id]?.district?.state?.id);
    setTableEditId(dataList?.[id]?.id);
  };

  const handleDeleteList = (id) => {
    onDelete(dataList?.[id]?.id);
  };

  const { mutate: onDelete } = useMutation({
    mutationKey: [currentForm?.apiPath, currentScreen],
    mutationFn: (id) => deleteApiService(currentForm?.apiPath, id),
    onSuccess: ({ data }) => {
      notifySuccess(DELETED_SUCCESSFULLY(currentForm?.validationLabel));
      handleReset();
      refetch();
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
    mutationKey: [currentForm?.apiPath, currentScreen],
    mutationFn: (data) =>
      tableEditId
        ? updateApiService(currentForm?.apiPath, tableEditId, data)
        : postApiService(currentForm?.apiPath, data),
    onSuccess: ({ data }) => {
      notifySuccess(
        tableEditId
          ? UPDATED_SUCCESSFULLY(currentForm?.validationLabel)
          : ADDED_SUCCESSFULLY(currentForm?.validationLabel)
      );
      handleReset();
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
    setFieldTouched,
    setValues,
    setTouched,
    handleReset,
  } = formik;

  const { data: stateList } = useQuery({
    queryKey: [API_PATHS.STATES],
    queryFn: () => getApiService(API_PATHS.STATES),
    select: ({ data }) => data?.data,
  });

  const { data: districtList } = useQuery({
    queryKey: [API_PATHS.DISTRICTS, values?.stateId],
    queryFn: () =>
      values?.stateId && getByIdApiService(API_PATHS.STATES, values?.stateId),
    select: ({ data }) => data?.data,
  });

  const {
    data: dataList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [currentForm?.apiPath, currentScreen, searchData],
    queryFn: () =>
      getApiService(`${currentForm?.apiPath}?searchText=${searchData || ""}`),
    select: ({ data }) => data,
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
              inputValues={stateList || []}
              accessor={fields?.stateId?.accessor}
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
              accessor={fields?.districtId?.accessor}
              readOnly={tableEditId}
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
            handleOnReset={() => {
              handleReset();
              setTableEditId("");
            }}
            resetLabel={"Clear"}
            isUpdate={tableEditId}
            submitLabel="Add"
            submitButtonStyle={{
              backgroundColor: tableEditId
                ? theme?.palette?.backgroundColor?.blue
                : theme?.palette?.success?.main,
              "&:hover": {
                backgroundColor: tableEditId
                  ? theme?.palette?.backgroundColor?.blue
                  : theme?.palette?.success?.main,
              },
            }}
          />
        </Grid>
      </StyledFormContainer>

      <Box width={1} sx={{ paddingBottom: "40px" }}>
        <ListTopbar
          disableFilter
          disableNewForm
          style={{ width: "100%", marginLeft: 0 }}
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
          style={{
            tableHead: {
              ".tr .th:first-child": {
                boxShadow: "none !important",
                marginLeft: "-4px",
              },
            },
            tr: {
              "div:nth-child(3)": {
                width: "100% !important",
              },
            },
          }}
        />
      </Box>
    </Grid>
  );
};

export default StateType;
