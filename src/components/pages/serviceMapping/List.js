import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect } from "react";
import { getApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import {
  listInitialValues as initialValues,
  listFields,
} from "../../../constants/serviceMapping/serviceMapping";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { ListingContainer } from "../../../styles";
import { getValidValues } from "../../../utils/common";
import { listValidationSchema as validationSchema } from "../../../validations/serviceMapping/serviceMapping";
import {
  CommonList,
  CustomDatePicker,
  CustomRadioButton,
  ListTopbar,
  SingleAutoComplete,
} from "../../shared";

const List = () => {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    setTouched,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
  });

  const { data: allDistricts } = useQuery({
    queryKey: ["getAllDistricts"],
    queryFn: () => getApiService(API_PATHS.DISTRICTS),
    select: ({ data }) => data?.data,
  });

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit, values]);

  return (
    <ListingContainer>
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
            value={values?.startDate}
            errors={errors?.startDate}
            touched={touched?.startDate}
            setTouched={() => setTouched}
            onChange={setFieldValue}
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
            setTouched={setTouched}
            onChange={setFieldValue}
          />
        </Grid>
      </Grid>

      <CommonList
        disableLayout
        disableTopBar
        listPath={"SERVICE_MAPPING_LIST"}
        apiPath={"SERVICE_MAPPING_LIST"}
        additionFilters={getValidValues(values)}
      />
    </ListingContainer>
  );
};

export default List;
