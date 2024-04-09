import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { useFormik } from "formik";
import { getApiService } from "../../../../api/api";
import { API_PATHS } from "../../../../api/apiPaths";
import {
  fields,
  initialValues,
} from "../../../../constants/typeMasters/generalTypes";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import { getValidValues } from "../../../../utils/common";
import {
  CustomRadioButton,
  CustomReactTable,
  CustomTextField,
  FormActions,
  FormWrapper,
} from "../../../shared";
import { ChipTextField } from "../../../shared/formFields/ChipTextField";

const Form = () => {
  const { data } = useQuery({
    queryKey: ["get all general types"],
    queryFn: () => getApiService(API_PATHS.GENERAL_MASTER_SEED),
    select: ({ data }) => data?.data,
  });

  const handleOnSubmit = (values) => {
    const payload = getValidValues(values);
    console.log(payload);
  };

  const formik = useFormik({
    initialValues: initialValues(),
  });
  const { values, handleChange, handleSubmit, handleReset } = formik;

  return (
    <FormWrapper
      navigateTo={ROUTE_PATHS.GENERAL_TYPES_LIST}
      title="Type Master"
      rowSpacing={1}
      columnSpacing={1}
    >
      <Grid item xs={12}>
        <CustomRadioButton
          name={fields?.typeMaster?.name}
          label={fields?.typeMaster?.label}
          labelStyle={fields?.typeMaster?.labelStyle}
          accessor={fields?.typeMaster?.accessor}
          inputValues={data || []}
          value={values?.typeMaster}
          onChange={handleChange}
          rowBreak
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTextField
          label={fields?.name?.label}
          name={fields?.name?.name}
          value={values?.name}
          onChange={handleChange}
        />
      </Grid>

      <ChipTextField />

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={handleReset}
        resetLabel={"Clear"}
        submitLabel="Add"
      />

      <Grid item xs={12}>
        <CustomReactTable
          columnData={[]}
          rawData={[]}
          disablePagination
          disableSort
          disableColumnHiding
          disableLayout
        />
      </Grid>
    </FormWrapper>
  );
};

export default Form;
