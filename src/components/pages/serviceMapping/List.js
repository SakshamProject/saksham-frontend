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
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { ListingContainer, SubmitButton } from "../../../styles";
import {
  CustomDatePicker,
  CustomRadioButton,
  CustomReactTable,
  ListTopbar,
  SingleAutoComplete,
} from "../../shared";
import useTableCustomHooks from "../../../hooks/useTableCustomHooks";
import { listValidationSchema } from "../../../validations/serviceMapping/serviceMapping";
import { formatDate } from "../../../utils/common";

const List = () => {
  const {
    onPageNumberChange,
    onChangePageSize,
    handleTableData,
    tableReRenderActions,
  } = useTableCustomHooks(ROUTE_PATHS.SERVICE_MAPPING_LIST);
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
    queryFn: () => getApiService(API_PATHS.DISTRICTS),
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
        return { data: {} };
      }

      return postApiService(API_PATHS.SERVICE_MAPPING_LIST, {
        ...values,
        ...listParams,
      });
    },
    select: ({ data }) => data,
  });

  return (
    <ListingContainer sx={{ maxHeight: "100vh" }}>
      <ListTopbar
        label="Service Mapping"
        listPath={ROUTE_PATHS?.SERVICE_MAPPING_LIST}
        newFormPath={ROUTE_PATHS?.SERVICE_MAPPING_FORM}
        style={{
          marginLeft: "0",
          width: "100% !important",
        }}
      />

      <CustomRadioButton
        label={listFields?.serviceStatus?.label}
        name={listFields?.serviceStatus?.name}
        labelStyle={listFields?.serviceStatus?.labelStyle}
        inputValues={listFields?.serviceStatus?.inputValues}
        value={values?.serviceStatus}
        onChange={handleChange}
      />

      <Grid container columnGap={2}>
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
            maxDate={listFields?.startDate?.maxDate}
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
            maxDate={listFields?.endDate?.maxDate}
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

        <Grid item>
          <SubmitButton
            sx={{ textTransform: "capitalize", height: "38px" }}
            onClick={() => {
              setValues({ ...initialValues });
              setTouched({});
            }}
          >
            Reset <Refresh />
          </SubmitButton>
        </Grid>
      </Grid>

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
    </ListingContainer>
  );
};

export default List;
