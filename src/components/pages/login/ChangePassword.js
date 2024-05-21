import { Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { CODES } from "../../../constants/globalConstants";
import { initialValues, labels } from "../../../constants/login/changePassword";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { getValidValues } from "../../../utils/common";
import { dispatchResponseAction } from "../../../utils/dispatch";
import { validationSchema } from "../../../validations/login/changePassword";
import { FormActions } from "../../shared/FormActions";
import { FormWrapper } from "../../shared/FormWrapper";
import { CustomPasswordField } from "../../shared/formFields/CustomPasswordField";

const ChangePassword = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state?.userInfo);

  const handleOnReset = () => navigate(ROUTE_PATHS?.PROFILE);

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: (value) => {
      const payload = getValidValues(value);
      const apiPath =
        userInfo?.role === CODES?.DIVYANG
          ? API_PATHS?.RESET_PASSWORD_DIVYANG
          : API_PATHS?.RESET_PASSWORD;

      return postApiService(apiPath, payload);
    },
    onSuccess: () => {
      dispatchResponseAction("Password", CODES?.UPDATED);
      handleOnReset();
    },
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
          name="newPassword"
          value={values?.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.newPassword}
          touched={touched?.newPassword}
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
