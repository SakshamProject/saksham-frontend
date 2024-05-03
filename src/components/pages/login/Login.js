import { Box, Grid, styled, useMediaQuery } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { LOCAL_STORAGE_KEYS } from "../../../constants/globalConstants";
import { initialValues } from "../../../constants/login/login";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { theme } from "../../../styles";
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
  dispatchSnackbarSuccess,
  dispatchUserInfo,
} from "../../../utils/dispatch";
import {
  objectDecryption,
  objectEncryption,
} from "../../../utils/encryptionAndDecryption";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
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
  const isMobile = useMediaQuery(theme?.breakpoints?.down("sm"));

  const localStoreValue = objectDecryption(
    getLocalStorageItem(LOCAL_STORAGE_KEYS?.REMEMBER)
  );

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["login"],
    mutationFn: (value) => {
      const apiPath = roleStatus ? API_PATHS.LOGIN : API_PATHS.LOGIN_DIVYANG;
      const { rememberMe, ...payload } = value;
      return postApiService(apiPath, getValidValues(payload));
    },
    onSuccess: ({ data }, value) => {
      if (value?.rememberMe) {
        setLocalStorageItem(
          LOCAL_STORAGE_KEYS.REMEMBER,
          objectEncryption({ ...value, roleStatus })
        );
      } else {
        removeLocalStorageItem(LOCAL_STORAGE_KEYS.REMEMBER);
      }
      setCookie("token", data?.token);
      dispatchUserInfo(data?.user);
      dispatchSnackbarSuccess(data?.message);
      navigate(ROUTE_PATHS.DASHBOARD);
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

  const roleHandleClick = useCallback(
    (status) => {
      handleReset();
      setRoleStatus(status);
      if (
        status === localStoreValue?.roleStatus &&
        localStoreValue?.rememberMe
      ) {
        const { roleStatus, ...value } = localStoreValue;
        setValues({ ...value });
      }
    },
    [handleReset, localStoreValue, setValues]
  );

  const getLoginTitle = () => {
    if (isMobile) return "Login";
    return roleStatus ? "User Login" : "Divyang Login";
  };

  useEffect(() => {
    if (localStoreValue?.rememberMe) {
      const { roleStatus, ...value } = localStoreValue;
      setRoleStatus(roleStatus);
      setValues({ ...value });
    }
  }, []); //eslint-disable-line

  useEffect(() => {
    if (isMobile) {
      roleHandleClick(false);
    }
  }, [isMobile, roleHandleClick]);

  return (
    <Box>
      <LoginWrapper container>
        <LoginContainer>
          <Grid container gap={2}>
            <Grid item xs={12}>
              <LoginHeading>{getLoginTitle()}</LoginHeading>
            </Grid>

            <WithCondition isValid={!isMobile}>
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
                <RoleButton
                  onClick={() => roleHandleClick(true)}
                  roletype="user"
                >
                  User
                </RoleButton>
              </StyledButtonContainer>
            </WithCondition>

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

              <ForgetPassword
                onClick={() => navigate(ROUTE_PATHS.RESET_PASSWORD)}
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
                <ForgetPassword onClick={() => navigate(ROUTE_PATHS.SIGNUP)}>
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
