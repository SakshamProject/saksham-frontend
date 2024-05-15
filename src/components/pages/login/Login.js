import { ArrowBack } from "@mui/icons-material";
import { Box, Grid, styled } from "@mui/material";
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
import { fields, initialValues } from "../../../constants/login/login";
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
  const [role, setRole] = useState(CODES?.DIVYANG);
  const localRemember = getLocalStorageItem(LOCAL_STORAGE_KEYS?.REMEMBER);
  const remember = localRemember ? objectDecryption(localRemember) : null;

  const RoleButton = styled(CancelButton)(({ theme, roletype }) => ({
    width: "100%",
    marginRight: "0 !important",
    margin: roletype === CODES?.DIVYANG ? "0 8px 0 0" : "0 0 0 16px",
    ...(((role === CODES?.DIVYANG && roletype === CODES?.DIVYANG) ||
      (role === CODES?.SEVA_KENDRA && roletype === CODES?.SEVA_KENDRA)) && {
      backgroundColor: theme.palette?.primary?.main,
      color: theme.palette?.primary?.contrastText,
      ":hover": {
        backgroundColor: theme.palette?.primary?.main,
        color: theme.palette?.primary?.contrastText,
      },
    }),
  }));

  const setRememberMe = (value) => {
    if (value?.rememberMe) {
      const encryptedValue = objectEncryption({ ...value, role });
      setLocalStorageItem(LOCAL_STORAGE_KEYS?.REMEMBER, encryptedValue);
    } else {
      removeLocalStorageItem(LOCAL_STORAGE_KEYS?.REMEMBER);
    }
  };

  const getTitle = () => {
    if (role === CODES?.ADMIN) return "Admin Login";
    return role === CODES?.SEVA_KENDRA ? "Seva Kendra Login" : "Divyang Login";
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

  const setUserInfo = (data) => {
    let userInfo = {};

    if (data?.user) {
      let serviceMapping = false;
      const designations = data?.user?.designation?.features?.map((item) => {
        const { feature } = item;
        if (feature?.name === CODES?.SERVICE_MAPPING) {
          serviceMapping = true;
        }
        return { ...feature };
      });
      userInfo = {
        userId: data?.user?.id,
        serviceMapping,
        role: CODES?.SEVA_KENDRA,
        name: data?.user?.person?.userName,
        designation: {
          id: data?.user?.designation?.id,
          name: data?.user?.designation?.name,
          designations,
        },
        person: {
          id: data?.user?.person?.id,
          name: data?.user?.person?.userName,
        },
      };
    } else if (data?.divyang) {
      userInfo = {
        userId: data?.divyang?.id,
        role: CODES?.DIVYANG,
        name: data?.divyang?.person?.userName,
        designation: {
          name: CODES?.DIVYANG,
        },
        person: {
          id: data?.divyang?.person?.id,
          name: data?.divyang?.person?.userName,
        },
      };
    } else {
      userInfo = {
        name: data?.superAdmin,
        role: CODES?.ADMIN,
        designation: {
          name: CODES?.ADMIN,
        },
      };
    }
    dispatchUserInfo(userInfo);
    setCookie(COOKIE_KEYS?.TOKEN, data?.token);
    setCookie(COOKIE_KEYS?.USER_INFO, objectEncryption(userInfo));
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["userLogin"],
    mutationFn: (value) => {
      let apiPath = "";
      if (role === CODES?.ADMIN) {
        apiPath = API_PATHS?.LOGIN_ADMIN;
      } else if (role === CODES?.SEVA_KENDRA) {
        apiPath = API_PATHS?.LOGIN;
      } else {
        apiPath = API_PATHS?.LOGIN_DIVYANG;
      }
      return postApiService(apiPath, getValidValues(value));
    },
    onSuccess: ({ data }, value) => {
      setRememberMe(value);
      setUserInfo(data);
      navigate(ROUTE_PATHS?.LAYOUT);
      dispatchSnackbarSuccess(LOGIN_SUCCESS);
    },
    onError: ({ response }) => {
      if (response?.data?.error?.message && role !== CODES?.ADMIN) {
        dispatchSnackbarError(
          `${role === CODES?.SEVA_KENDRA ? "Seva Kendra" : "Divyang"} ${
            response?.data?.error?.message
          }`
        );
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
    if (remember?.rememberMe) {
      const { role, ...value } = remember;
      setValues({ ...value });
      setRole(role);
    }
  }, []); //eslint-disable-line

  return (
    <LoginWrapper container>
      <LoginContainer>
        <Grid container gap={2}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              marginBottom: role === CODES?.ADMIN ? "24px" : 0,
            }}
          >
            <WithCondition isValid={role === CODES?.ADMIN}>
              <BackIcon
                disableFocusRipple
                disableRipple
                onClick={() => handleRole(CODES?.DIVYANG)}
              >
                <ArrowBack />
              </BackIcon>
            </WithCondition>

            <LoginHeading>{getTitle()}</LoginHeading>
          </Grid>

          <WithCondition isValid={role !== CODES?.ADMIN}>
            <StyledButtonContainer
              sx={{
                margin: "16px 0",
                justifyContent: "space-between",
              }}
            >
              <RoleButton
                onClick={() => handleRole(CODES?.DIVYANG)}
                roletype={CODES?.DIVYANG}
              >
                Divyang
              </RoleButton>
              <RoleButton
                onClick={() => handleRole(CODES?.SEVA_KENDRA)}
                roletype={CODES?.SEVA_KENDRA}
              >
                {"Seva\xa0Kendra"}
              </RoleButton>
            </StyledButtonContainer>
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
                label={fields?.rememberMe?.label}
                name={fields?.rememberMe?.name}
                checked={values?.rememberMe}
                onChange={() =>
                  setFieldValue(fields?.rememberMe?.name, !values?.rememberMe)
                }
              />
            </Box>

            <WithCondition isValid={role !== CODES?.ADMIN}>
              <ForgetPassword
                onClick={() =>
                  navigate(ROUTE_PATHS?.FORGOT_PASSWORD, {
                    state: { role },
                    replace: true,
                  })
                }
              >
                Forget Password
              </ForgetPassword>
            </WithCondition>
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

          <WithCondition isValid={role !== CODES?.ADMIN}>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <ForgetPassword
                onClick={() => {
                  if (role === CODES?.DIVYANG) {
                    navigate(ROUTE_PATHS?.SIGNUP);
                  }
                  if (role === CODES?.SEVA_KENDRA) {
                    handleRole(CODES?.ADMIN);
                  }
                }}
              >
                {role === CODES?.SEVA_KENDRA
                  ? "Admin login"
                  : "Click here to register"}
              </ForgetPassword>
            </Grid>
          </WithCondition>
        </Grid>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Login;
