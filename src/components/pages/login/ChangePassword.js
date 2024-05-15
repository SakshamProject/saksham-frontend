import { Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { putApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { initialValues, labels } from "../../../constants/login/changePassword";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { getValidValues } from "../../../utils/common";
import { validationSchema } from "../../../validations/login/changePassword";
import { FormActions } from "../../shared/FormActions";
import { FormWrapper } from "../../shared/FormWrapper";
import { CustomPasswordField } from "../../shared/formFields/CustomPasswordField";

const ChangePassword = () => {
  const navigate = useNavigate();

  const handleOnReset = () => navigate(ROUTE_PATHS?.PROFILE);

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: (payload) =>
      putApiService(API_PATHS?.UPDATE_PASSWORD, getValidValues(payload)),
    onSuccess: ({ data }) => {},
  });
  const { values, handleChange, handleBlur, touched, errors, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <FormWrapper
      customTitle="CHANGE PASSWORD"
      navigateTo={ROUTE_PATHS.PROFILE}
      formWidth="50%"
    >
      <Grid xs={12} item>
        <CustomPasswordField
          label={labels?.oldPassword}
          name="oldPassword"
          value={values?.oldPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.oldPassword}
          touched={touched?.oldPassword}
          showEyeIcon
        />
      </Grid>

      <Grid xs={12} item>
        <CustomPasswordField
          label={labels?.newPassword}
          name="password"
          value={values?.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.password}
          touched={touched?.password}
          showEyeIcon
        />
      </Grid>

      <Grid xs={12} item>
        <CustomPasswordField
          label={labels?.confirmPassword}
          name="confirmPassword"
          value={values?.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.confirmPassword}
          touched={touched?.confirmPassword}
          showEyeIcon
        />
      </Grid>

      <FormActions handleSubmit={handleSubmit} handleOnReset={handleOnReset} />
    </FormWrapper>
  );
};

export default ChangePassword;
