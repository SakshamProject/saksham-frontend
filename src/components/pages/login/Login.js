import { Box, Grid, styled } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { initialValues } from "../../../constants/login/login";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import {
  CancelButton,
  StyledButtonContainer,
  SubmitButton,
} from "../../../styles/buttonStyle";
import {
  ForgetPassword,
  LoginContainer,
  LoginHeading,
  LoginWrapper,
} from "../../../styles/login";
import { getValidValues } from "../../../utils/common";
import { validationSchema } from "../../../validations/login/login";
import {
  CustomCheckBox,
  CustomPasswordField,
  CustomTextField,
} from "../../shared/index";

const Login = () => {
  const navigate = useNavigate();
  const [roleStatus, setRoleStatus] = useState(false);

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["login"],
    mutationFn: (value) => {
      const apiPath = roleStatus ? API_PATHS.LOGIN : API_PATHS.LOGIN_DIVYANG;
      const { rememberMe, ...payload } = value;
      return postApiService(apiPath, getValidValues(payload));
    },
    onSuccess: ({ data }) => {},
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    handleReset,
  } = formik;

  const handleForgetPassword = () => {
    navigate(ROUTE_PATHS.RESET_PASSWORD);
  };

  const RoleButton = styled(CancelButton)(({ theme, roletype }) => ({
    width: "100%",
    marginRight: "0 !important",
    margin: roletype === "divyang" ? "0 8px 0 0" : "0 0 0 16px",
    ...((!roleStatus && roletype === "divyang") ||
    (roleStatus && roletype === "user")
      ? {
          backgroundColor: theme.palette?.primary?.main,
          color: theme.palette?.primary?.contrastText,
          ":hover": {
            backgroundColor: theme.palette?.primary?.main,
            color: theme.palette?.primary?.contrastText,
          },
        }
      : {}),
  }));

  const roleHandleClick = (status) => {
    handleReset();
    setRoleStatus(status);
  };

  return (
    <Box>
      <LoginWrapper container>
        <LoginContainer>
          <Grid container gap={2}>
            <Grid item xs={12}>
              <LoginHeading sx={{ fontSize: "28px" }}>
                {roleStatus ? "User" : "Divyang"} Login
              </LoginHeading>
            </Grid>

            <StyledButtonContainer
              sx={{
                margin: "16px 0",
                justifyContent: "space-between",
              }}
            >
              <RoleButton
                onClick={() => roleHandleClick(false)}
                roletype="divyang"
              >
                Divyang
              </RoleButton>
              <RoleButton onClick={() => roleHandleClick(true)} roletype="user">
                User
              </RoleButton>
            </StyledButtonContainer>

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
                  if (e?.keyCode === 13 || e?.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomPasswordField
                showEyeIcon
                label="Password"
                name="password"
                value={values?.password}
                errors={errors?.password}
                touched={touched?.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  if (e?.keyCode === 13 || e?.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </Grid>

            <StyledButtonContainer
              sx={{
                marginTop: "-14px",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <CustomCheckBox
                  label="Remember me"
                  name="rememberMe"
                  checked={values?.rememberMe}
                  onChange={() => {
                    setFieldValue("rememberMe", !values?.rememberMe);
                  }}
                />
              </Box>

              <ForgetPassword onClick={handleForgetPassword}>
                Forget Password
              </ForgetPassword>
            </StyledButtonContainer>

            <Grid item xs={12}>
              <StyledButtonContainer sx={{ justifyContent: "center" }}>
                <SubmitButton
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ padding: "6px 24px !important" }}
                >
                  Submit
                </SubmitButton>
              </StyledButtonContainer>
            </Grid>
          </Grid>
        </LoginContainer>
      </LoginWrapper>
    </Box>
  );
};

export default Login;
