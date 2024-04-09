import React, { useState } from "react";

import {
  CustomReactTable,
  CustomTextField,
  DividerLine,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
} from "../../shared";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { Box, Grid } from "@mui/material";
import {
  fields,
  initialValues,
} from "../../../constants/serviceMaster/serviceMaster";
import useNotify from "../../../hooks/useNotify";
import { useFormik } from "formik";
import { getValidValues } from "../../../utils/common";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { validationSchema } from "../../../validations/serviceMaster/serviceMaster";
import { API_PATHS } from "../../../api/apiPaths";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteApiService,
  getApiService,
  postApiService,
  updateApiService,
} from "../../../api/api";
import { theme } from "../../../styles";
import {
  ADDED_SUCCESSFULLY,
  DELETED_SUCCESSFULLY,
  UPDATED_SUCCESSFULLY,
} from "../../../constants/globalConstants";

const Form = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const { notifySuccess } = useNotify();
  const isViewMode = state?.viewDetails;
  const [tableEditId, setTableEditId] = useState("");

  const handleEditList = (id) => {
    // console.log(dataList?.[id]?.id);
    // setValues({ ...dataList?.[id] });
    // setFieldValue("stateId", dataList?.[id]?.district?.state?.id);
    // setTableEditId(dataList?.[id]?.id);
  };

  const handleDeleteList = (id) => {
    // console.log(dataList?.[id]?.id);
    // onDelete(dataList?.[id]?.id);
  };

  //   const { mutate: onDelete } = useMutation({
  //     mutationKey: [currentForm?.apiPath, currentScreen],
  //     mutationFn: (id) => deleteApiService(currentForm?.apiPath, id),
  //     onSuccess: ({ data }) => {
  //       notifySuccess(DELETED_SUCCESSFULLY(currentForm?.validationLabel));
  //       handleReset();
  //       //   refetch();
  //     },
  //   });

  const handleOnSubmit = (values) => {
    const payload = getValidValues(values);
    console.log(payload);
    //   onSubmit(payload);
  };

  //   const { mutate: onSubmit } = useMutation({
  //     mutationKey: ["create and update", currentForm?.apiPath, currentScreen],
  //     mutationFn: (data) =>
  //       tableEditId
  //         ? updateApiService(currentForm?.apiPath, tableEditId, data)
  //         : postApiService(currentForm?.apiPath, data),
  //     onSuccess: () => {
  //       notifySuccess(
  //         tableEditId
  //           ? UPDATED_SUCCESSFULLY("Service")
  //           : ADDED_SUCCESSFULLY("Service")
  //       );
  //       handleReset();
  //       refetch();
  //       setTableEditId("");
  //     },
  //   });

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

  const { data: serviceTypeList } = useQuery({
    queryKey: [API_PATHS?.SERVICE_TYPES],
    queryFn: () => getApiService(API_PATHS?.SERVICE_TYPES),
    select: ({ data }) => data?.data,
  });

  return (
    <FormWrapper title="Service" navigateTo={ROUTE_PATHS.SERVICE_MASTER_LIST}>
      <Grid item xs={6}>
        <SingleAutoComplete
          label={fields?.serviceTypeId?.label}
          name={fields?.serviceTypeId?.name}
          value={values?.serviceTypeId}
          onChange={setFieldValue}
          onBlur={handleBlur}
          errors={errors?.serviceTypeId}
          touched={touched?.serviceTypeId}
          isViewMode={isViewMode}
          inputValues={serviceTypeList || []}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine />
      </Grid>

      <Grid item xs={12}>
        <CustomTextField
          label={fields?.serviceName?.label}
          name={fields?.serviceName?.name}
          fieldType={"alphabets"}
          value={values?.name}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.name}
          touched={touched?.name}
          isViewMode={isViewMode}
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

      <Box width={1} sx={{ paddingBottom: "40px" }}>
        <CustomReactTable
          columnData={
            // stateMasterColumns({
            //   currentForm,
            //   tableEditId,
            //   handleDeleteList,
            //   handleEditList,
            // }} ||
            []
          }
          rawData={
            // dataList?.data ||
            []
          }
          //   isLoading={isLoading}
          manualSort
          disablePagination
          disableLayout
          //   count={dataList?.total}
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
    </FormWrapper>
  );
};

export default Form;
