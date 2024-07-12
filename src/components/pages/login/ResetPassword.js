import { ArrowBack } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { postUpdateApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { PASSWORD_SUCCESS } from "../../../constants/globalConstants";
import { fields, initialValues } from "../../../constants/login/resetPassword";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { SubmitButton } from "../../../styles/buttonStyle";
import {
  LoginContainer,
  LoginHeading,
  LoginWrapper,
} from "../../../styles/login";
import { BackIcon } from "../../../styles/signup";
import { getValidValues } from "../../../utils/common";
import { dispatchSnackbarSuccess } from "../../../utils/dispatch";
import { validationSchema } from "../../../validations/login/resetPassword";
import { CustomPasswordField } from "../../shared";
import CustomTooltip from "../../shared/CustomTooltip";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userId = state?.userId;

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (value) =>
      postUpdateApiService(
        API_PATHS?.UPDATE_PASSWORD,
        userId,
        getValidValues(value)
      ),
    onSuccess: () => {
      dispatchSnackbarSuccess(PASSWORD_SUCCESS);
      navigate(ROUTE_PATHS?.LOGIN, { replace: true });
    },
  });

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <LoginWrapper container>
      <LoginContainer>
        <Grid container gap={2}>
          <Grid item xs={12} sx={{ display: "flex", marginBottom: "24px" }}>
            <CustomTooltip title={"Back"}>
              <BackIcon
                disableFocusRipple
                disableRipple
                onClick={() => navigate(ROUTE_PATHS?.LOGIN, { replace: true })}
              >
                <ArrowBack />
              </BackIcon>
            </CustomTooltip>
            <LoginHeading>Reset Password</LoginHeading>
          </Grid>

          <Grid xs={12} item>
            <CustomPasswordField
              showEyeIcon
              label={fields?.password?.label}
              name={fields?.password?.name}
              value={values?.password}
              errors={errors?.password}
              touched={touched?.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid xs={12} item>
            <CustomPasswordField
              showEyeIcon
              label={fields?.confirmPassword?.label}
              name={fields?.confirmPassword?.name}
              value={values?.confirmPassword}
              errors={errors?.confirmPassword}
              touched={touched?.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sx={{ margin: "0", textAlign: "center" }}>
            <SubmitButton
              onClick={handleSubmit}
              sx={{ borderRadius: "18px", width: "50%" }}
            >
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default ResetPassword;
