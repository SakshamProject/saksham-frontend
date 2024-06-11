import { Refresh } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { getApiService, postApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import {
  listInitialValues as initialValues,
  listColumns,
  listFields,
} from "../../../constants/serviceMapping/serviceMapping";
import useTableCustomHooks from "../../../hooks/useTableCustomHooks";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { ListingContainer, SubmitButton } from "../../../styles";
import { formatDate } from "../../../utils/common";
import { listValidationSchema } from "../../../validations/serviceMapping/serviceMapping";
import {
  CustomDatePicker,
  CustomRadioButton,
  CustomReactTable,
  ListTopbar,
  SingleAutoComplete,
  WithCondition,
} from "../../shared";
import useResponsive from "../../../hooks/useResponsive";
import ResponsiveList from "../../shared/ResponsiveList";
import { getTableSchemas } from "../../../utils/tableSchemas";
import { useSelector } from "react-redux";

const List = () => {
  const { isMobile } = useResponsive();
  const { filterFields, filterInitialValues } = getTableSchemas(listColumns);
  const userInfo = useSelector((state) => state?.userInfo);

  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableData,
    tableReRenderActions,
  } = useTableCustomHooks(ROUTE_PATHS?.SERVICE_MAPPING_LIST);
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    setFieldTouched,
    setValues,
    setTouched,
  } = useFormik({
    initialValues,
    validationSchema: listValidationSchema,
  });
  const listParams = handleTableData();
  const { pageSize, currentPage } = tableReRenderActions();

  const { data: allDistricts } = useQuery({
    queryKey: ["getAllDistricts"],
    queryFn: () => getApiService(API_PATHS?.DISTRICTS),
    select: ({ data }) => data?.data,
  });

  const { isLoading, data } = useQuery({
    queryKey: ["services", values, listParams],
    queryFn: () => {
      if (
        (!!values?.startDate && !values?.endDate) ||
        (!!values?.endDate && !values?.startDate) ||
        (!!values?.startDate &&
          !!values?.endDate &&
          values?.startDate >= values?.endDate)
      ) {
        return { data };
      }

      return postApiService(
        API_PATHS?.SERVICE_MAPPING_LIST,
        {
          ...values,
          ...listParams,
        },
        {
          ...(values?.startDate && {
            startDate: formatDate({ date: values?.startDate, format: "iso" }),
          }),
          ...(values?.endDate && {
            endDate: formatDate({ date: values?.endDate, format: "iso" }),
          }),
          ...(values?.serviceStatus && {
            serviceStatus: values?.serviceStatus,
          }),
          ...(values?.districtId && { districtId: values?.districtId }),
        }
      );
    },
    select: ({ data }) => data,
  });

  return (
    <ListingContainer sx={{ maxHeight: "100vh", scrollbarWidth: "none" }}>
      <ListTopbar
        label="Service Mapping"
        listPath={ROUTE_PATHS?.SERVICE_MAPPING_LIST}
        newFormPath={ROUTE_PATHS?.SERVICE_MAPPING_FORM}
        style={{
          marginLeft: "0",
          width: "100% !important",
        }}
        filterFields={filterFields}
        filterFieldInitial={filterInitialValues}
        disableNewForm={!userInfo?.serviceMapping}
      />

      <CustomRadioButton
        label={listFields?.serviceStatus?.label}
        name={listFields?.serviceStatus?.name}
        labelStyle={listFields?.serviceStatus?.labelStyle}
        inputValues={listFields?.serviceStatus?.inputValues}
        value={values?.serviceStatus}
        onChange={handleChange}
        style={{}}
      />

      <Grid container columnGap={2}>
        <WithCondition isValid={!isMobile}>
          <Grid item xs={3}>
            <SingleAutoComplete
              label={listFields?.districtId?.label}
              name={listFields?.districtId?.name}
              size={listFields?.districtId?.size}
              getOptionLabel={listFields?.districtId?.getOptionLabel}
              value={values?.districtId}
              errors={errors?.districtId}
              touched={touched?.districtId}
              inputValues={allDistricts || []}
              onChange={setFieldValue}
            />
          </Grid>

          <Grid item xs={3}>
            <CustomDatePicker
              name={listFields?.startDate?.name}
              label={listFields?.startDate?.label}
              size={listFields?.startDate?.size}
              // maxDate={listFields?.startDate?.maxDate}
              value={values?.startDate}
              errors={errors?.startDate}
              touched={touched?.startDate}
              setTouched={setFieldTouched}
              customOnChange={(val) => {
                setFieldTouched(listFields?.endDate?.name, true);
                setFieldValue(
                  listFields?.startDate?.name,
                  formatDate({ date: val?.$d, format: "iso" })
                );
              }}
            />
          </Grid>

          <Grid item xs={3}>
            <CustomDatePicker
              name={listFields?.endDate?.name}
              label={listFields?.endDate?.label}
              size={listFields?.endDate?.size}
              // maxDate={listFields?.endDate?.maxDate}
              value={values?.endDate}
              errors={errors?.endDate}
              touched={touched?.endDate}
              setTouched={setFieldTouched}
              customOnChange={(val) => {
                setFieldTouched(listFields?.startDate?.name, true);
                setFieldValue(
                  listFields?.endDate?.name,
                  formatDate({ date: val?.$d, format: "iso" })
                );
              }}
            />
          </Grid>
        </WithCondition>

        <Grid item ml={isMobile ? "80%" : 0} mb={isMobile ? 1 : 0}>
          <SubmitButton
            sx={{
              textTransform: "capitalize",
              height: isMobile ? "24px" : "38px",
              minWidth: isMobile ? "max-content !important" : "64px",
            }}
            onClick={() => {
              setValues({ ...initialValues });
              setTouched({});
            }}
          >
            {isMobile ? "" : "Reset"} <Refresh />
          </SubmitButton>
        </Grid>
      </Grid>
      <WithCondition isValid={!isMobile}>
        <CustomReactTable
          columnData={listColumns || []}
          rawData={data?.data || []}
          isLoading={isLoading}
          onPageNumberChange={onPageNumberChange}
          onChangePageSize={onChangePageSize}
          pageSize={pageSize}
          currentPage={currentPage}
          count={data?.total}
          maxHeight={"350px"}
          disableLayout
        />
      </WithCondition>

      <WithCondition isValid={isMobile}>
        <ResponsiveList
          columnData={listColumns}
          rawData={data?.data}
          disablePagination
        />
      </WithCondition>
    </ListingContainer>
  );
};

export default List;
