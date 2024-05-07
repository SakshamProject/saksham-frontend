import { Box, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { postApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { initialValues } from "../../../constants/login/forgetPassword";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { SubmitButton } from "../../../styles/buttonStyle";
import {
  LoginContainer,
  LoginHeading,
  LoginWrapper,
} from "../../../styles/login";
import { getValidValues } from "../../../utils/common";
import { dispatchSnackbarSuccess } from "../../../utils/dispatch";
import { validationSchema } from "../../../validations/login/forgetPassword";
import { CustomTextField, WithCondition } from "../../shared/index";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const roleStatus = state?.roleStatus;

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["forgetPassword"],
    mutationFn: (value) => {
      const apiPath = roleStatus
        ? API_PATHS?.FORGET_PASSWORD
        : API_PATHS?.FORGET_PASSWORD_DIVYANG;
      return postApiService(apiPath, getValidValues(value));
    },
    onSuccess: () => {
      dispatchSnackbarSuccess("Valid user");

      navigate(ROUTE_PATHS?.RESET_PASSWORD);
    },
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <Box>
      <LoginWrapper container>
        <LoginContainer>
          <Grid container gap={2}>
            <Grid item xs={12}>
              <LoginHeading>Forget Password</LoginHeading>
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label="User Name"
                name="userName"
                value={values?.userName}
                errors={errors?.userName}
                touched={touched?.userName}
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e?.keyCode === 13 || e?.key === "Enter") handleSubmit();
                }}
              />
            </Grid>

            <WithCondition isValid={roleStatus}>
              <Grid item xs={12}>
                <CustomTextField
                  label="Contact Number"
                  name="contactNumber"
                  fieldType="mobile"
                  maxLength={10}
                  value={values?.contactNumber}
                  errors={errors?.contactNumber}
                  touched={touched?.contactNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e?.keyCode === 13 || e?.key === "Enter") handleSubmit();
                  }}
                />
              </Grid>
            </WithCondition>

            <WithCondition isValid={!roleStatus}>
              <Grid item xs={12}>
                <CustomTextField
                  label="UDID Number"
                  name="UDIDCardNumber"
                  value={values?.UDIDCardNumber}
                  errors={errors?.UDIDCardNumber}
                  touched={touched?.UDIDCardNumber}
                  fieldType="alphaNumeric"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e?.keyCode === 13 || e?.key === "Enter") handleSubmit();
                  }}
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
    </Box>
  );
};

export default ForgetPassword;
