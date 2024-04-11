import { Box, Grid } from "@mui/material";
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
import {
  ADDED_SUCCESSFULLY,
  DELETED_SUCCESSFULLY,
  UPDATED_SUCCESSFULLY,
} from "../../../../constants/globalConstants";
import {
  fields,
  formDetails,
  initialValues as initialValue,
  stateMasterColumns,
} from "../../../../constants/typeMasters/stateMaster";
import useNotify from "../../../../hooks/useNotify";
import useTableCustomHooks from "../../../../hooks/useTableCustomHooks";
import { StyledFormContainer, theme } from "../../../../styles";
import { getValidValues } from "../../../../utils/common";
import { validationSchema as validation } from "../../../../validations/typeMaster/stateMaster";
import {
  CustomReactTable,
  CustomTextField,
  DividerLine,
  FormActions,
  ListTopbar,
  SingleAutoComplete,
} from "../../../shared";

const StateType = () => {
  const { notifySuccess } = useNotify();
  const { pathname } = useLocation();
  const currentScreen = useMemo(() => pathname.split("/")[3], [pathname]);
  const currentForm = formDetails?.[currentScreen];
  const [tableEditId, setTableEditId] = useState("");
  const { tableReRenderActions } = useTableCustomHooks(currentForm?.routePath);
  const { searchData } = tableReRenderActions();

  const handleEditList = (id) => {
    setValues({ ...dataList?.data?.[id] });
    setFieldValue("stateId", dataList?.data?.[id]?.district?.state?.id);
    setTableEditId(dataList?.data?.[id]?.id);
  };

  const handleDeleteList = (id) => {
    onDelete(dataList?.data?.[id]?.id);
  };

  const { mutate: onDelete } = useMutation({
    mutationKey: ["delete", currentForm?.apiPath, currentScreen],
    mutationFn: (id) => deleteApiService(currentForm?.apiPath, id),
    onSuccess: () => {
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
    mutationKey: ["create and update", currentForm?.apiPath, currentScreen],
    mutationFn: (data) =>
      tableEditId
        ? updateApiService(currentForm?.apiPath, tableEditId, data)
        : postApiService(currentForm?.apiPath, data),
    onSuccess: () => {
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
    setValues,
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

  useEffect(handleReset, [pathname]); //eslint-disable-line

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
        </Grid>
        <Grid item xs={12}>
          <DividerLine gap={"6px 0 24px"} />
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
