import { Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  deleteApiService,
  getApiService,
  getByIdApiService,
  postApiService,
  updateApiService,
} from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { CODES } from "../../../constants/globalConstants";
import {
  fields,
  initialValues,
  serviceNameColumns,
} from "../../../constants/serviceMaster/serviceMaster";
import useResponsive from "../../../hooks/useResponsive";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { findNameById, getValidValues } from "../../../utils/common";
import { dispatchResponseAction } from "../../../utils/dispatch";
import { validationSchema } from "../../../validations/serviceMaster/serviceMaster";
import {
  CustomModal,
  CustomReactTable,
  CustomTextField,
  DividerLine,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
  WithCondition,
} from "../../shared";
import ResponsiveList from "../../shared/ResponsiveList";

const Form = () => {
  const { state } = useLocation();
  const editId = state?.editId;
  const isViewMode = state?.viewDetails || false;
  const [tableEditId, setTableEditId] = useState("");
  const [open, setOpen] = useState(false);
  const { isMobile } = useResponsive();

  const handleEditList = (id) => {
    setFieldValue("name", dataList?.data?.data?.service[id]?.name);
    setTableEditId(dataList?.data?.data?.service[id]?.id);
  };

  const handleDeleteList = (id) => {
    setOpen(dataList?.data?.data?.service[id]?.id);
  };

  const { mutate: onDelete } = useMutation({
    mutationKey: ["deleteService"],
    mutationFn: (id) => deleteApiService(API_PATHS?.SERVICES, id),
    onSuccess: () => {
      dispatchResponseAction("Service", CODES?.DELETED);
      serviceGetById();
      setOpen(false);
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
      dispatchResponseAction(
        "Service",
        tableEditId ? CODES?.UPDATED : CODES?.ADDED
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
    setTouched,
  } = formik;

  const { data: serviceTypeList } = useQuery({
    queryKey: ["getAllServiceTypes"],
    queryFn: () => getApiService(API_PATHS?.SERVICE_TYPES),
    select: ({ data }) => data?.data,
  });

  const { mutate: serviceGetById, data: dataList } = useMutation({
    mutationKey: ["getServiceTypeById"],
    mutationFn: () => getByIdApiService(API_PATHS?.SERVICES, editId),
    onSuccess: () => {
      setFieldValue("serviceTypeId", editId);
    },
  });

  useEffect(() => {
    if (editId) serviceGetById();
  }, [editId, serviceGetById]);

  return (
    <FormWrapper title="Service" navigateTo={ROUTE_PATHS?.SERVICE_MASTER_LIST}>
      <Grid item xs={12} sm={12} md={6}>
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
          isUpdate={!!tableEditId}
          submitLabel="Add"
        />
      </WithCondition>

      <Grid item xs={12} mt={isViewMode ? 0 : 4} mb={2}>
        <WithCondition isValid={!isMobile}>
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
          />
        </WithCondition>

        <WithCondition isValid={isMobile}>
          <ResponsiveList
            columnData={serviceNameColumns({
              tableEditId,
              handleDeleteList,
              handleEditList,
              isViewMode,
            })}
            rawData={dataList?.data?.data?.service}
            disablePagination
          />
        </WithCondition>
      </Grid>

      <CustomModal
        open={open}
        setOpen={setOpen}
        content={`Are you sure you want to delete this Service ${
          findNameById(open, dataList?.data?.data?.service) || ""
        }?`}
        handle={() => onDelete(open)}
      />
    </FormWrapper>
  );
};

export default Form;
