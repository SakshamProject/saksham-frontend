import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { putApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { getValidValues } from "../../../utils/common";

const ChangePassword = () => {
  const navigate = useNavigate();

  const handleOnReset = () => navigate(ROUTE_PATHS?.PROFILE);

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: (payload) =>
      putApiService(API_PATHS?.CHANGE_PASSWORD, getValidValues(payload)),
    onSuccess: ({ data }) => {},
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { values, handleChange, handleBlur, touched, errors, handleSubmit } =
    formik;

  return (
    <>
      <FormWrapper
        customTitle="CHANGE PASSWORD"
        navigateTo={ROUTE_PATHS.PROFILE}
        formWidth="35%"
      >
        <Grid xs={12} item>
          <CustomPasswordField
            label={labels.oldPassword}
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
            label={labels.password}
            name="password"
            value={values?.password}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors?.password}
            touched={touched?.password}
            showEyeIcon
          />
        </Grid>
        <Grid xs={12} item>
          <CustomPasswordField
            label={labels.confirmPassword}
            name="confirmPassword"
            value={values?.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors?.confirmPassword}
            touched={touched?.confirmPassword}
            showEyeIcon
          />
        </Grid>
        <FormActions
          handleSubmit={handleSubmit}
          handleOnReset={handleOnReset}
        />
      </FormWrapper>
    </>
  );
};

export default ChangePassword;
