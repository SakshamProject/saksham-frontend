import { Box, Grid, styled } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import {
  LOCAL_STORAGE_KEYS,
  LOGIN_SUCCESS,
} from "../../../constants/globalConstants";
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
import { setCookie } from "../../../utils/cookie";
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess,
  dispatchUserInfo,
} from "../../../utils/dispatch";
import {
  objectDecryption,
  objectEncryption,
} from "../../../utils/encryptionAndDecryption";
import {
  getLocalStorageItem,
  removeLocalStorage,
  setLocalStorageItem,
} from "../../../utils/localStorage";
import { validationSchema } from "../../../validations/login/login";
import {
  CustomCheckBox,
  CustomPasswordField,
  CustomTextField,
  WithCondition,
} from "../../shared/index";

const Login = () => {
  const navigate = useNavigate();
  const [roleStatus, setRoleStatus] = useState(false);

  const localStoreValue = objectDecryption(
    getLocalStorageItem(LOCAL_STORAGE_KEYS.REMEMBER)
  );

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["login"],
    mutationFn: (value) => {
      const apiPath = roleStatus ? API_PATHS?.LOGIN : API_PATHS?.LOGIN_DIVYANG;
      const { rememberMe, ...payload } = value;
      return postApiService(apiPath, getValidValues(payload));
    },
    onSuccess: ({ data }, value) => {
      console.log("login data", { data });
      if (value?.rememberMe)
        setLocalStorageItem(
          LOCAL_STORAGE_KEYS.REMEMBER,
          objectEncryption({ ...value, roleStatus })
        );
      else removeLocalStorage();
      setCookie("token", data?.token);
      dispatchUserInfo(data?.user);
      dispatchSnackbarSuccess(LOGIN_SUCCESS);
      navigate(ROUTE_PATHS?.DASHBOARD);
    },
    onError: ({ response }) => {
      if (response?.data?.error?.message)
        dispatchSnackbarError(
          `${roleStatus ? "User" : "Divyang"} ${response?.data?.error?.message}`
        );
    },
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
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const RoleButton = styled(CancelButton)(({ theme, roletype }) => ({
    width: "100%",
    marginRight: "0 !important",
    margin: roletype === "divyang" ? "0 8px 0 0" : "0 0 0 16px",
    ...(((!roleStatus && roletype === "divyang") ||
      (roleStatus && roletype === "user")) && {
      backgroundColor: theme.palette?.primary?.main,
      color: theme.palette?.primary?.contrastText,
      ":hover": {
        backgroundColor: theme.palette?.primary?.main,
        color: theme.palette?.primary?.contrastText,
      },
    }),
  }));

  const roleHandleClick = (status) => {
    handleReset();
    setRoleStatus(status);
    if (status === localStoreValue?.roleStatus && localStoreValue?.rememberMe) {
      const { roleStatus, ...value } = localStoreValue;
      setValues({ ...value });
    }
  };
  useEffect(() => {
    if (localStoreValue?.rememberMe) {
      const { roleStatus, ...value } = localStoreValue;
      setRoleStatus(roleStatus);
      setValues({ ...value });
    }
  }, []); //eslint-disable-line

  return (
    <Box>
      <LoginWrapper container>
        <LoginContainer>
          <Grid container gap={2}>
            <Grid item xs={12}>
              <LoginHeading>
                {roleStatus ? "User Login" : "Divyang Login"}
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
                  if (e?.keyCode === 13 || e?.key === "Enter") handleSubmit();
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
                  if (e?.keyCode === 13 || e?.key === "Enter") handleSubmit();
                }}
              />
            </Grid>

            <StyledButtonContainer
              sx={{
                marginTop: "-14px",
                justifyContent: "space-between",
                flexWrap: "wrap",
                rowGap: 1,
              }}
            >
              <Box>
                <CustomCheckBox
                  label="Remember me"
                  name="rememberMe"
                  checked={values?.rememberMe}
                  onChange={() =>
                    setFieldValue("rememberMe", !values?.rememberMe)
                  }
                />
              </Box>

              <ForgetPassword
                onClick={() =>
                  navigate(ROUTE_PATHS?.FORGOT_PASSWORD, {
                    state: { roleStatus },
                  })
                }
              >
                Forget Password
              </ForgetPassword>
            </StyledButtonContainer>

            <Grid item xs={12} sx={{ margin: "16px 0", textAlign: "center" }}>
              <SubmitButton
                onClick={handleSubmit}
                sx={{
                  borderRadius: "18px",
                  width: "50%",
                }}
              >
                Login
              </SubmitButton>
            </Grid>

            <WithCondition isValid={!roleStatus}>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <ForgetPassword onClick={() => navigate(ROUTE_PATHS?.SIGNUP)}>
                  Click here to register
                </ForgetPassword>
              </Grid>
            </WithCondition>
          </Grid>
        </LoginContainer>
      </LoginWrapper>
    </Box>
  );
};

export default Login;
