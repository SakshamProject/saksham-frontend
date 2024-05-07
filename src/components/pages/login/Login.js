import { ArrowBack } from "@mui/icons-material";
import { Box, Grid, styled } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import {
  CODES,
  COOKIE_KEYS,
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
import { BackIcon } from "../../../styles/signup";
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
  const { pathname } = useLocation();
  const [roleStatus, setRoleStatus] = useState(false);
  const isAdmin = pathname === ROUTE_PATHS?.LOGIN_ADMIN;
  const localStoreValue = objectDecryption(
    getLocalStorageItem(LOCAL_STORAGE_KEYS?.REMEMBER)
  );

  const setRememberMe = (value) => {
    if (value?.rememberMe)
      setLocalStorageItem(
        LOCAL_STORAGE_KEYS?.REMEMBER,
        objectEncryption({ ...value, roleStatus })
      );
    else removeLocalStorage();
  };

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

  const getTitle = () => {
    if (isAdmin) return "Admin Login";
    return roleStatus ? "User Login" : "Divyang Login";
  };

  const handleKeyDown = (e) => {
    if (e?.keyCode === 13 || e?.key === "Enter") handleSubmit();
  };

  const handleRole = (status) => {
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
      setValues({ ...value });
      setRoleStatus(roleStatus);
    }
  }, []); //eslint-disable-line

  const roleBasedNavigation = (data) => {
    let routePath = ROUTE_PATHS?.DASHBOARD;
    if (data?.divyang) routePath = ROUTE_PATHS?.DIVYANG_PROFILE;
    navigate(routePath);
  };

  const setUserInfo = (data) => {
    let userInfo = {};

    if (data?.divyang) {
      userInfo = {
        name: `${data?.divyang?.firstName} ${data?.divyang?.lastName}`,
        id: data?.divyang?.id,
        role: CODES?.DIVYANG,
        person: {
          id: data?.divyang?.person?.id,
          userName: data?.divyang?.person?.userName,
        },
      };
    } else if (data?.superAdmin) {
      userInfo = {
        name: data?.superAdmin,
        role: CODES?.ADMIN,
      };
    }
    dispatchUserInfo(userInfo);
    setCookie(COOKIE_KEYS?.USER_INFO, objectEncryption(userInfo));
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["userLogin"],
    mutationFn: (value) => {
      let apiPath = "";
      if (isAdmin) apiPath = API_PATHS?.LOGIN_ADMIN;
      else apiPath = roleStatus ? API_PATHS?.LOGIN : API_PATHS?.LOGIN_DIVYANG;
      const { rememberMe, ...payload } = value;
      return postApiService(apiPath, getValidValues(payload));
    },
    onSuccess: ({ data }, value) => {
      setRememberMe(value);
      roleBasedNavigation(data);
      setUserInfo(data);
      setCookie(COOKIE_KEYS?.TOKEN, data?.token);
      dispatchSnackbarSuccess(LOGIN_SUCCESS);
    },
    onError: ({ response }) => {
      if (response?.data?.error?.message)
        dispatchSnackbarError(
          `${roleStatus && !isAdmin ? "Seva Kendra" : "Divyang"} ${
            response?.data?.error?.message
          }`
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

  return (
    <Box>
      <LoginWrapper container>
        <LoginContainer>
          <Grid container gap={2}>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <WithCondition isValid={isAdmin}>
                <BackIcon
                  disableFocusRipple
                  disableRipple
                  onClick={() => navigate(ROUTE_PATHS?.LOGIN)}
                >
                  <ArrowBack />
                </BackIcon>
              </WithCondition>

              <LoginHeading>{getTitle()}</LoginHeading>
            </Grid>

            <WithCondition isValid={!isAdmin}>
              <StyledButtonContainer
                sx={{
                  margin: "16px 0",
                  justifyContent: "space-between",
                }}
              >
                <RoleButton
                  onClick={() => handleRole(false)}
                  roletype="divyang"
                >
                  Divyang
                </RoleButton>
                <RoleButton onClick={() => handleRole(true)} roletype="user">
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
                onKeyDown={handleKeyDown}
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
                onKeyDown={handleKeyDown}
              />
            </Grid>

            <WithCondition isValid={!isAdmin}>
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
            </WithCondition>

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

            <WithCondition isValid={!isAdmin}>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <ForgetPassword
                  onClick={() =>
                    navigate(
                      roleStatus
                        ? ROUTE_PATHS?.LOGIN_ADMIN
                        : ROUTE_PATHS?.SIGNUP
                    )
                  }
                >
                  {roleStatus ? "Admin login" : "Click here to register"}
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
