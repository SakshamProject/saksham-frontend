import React, { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  deleteApiService,
  getApiService,
  getByIdApiService,
  postApiService,
  updateApiService,
} from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import {
  ADDED_SUCCESSFULLY,
  DELETED_SUCCESSFULLY,
  UPDATED_SUCCESSFULLY,
} from "../../../constants/globalConstants";
import {
  fields,
  initialValues,
  serviceNameColumns,
} from "../../../constants/serviceMaster/serviceMaster";
import useNotify from "../../../hooks/useNotify";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { theme } from "../../../styles";
import { getValidValues } from "../../../utils/common";
import { validationSchema } from "../../../validations/serviceMaster/serviceMaster";
import {
  CustomReactTable,
  CustomTextField,
  DividerLine,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
  WithCondition,
} from "../../shared";

const Form = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const { notifySuccess } = useNotify();
  const isViewMode = state?.viewDetails;
  const [tableEditId, setTableEditId] = useState("");

  const handleEditList = (id) => {
    setFieldValue("name", dataList?.data?.data?.service[id]?.name);
    setTableEditId(dataList?.data?.data?.service[id]?.id);
  };

  const handleDeleteList = (id) => {
    onDelete(dataList?.data?.data?.service[id]?.id);
  };

  const { mutate: onDelete } = useMutation({
    mutationKey: ["deleteService"],
    mutationFn: (id) => deleteApiService(API_PATHS?.SERVICES, id),
    onSuccess: ({ data }) => {
      notifySuccess(DELETED_SUCCESSFULLY("Service"));
      serviceGetById();
    },
  });

  const handleOnSubmit = (values) => {
    const payload = getValidValues(values);
    onSubmit(payload);
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["create and update"],
    mutationFn: (data) =>
      tableEditId
        ? updateApiService(API_PATHS?.SERVICES, tableEditId, data)
        : postApiService(API_PATHS?.SERVICES, data),
    onSuccess: () => {
      notifySuccess(
        tableEditId
          ? UPDATED_SUCCESSFULLY("Service")
          : ADDED_SUCCESSFULLY("Service")
      );
      setFieldValue("name", "");
      setTouched({});
      serviceGetById();
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

  const { data: serviceTypeList } = useQuery({
    queryKey: ["getAllServiceTypes"],
    queryFn: () => getApiService(API_PATHS?.SERVICES),
    select: ({ data }) => data?.data,
  });

  const { mutate: serviceGetById, data: dataList } = useMutation({
    mutationKey: ["getServiceTypeById"],
    mutationFn: () => getByIdApiService(API_PATHS?.SERVICES, editId),
    onSuccess: () => {
      setFieldValue("serviceTypeId", editId);
    },
  });

  useEffect(editId && serviceGetById, []);

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
          isViewMode
          inputValues={serviceTypeList || []}
        />
      </Grid>

      <Grid item xs={12}>
        <DividerLine gap={"6px 0 24px"} />
      </Grid>

      <WithCondition isValid={!isViewMode}>
        <Grid item xs={12}>
          <CustomTextField
            label={fields?.serviceName?.label}
            name={fields?.serviceName?.name}
            fieldType={"alphaNumeric"}
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
            setFieldValue("name", "");
            setTouched({});
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
      </WithCondition>

      <Box width={1} sx={{ paddingBlock: "40px" }}>
        <CustomReactTable
          columnData={
            serviceNameColumns({
              tableEditId,
              handleDeleteList,
              handleEditList,
              isViewMode,
            }) || []
          }
          rawData={dataList?.data?.data?.service || []}
          manualSort
          disablePagination
          disableLayout
          style={{
            tableHead: {
              ".tr .th:first-child": {
                boxShadow: "none !important",
              },
            },
            tr: {
              "div:nth-child(3)": {
                flex: 1,
              },
            },
          }}
        />
      </Box>
    </FormWrapper>
  );
};

export default Form;
