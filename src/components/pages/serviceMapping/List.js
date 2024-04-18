import { Grid } from "@mui/material";
import {
  CustomDatePicker,
  CustomRadioButton,
  CustomReactTable,
  ListTopbar,
  SingleAutoComplete,
} from "../../shared";
import { ListingContainer } from "../../../styles";
import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { API_PATHS } from "../../../api/apiPaths";
import { getApiService } from "../../../api/api";

const List = () => {
  const { values, errors, touched, setFieldValue } = useFormik({
    initialValues: {
      status: "",
      districtId: "",
      startDate: "",
      endDate: "",
    },
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
        listPath={"SERVICE_MAPPING_LIST"}
        newFormPath={"SERVICE_MAPPING_FORM"}
        style={{
          marginLeft: "0",
          width: "100% !important",
        }}
      />

      <CustomRadioButton
        label={"Service Status"}
        name={"status"}
        labelStyle={{ color: "blue" }}
        value="pending"
        inputValues={[
          {
            id: "pending",
            name: "Pending",
          },
          {
            id: "completed",
            name: "Completed",
          },
        ]}
      />

      <Grid container columnGap={2}>
        <Grid item xs={3}>
          <SingleAutoComplete
            label={"Seva Kendra District"}
            name={"districtId"}
            size="small"
            value={values?.districtId}
            errors={errors?.districtId}
            touched={touched?.districtId}
            onChange={setFieldValue}
            inputValues={allDistricts || []}
            getOptionLabel={(option) =>
              `${option?.name} - ${option?.state?.name}`
            }
          />
        </Grid>

        <Grid item xs={3}>
          <CustomDatePicker
            name="startDate"
            label={"Start Date"}
            size="small"
            value={values?.startDate}
            onChange={setFieldValue}
            fullWidth
            errors={errors?.startDate}
            touched={touched?.startDate}
          />
        </Grid>

        <Grid item xs={3}>
          <CustomDatePicker
            name="endDate"
            label={"End Date"}
            size="small"
            value={values?.endDate}
            onChange={setFieldValue}
            fullWidth
            errors={errors?.endDate}
            touched={touched?.endDate}
            maxDate={new Date()}
          />
        </Grid>
      </Grid>

      {/* <CustomReactTable columnData={[]} /> */}
    </ListingContainer>
  );
};

export default List;
