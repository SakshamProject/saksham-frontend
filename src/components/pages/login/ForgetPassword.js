import { ArrowBack } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { postApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import {
  CODES,
  VALID_DIVYANG,
  VALID_SEVA_KENDRA,
} from "../../../constants/globalConstants";
import { fields, initialValues } from "../../../constants/login/forgetPassword";
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
import { validationSchema } from "../../../validations/login/forgetPassword";
import { CustomTextField, WithCondition } from "../../shared/index";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const role = state?.role;

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["forgetPassword"],
    mutationFn: (value) => {
      const apiPath =
        role === CODES?.SEVA_KENDRA
          ? API_PATHS?.FORGET_PASSWORD
          : API_PATHS?.FORGET_PASSWORD_DIVYANG;
      return postApiService(apiPath, getValidValues(value));
    },
    onSuccess: ({ data }) => {
      dispatchSnackbarSuccess(
        role === CODES?.SEVA_KENDRA ? VALID_SEVA_KENDRA : VALID_DIVYANG
      );
      navigate(ROUTE_PATHS?.RESET_PASSWORD, {
        state: { userId: data?.data?.id },
        replace: true,
      });
    },
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: validationSchema(role),
      onSubmit,
    });

  const handleKeyDown = (e) => {
    if (e?.keyCode === 13 || e?.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <LoginWrapper container>
      <LoginContainer>
        <Grid container gap={2}>
          <Grid item xs={12} sx={{ display: "flex", marginBottom: "24px" }}>
            <BackIcon
              disableFocusRipple
              disableRipple
              onClick={() => navigate(ROUTE_PATHS?.LOGIN, { replace: true })}
            >
              <ArrowBack />
            </BackIcon>
            <LoginHeading>Forget Password</LoginHeading>
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label={fields?.userName?.label}
              name={fields?.userName?.name}
              value={values?.userName}
              errors={errors?.userName}
              touched={touched?.userName}
              onBlur={handleBlur}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </Grid>

          <WithCondition isValid={role === CODES?.SEVA_KENDRA}>
            <Grid item xs={12}>
              <CustomTextField
                label={fields?.contactNumber?.label}
                name={fields?.contactNumber?.name}
                maxLength={fields?.contactNumber?.maxLength}
                type={fields?.contactNumber?.type}
                value={values?.contactNumber}
                errors={errors?.contactNumber}
                touched={touched?.contactNumber}
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </Grid>
          </WithCondition>

          <WithCondition isValid={role === CODES?.DIVYANG}>
            <Grid item xs={12}>
              <CustomTextField
                label={fields?.UDIDCardNumber?.label}
                name={fields?.UDIDCardNumber?.name}
                value={values?.UDIDCardNumber}
                errors={errors?.UDIDCardNumber}
                touched={touched?.UDIDCardNumber}
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </Grid>
          </WithCondition>

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

export default ForgetPassword;
