import { ArrowBack } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postApiService } from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import {
  CODES,
  COOKIE_KEYS,
  LOCAL_STORAGE_KEYS,
  LOGIN_SUCCESS,
} from "../../../constants/globalConstants";
import {
  fields,
  getUserInfo,
  initialValues,
} from "../../../constants/login/login";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import {
  ForgetPassword,
  LoginButton,
  LoginButtonContainer,
  LoginContainer,
  LoginHeading,
  LoginWrapper,
  RememberMeContainer,
  RoleButton,
  RoleButtonContainer,
  TitleContainer,
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
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../../../utils/localStorage";
import { validationSchema } from "../../../validations/login/login";
import CustomTooltip from "../../shared/CustomTooltip";
import {
  CustomCheckBox,
  CustomPasswordField,
  CustomTextField,
  WithCondition,
} from "../../shared/index";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(CODES?.DIVYANG);
  const localRemember = getLocalStorageItem(LOCAL_STORAGE_KEYS?.REMEMBER);
  const remember = localRemember ? objectDecryption(localRemember) : null;

  const setRememberMe = (value) => {
    if (value?.rememberMe) {
      const encryptedValue = objectEncryption({ ...value, role });
      setLocalStorageItem(LOCAL_STORAGE_KEYS?.REMEMBER, encryptedValue);
    } else {
      removeLocalStorageItem(LOCAL_STORAGE_KEYS?.REMEMBER);
    }
  };

  const getTitle = () => {
    if (role === CODES?.ADMIN) {
      return "Admin Login";
    }
    if (role === CODES?.SEVA_KENDRA) {
      return "Seva Kendra Login";
    }
    return "Divyang Login";
  };

  const handleKeyDown = (e) => {
    if (e?.keyCode === 13 || e?.key === "Enter") {
      handleSubmit();
    }
  };

  const handleRole = (role) => {
    handleReset();
    setRole(role);
    if (role === remember?.role && remember?.rememberMe) {
      const { role, ...value } = remember;
      setValues(value);
    }
  };

  const handleForgetPassword = () => {
    navigate(ROUTE_PATHS?.FORGOT_PASSWORD, {
      state: { role },
      replace: true,
    });
  };

  const handleLink = () => {
    if (role === CODES?.DIVYANG) {
      navigate(ROUTE_PATHS?.SIGNUP);
    }
    if (role === CODES?.SEVA_KENDRA) {
      handleRole(CODES?.ADMIN);
    }
  };

  const getApiPath = () => {
    if (role === CODES?.ADMIN) {
      return API_PATHS?.LOGIN_ADMIN;
    }
    if (role === CODES?.SEVA_KENDRA) {
      return API_PATHS?.LOGIN;
    }
    return API_PATHS?.LOGIN_DIVYANG;
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["user login"],
    mutationFn: (value) => {
      const apiPath = getApiPath();
      const payload = getValidValues(value);
      return postApiService(apiPath, payload);
    },
    onSuccess: ({ data }, value) => {
      const userInfo = getUserInfo(data);
      dispatchUserInfo(userInfo);
      setCookie(COOKIE_KEYS?.TOKEN, data?.token);
      setCookie(COOKIE_KEYS?.USER_INFO, objectEncryption(userInfo));
      setRememberMe(value);
      dispatchSnackbarSuccess(LOGIN_SUCCESS);
      navigate(ROUTE_PATHS?.LAYOUT);
    },
    onError: ({ response }) => {
      if (role !== CODES?.ADMIN) {
        const errorMessage =
          (role === CODES?.SEVA_KENDRA ? "Seva Kendra " : "Divyang ") +
          response?.data?.error?.message;
        dispatchSnackbarError(errorMessage);
      }
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

  useEffect(() => {
    if (remember?.rememberMe && remember?.role === role) {
      const { role, ...remaining } = remember;
      setValues({ ...remaining });
    }
  }, []); //eslint-disable-line

  return (
    <LoginWrapper container>
      <LoginContainer>
        <Grid container gap={2}>
          <TitleContainer item xs={12} role={role}>
            <WithCondition isValid={role === CODES?.ADMIN}>
              <CustomTooltip title={"Back"}>
                <BackIcon
                  disableFocusRipple
                  disableRipple
                  onClick={() => handleRole(CODES?.DIVYANG)}
                >
                  <ArrowBack />
                </BackIcon>
              </CustomTooltip>
            </WithCondition>

            <LoginHeading>{getTitle()}</LoginHeading>
          </TitleContainer>

          <WithCondition isValid={role !== CODES?.ADMIN}>
            <RoleButtonContainer>
              <RoleButton
                onClick={() => handleRole(CODES?.DIVYANG)}
                roletype={CODES?.DIVYANG}
                role={role}
              >
                {"Divyang User"}
              </RoleButton>
              <RoleButton
                onClick={() => handleRole(CODES?.SEVA_KENDRA)}
                roletype={CODES?.SEVA_KENDRA}
                role={role}
              >
                {"Seva Kendra User"}
              </RoleButton>
            </RoleButtonContainer>
          </WithCondition>

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

          <Grid item xs={12}>
            <CustomPasswordField
              showEyeIcon
              label={fields?.password?.label}
              name={fields?.password?.name}
              value={values?.password}
              errors={errors?.password}
              touched={touched?.password}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </Grid>

          <RememberMeContainer>
            <Box>
              <CustomCheckBox
                label={fields?.rememberMe?.label}
                name={fields?.rememberMe?.name}
                checked={values?.rememberMe}
                onChange={() =>
                  setFieldValue(fields?.rememberMe?.name, !values?.rememberMe)
                }
              />
            </Box>

            <WithCondition isValid={role !== CODES?.ADMIN}>
              <ForgetPassword onClick={handleForgetPassword}>
                Forget Password
              </ForgetPassword>
            </WithCondition>
          </RememberMeContainer>

          <LoginButtonContainer item xs={12}>
            <LoginButton onClick={handleSubmit}>Login</LoginButton>
          </LoginButtonContainer>

          <WithCondition isValid={role !== CODES?.ADMIN}>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <ForgetPassword onClick={handleLink}>
                {role === CODES?.SEVA_KENDRA
                  ? "Admin Login"
                  : "Click Here to Register"}
              </ForgetPassword>
            </Grid>
          </WithCondition>
        </Grid>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Login;
