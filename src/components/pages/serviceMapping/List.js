import { Grid } from "@mui/material";
import {
  CommonList,
  CustomDatePicker,
  CustomRadioButton,
  ListTopbar,
  SingleAutoComplete,
} from "../../shared";
import { ListingContainer } from "../../../styles";
import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";

import { API_PATHS } from "../../../api/apiPaths";
import { getApiService } from "../../../api/api";
import {
  listInitialValues as initialValues,
  listFields,
} from "../../../constants/serviceMapping/serviceMapping";
import { ROUTE_PATHS } from "../../../routes/routePaths";

const List = () => {
  const { values, errors, touched, setFieldValue, handleChange } = useFormik({
    initialValues,
  });

  const { data: allDistricts } = useQuery({
    queryKey: ["getAllDistricts"],
    queryFn: () => getApiService(API_PATHS.DISTRICTS),
    select: ({ data }) => data?.data,
  });

  return (
    <ListingContainer>
      <ListTopbar
        label={"Service Mapping"}
        listPath={ROUTE_PATHS.SERVICE_MAPPING_LIST}
        newFormPath={ROUTE_PATHS.SERVICE_MAPPING_FORM}
        style={{
          marginLeft: "0",
          width: "100% !important",
        }}
      />

      <CustomRadioButton
        label={listFields?.status?.label}
        name={listFields?.status?.name}
        labelStyle={listFields?.status?.labelStyle}
        value={values?.status}
        inputValues={listFields?.status?.inputValues}
        onChange={handleChange}
      />

      <Grid container columnGap={2}>
        <Grid item xs={3}>
          <SingleAutoComplete
            label={listFields?.districtId?.label}
            name={listFields?.districtId?.name}
            size={listFields?.districtId?.size}
            value={values?.districtId}
            errors={errors?.districtId}
            touched={touched?.districtId}
            onChange={setFieldValue}
            inputValues={allDistricts || []}
            getOptionLabel={listFields?.districtId?.getOptionLabel}
          />
        </Grid>

        <Grid item xs={3}>
          <CustomDatePicker
            name={listFields?.startDate?.name}
            label={listFields?.startDate?.label}
            size={listFields?.startDate?.size}
            value={values?.startDate}
            onChange={setFieldValue}
            fullWidth
            errors={errors?.startDate}
            touched={touched?.startDate}
          />
        </Grid>

        <Grid item xs={3}>
          <CustomDatePicker
            name={listFields?.endDate?.name}
            label={listFields?.endDate?.label}
            size={listFields?.endDate?.size}
            value={values?.endDate}
            onChange={setFieldValue}
            fullWidth
            errors={errors?.endDate}
            touched={touched?.endDate}
            maxDate={new Date()}
          />
        </Grid>
      </Grid>

      <CommonList
        disableLayout
        disableTopBar
        listPath={"SERVICE_MAPPING_LIST"}
        formPath={"SERVICE_MAPPING_FORM"}
        apiPath={"SERVICE_MAPPING_LIST"}
      />
    </ListingContainer>
  );
};

export default List;
