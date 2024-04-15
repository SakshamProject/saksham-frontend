import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

import {
  fields,
  initialValues,
} from "../../../../constants/sevaKendraSetup/designation";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import { validationSchema } from "../../../../validations/sevaKendraSetup/designation";
import {
  CustomTextField,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
} from "../../../shared";

const Form = () => {
  const { state } = useLocation();
  const isViewMode = state?.viewDetails;
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (value) => console.log(value),
  });

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
  } = formik;

  return (
    <FormWrapper
      title="Designations"
      navigateTo={ROUTE_PATHS.DESIGNATIONS_LIST}
    >
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
          inputValues={[]}
          accessor={fields?.stateId?.accessor}
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
          inputValues={[]}
          accessor={fields?.districtId?.accessor}
        />
      </Grid>

      <Grid item xs={12}>
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
          inputValues={[]}
          accessor={fields?.stateId?.accessor}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.address?.label}
          name={fields?.address?.name}
          value={values?.address}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.address}
          touched={touched?.address}
          isViewMode={isViewMode}
          type={fields?.address?.type}
        />
      </Grid>

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={() => navigate(ROUTE_PATHS.DESIGNATIONS_LIST)}
        isUpdate={false}
      />
    </FormWrapper>
  );
};

export default Form;
