import { Box, Grid, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getApiService,
  getByIdApiService,
  postApiService,
  updateApiService,
} from "../../../api/api";
import { API_PATHS } from "../../../api/apiPaths";
import { appApi } from "../../../api/config";
import user from "../../../assets/profile.png";
import {
  CODES,
  divyangDetailsColumn,
} from "../../../constants/globalConstants";
import {
  editInitialValues,
  formFields,
  initialValues,
} from "../../../constants/serviceMapping/serviceMapping";
import useResponsive from "../../../hooks/useResponsive";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { CustomTypography, theme } from "../../../styles";
import { formatDate, getValidValues } from "../../../utils/common";
import {
  dispatchResponseAction,
  dispatchSnackbarError,
} from "../../../utils/dispatch";
import {
  editValidationSchema,
  validationSchema,
} from "../../../validations/serviceMapping/serviceMapping";
import {
  CustomCheckBox,
  CustomDatePicker,
  CustomRadioButton,
  CustomTextField,
  DividerLine,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
  WithCondition,
} from "../../shared";

const Form = () => {
  const { state } = useLocation();
  const isViewMode = state?.viewDetails;
  const editId = state?.editId;
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const [divyangId, setDivayangId] = useState("");

  const handleOnSubmit = (value) => {
    if (!editId) {
      if (!divyangId) {
        dispatchSnackbarError("Please Select Divyang Id");
        return;
      }
      const payload = getValidValues({
        ...value,
        divyangId,
        isNonSevaKendraFollowUpRequired:
          value.isNonSevaKendraFollowUpRequired === CODES?.YES,
        dateOfService: formatDate({
          date: value?.dateOfService,
          format: "iso",
        }),
        dueDate: formatDate({
          date: value?.dueDate,
          format: "iso",
        }),
        ...(value.isNonSevaKendraFollowUpRequired === CODES?.YES
          ? {
              nonSevaKendraFollowUp: getValidValues({
                ...value.nonSevaKendraFollowUp,
                sendMail:
                  values?.nonSevaKendraFollowUp?.sendMail === CODES?.YES,
              }),
            }
          : { nonSevaKendraFollowUp: "" }),
      });
      onSubmit(payload);
    } else {
      if (
        !(
          Object.keys(getValidValues(value?.donor)).length === 0 ||
          Object.keys(getValidValues(value?.donor)).length === 3
        )
      ) {
        dispatchSnackbarError("Please Fill Donor Details Fully If Hav one");
      } else if (
        !(
          Object.keys(getValidValues(value?.nonSevaKendraFollowUp)).length ===
            1 ||
          Object.keys(getValidValues(value?.nonSevaKendraFollowUp)).length === 4
        )
      ) {
        dispatchSnackbarError("Please Fill Follow up Details Fully If Hav one");
      } else if (
        Object.keys(getValidValues(value?.nonSevaKendraFollowUp)).length < 4 &&
        value?.isFollowUpRequired === CODES?.NO &&
        values?.isCompleted !== CODES?.YES
      ) {
        dispatchSnackbarError("Please Fill any Follow up Details");
      } else {
        const payload = getValidValues({
          ...value,
          isCompleted:
            value?.isCompleted === CODES?.YES ? "COMPLETED" : "PENDING",
          completedDate: formatDate({
            date: value.completedDate,
            format: "iso",
          }),
          isNonSevaKendraFollowUpRequired:
            Object.keys(getValidValues(value?.nonSevaKendraFollowUp)).length >
            1,
          followUp: {
            followUpdate: formatDate({
              date: value?.followUp?.followUpdate,
              format: "iso",
            }),
            userId: value?.followUp?.userId,
          },
          ...(!!value?.nonSevaKendraFollowUp?.name
            ? {
                nonSevaKendraFollowUp: getValidValues({
                  ...value.nonSevaKendraFollowUp,
                  sendMail:
                    values?.nonSevaKendraFollowUp?.sendMail === CODES?.YES,
                }),
              }
            : { nonSevaKendraFollowUp: "" }),
        });
        onSubmit(payload);
      }
    }
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["createAndUpdate"],
    mutationFn: (data) =>
      editId
        ? updateApiService(API_PATHS?.SERVICE_MAPPING, editId, data)
        : postApiService(API_PATHS?.SERVICE_MAPPING, data),
    onSuccess: () => {
      dispatchResponseAction(
        "Service Mapping",
        editId ? CODES?.UPDATED : CODES?.ADDED
      );
      navigate(ROUTE_PATHS?.SERVICE_MAPPING_LIST);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    setValues,
    handleSubmit,
    setTouched,
  } = useFormik({
    initialValues: !editId ? initialValues : editInitialValues,
    onSubmit: () => handleOnSubmit(values),
    validationSchema: !editId ? validationSchema : editValidationSchema,
  });

  const handleOnReset = () => navigate(ROUTE_PATHS?.SERVICE_MAPPING_LIST);

  const { data: allStates } = useQuery({
    queryKey: ["getAllStates"],
    queryFn: () => getApiService(API_PATHS?.STATES),
    select: ({ data }) => data?.data,
  });

  const { data: allDistricts } = useQuery({
    queryKey: [
      "getAllDistrictByState",
      values?.stateId,
      values?.followUp?.stateId,
    ],
    queryFn: () =>
      getByIdApiService(
        API_PATHS?.STATES,
        values?.stateId || values?.followUp?.stateId
      ),
    select: ({ data }) => data?.data?.districts,
    enabled: !!values?.stateId || !!values?.followUp?.stateId,
  });

  const { data: allSevaKendras } = useQuery({
    queryKey: [
      "getSevaKendraNameByDistrict",
      values?.districtId,
      values?.followUp?.districtId,
    ],
    queryFn: () =>
      getByIdApiService(
        API_PATHS?.DISTRICTS,
        `${values?.districtId || values?.followUp?.districtId}${
          API_PATHS?.SEVAKENDRA
        }`,
        { status: CODES?.ACTIVE }
      ),
    select: ({ data }) => data?.data,
    enabled: !!values?.districtId || !!values?.followUp?.districtId,
  });

  const { data: allSevaKendraUsers } = useQuery({
    queryKey: [
      "getSevaKendraUserBySevaKendraName",
      values?.sevaKendraId,
      values?.followUp?.sevaKendraId,
    ],
    queryFn: () =>
      getByIdApiService(
        API_PATHS?.SEVAKENDRAS,
        `${values?.sevaKendraId || values?.followUp?.sevaKendraId}${
          API_PATHS?.USERS
        }`,
        { status: CODES?.ACTIVE }
      ),
    select: ({ data }) => data?.data?.map((item) => item?.user),
    enabled: !!values?.sevaKendraId || !!values?.followUp?.sevaKendraId,
  });

  const { data: allServiceType } = useQuery({
    queryKey: ["getAllServiceType"],
    queryFn: () => postApiService(API_PATHS?.SERVICES_LIST),
    select: ({ data }) => data?.data,
  });

  const { mutate, data } = useMutation({
    mutationKey: ["serviceMappingGetById"],
    mutationFn: () => getByIdApiService(API_PATHS?.SERVICE_MAPPING, editId),
    onSuccess: ({ data }) => {
      setValues({
        ...editInitialValues,
        isCompleted:
          data?.data?.isCompleted === "PENDING" ? CODES?.NO : CODES?.YES,
        isNonSevaKendraFollowUpRequired:
          data?.data?.isNonSevaKendraFollowUpRequired,
        completedDate: data?.data?.completedDate,
        howTheyGotService: data?.data?.howTheyGotService,
        reasonForNonCompletion: data?.data?.reasonForNonCompletion,
        donor: {
          ...data?.data?.donor,
        },
        isFollowUpRequired: !!data?.data?.nonSevaKendraFollowUp?.length
          ? CODES?.YES
          : CODES?.NO,
        nonSevaKendraFollowUp: {
          email: data?.data?.nonSevaKendraFollowUp?.[0]?.email,
          mobileNumber: data?.data?.nonSevaKendraFollowUp?.[0]?.mobileNumber,
          name: data?.data?.nonSevaKendraFollowUp?.[0]?.name,
          sendMail: data?.data?.nonSevaKendraFollowUp?.[0]?.sendMail
            ? CODES?.YES
            : CODES?.NO,
        },
      });
    },
  });

  useEffect(() => {
    if (editId) mutate();
  }, []);

  const { data: allService } = useQuery({
    queryKey: ["getAllService", values?.serviceTypeId],
    queryFn: () =>
      allServiceType?.find((item) => item?.id === values?.serviceTypeId),
    select: ({ service }) => service,
    enabled: !!values?.serviceTypeId,
  });

  const { mutate: getDivyang, data: searchedDivyang } = useMutation({
    mutationKey: ["getDivyang"],
    mutationFn: (payload) =>
      appApi.get(API_PATHS?.DIVYANG_DETAILS, { params: payload }),
  });


  const onKeyPress = (e, column) => {
    if (e?.target?.value?.trim() && (e?.key === "Enter" || e?.keyCode === 13))
      getDivyang({ column, value: e?.target?.value });
  };

  return (
    <FormWrapper
      title="Service Mapping"
      navigateTo={ROUTE_PATHS?.SERVICE_MAPPING_LIST}
    >
      <WithCondition isValid={!editId}>
        <Grid item xs={12}>
          <CustomTypography
            sx={{ marginBottom: 0, color: theme.palette?.commonColor?.black }}
          >
            Search Divyang
          </CustomTypography>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CustomTextField
            label={formFields?.searchDivyangId?.label}
            name={formFields?.searchDivyangId?.name}
            fieldType={formFields?.searchDivyangId?.fieldType}
            value={values?.searchDivyangId}
            errors={errors?.searchDivyangId}
            touched={touched?.searchDivyangId}
            onChange={handleChange}
            onBlur={handleBlur}
            isViewMode={isViewMode}
            onKeyPress={(e) => onKeyPress(e, "divyangId")}
            disabled={
              !!values?.searchAadharNo ||
              !!values?.searchMobileNo ||
              !!values?.searchUDIDNo
            }
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CustomTextField
            label={formFields?.searchMobileNo?.label}
            name={formFields?.searchMobileNo?.name}
            type={formFields?.searchMobileNo?.type}
            value={values?.searchMobileNo}
            errors={errors?.searchMobileNo}
            touched={touched?.searchMobileNo}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={10}
            isViewMode={isViewMode}
            onKeyPress={(e) => onKeyPress(e, "mobileNumber")}
            disabled={
              !!values?.searchAadharNo ||
              !!values?.searchDivyangId ||
              !!values?.searchUDIDNo
            }
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CustomTextField
            label={formFields?.searchAadharNo?.label}
            name={formFields?.searchAadharNo?.name}
            type={formFields?.searchAadharNo?.type}
            value={values?.searchAadharNo}
            errors={errors?.searchAadharNo}
            touched={touched?.searchAadharNo}
            onChange={handleChange}
            onBlur={handleBlur}
            isViewMode={isViewMode}
            onKeyPress={(e) => onKeyPress(e, "aadharCardNumber")}
            disabled={
              !!values?.searchDivyangId ||
              !!values?.searchMobile8054436456No ||
              !!values?.searchUDIDNo
            }
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CustomTextField
            label={formFields?.searchUDIDNo?.label}
            name={formFields?.searchUDIDNo?.name}
            fieldType={formFields?.searchUDIDNo?.fieldType}
            value={values?.searchUDIDNo}
            errors={errors?.searchUDIDNo}
            touched={touched?.searchUDIDNo}
            onChange={handleChange}
            onBlur={handleBlur}
            isViewMode={isViewMode}
            onKeyPress={(e) => onKeyPress(e, "udidCardNumber")}
            disabled={
              !!values?.searchDivyangId ||
              !!values?.searchMobileNo ||
              !!values?.searchAadharNo
            }
          />
        </Grid>
      </WithCondition>

      <WithCondition isValid={!!searchedDivyang?.data?.data}>
        <Grid container item xs={12} spacing={3} sx={{ marginBottom: "22px" }}>
          {searchedDivyang?.data?.data?.map((item, key) => (
            <Grid item xs={12} lg={6}>
              <DivyangCard
                divyangDetail={item}
                key={key + item?.id}
                divyangId={divyangId}
                setDivayangId={setDivayangId}
              />
            </Grid>
          ))}
        </Grid>
      </WithCondition>

      <WithCondition isValid={!!editId}>
        <Grid container item xs={12} gap={3} sx={{ marginBottom: "22px" }}>
          <DivyangCard divyangDetail={data?.data?.data?.divyang} />
        </Grid>
      </WithCondition>

      <Grid
        item
        xs={12}
        sx={{
          paddingTop: "0px !important",
        }}
      >
        <DividerLine />
      </Grid>

      <WithCondition isValid={!!editId}>
        <Grid
          item
          xs={12}
          sx={{
            paddingTop: "0px !important",
          }}
        >
          <CustomTypography
            color={theme?.palette?.commonColor?.grey}
            fontSize={isMobile ? "14px" : "16px"}
            capitalize={"capitalize"}
            sx={{
              marginBottom: "2px !important",
              fontWeight: "500 !important",
            }}
          >
            Service Type: {data?.data?.data?.service?.serviceType?.name}
          </CustomTypography>
          <CustomTypography
            color={theme?.palette?.commonColor?.grey}
            fontSize={isMobile ? "14px" : "16px"}
            capitalize={"capitalize"}
            sx={{
              marginBottom: "2px !important",
              fontWeight: "500 !important",
            }}
          >
            Service Name: {data?.data?.data?.service?.name}
          </CustomTypography>
          <CustomTypography
            color={theme?.palette?.commonColor?.grey}
            fontSize={isMobile ? "14px" : "16px"}
            capitalize={"capitalize"}
            sx={{
              marginBottom: "2px !important",
              fontWeight: "500 !important",
            }}
          >
            Date:{" "}
            {formatDate({
              date: data?.data?.data?.dateOfService,
              format: "DD-MM-YYYY",
            })}
          </CustomTypography>
        </Grid>

        <WithCondition isValid={!!data?.data?.user}>
          <Grid
            item
            xs={12}
            sx={{
              paddingTop: "0px !important",
            }}
          >
            <DividerLine gap={"8px 0 24px"} />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              paddingTop: "0px !important",
            }}
          >
            <CustomTypography
              color={theme?.palette?.commonColor?.grey}
              fontSize={isMobile ? "14px" : "16px"}
              capitalize={"capitalize"}
              sx={{
                marginBottom: "2px !important",
                fontWeight: "500 !important",
              }}
            >
              Seva Kendra State & District:{" "}
              {data?.data?.user?.designation?.sevaKendra?.district?.state?.name}
              {" - "}
              {data?.data?.user?.designation?.sevaKendra?.district?.name}
            </CustomTypography>
            <CustomTypography
              color={theme?.palette?.commonColor?.grey}
              fontSize={isMobile ? "14px" : "16px"}
              capitalize={"capitalize"}
              sx={{
                marginBottom: "2px !important",
                fontWeight: "500 !important",
              }}
            >
              Seva Kendra Name:{" "}
              {data?.data?.user?.designation?.sevaKendra?.name}
            </CustomTypography>
            <CustomTypography
              color={theme?.palette?.commonColor?.grey}
              fontSize={isMobile ? "14px" : "16px"}
              capitalize={"capitalize"}
              sx={{
                marginBottom: "2px !important",
                fontWeight: "500 !important",
              }}
            >
              User Assigned: {data?.data?.user?.firstName}{" "}
              {data?.data?.user?.lastName}
            </CustomTypography>
          </Grid>
        </WithCondition>

        <Grid
          item
          xs={12}
          sx={{
            paddingTop: "0px !important",
          }}
        >
          <DividerLine gap={"8px 0 24px"} />
        </Grid>

        <Grid item xs={12} marginBottom={"-20px"}>
          <CustomRadioButton
            name={formFields?.isCompleted?.name}
            label={formFields?.isCompleted?.label}
            inputValues={formFields?.isCompleted?.inputValues}
            value={values?.isCompleted}
            touched={touched?.isCompleted}
            errors={errors?.isCompleted}
            labelStyle={{ color: theme?.palette?.commonColor?.lightBlue }}
            onChange={(_, value) => {
              setValues({
                ...values,
                isCompleted: value,
                completedDate: "",
                howTheyGotService: "",
                reasonForNonCompletion: "",
                isFollowUpRequired: CODES?.NO,
                followUp: { ...editInitialValues?.followUp },
                donor: { ...editInitialValues?.donor },
                nonSevaKendraFollowUp: {
                  ...editInitialValues?.nonSevaKendraFollowUp,
                },
              });
              setTouched({});
            }}
            onBlur={handleBlur}
            isViewMode={isViewMode}
          />
        </Grid>

        <WithCondition isValid={values?.isCompleted === CODES?.YES}>
          <Grid item xs={12} sm={12} md={6}>
            <CustomDatePicker
              name={formFields?.completedDate?.name}
              label={formFields?.completedDate?.label}
              // minDate={formFields?.completedDate?.minDate}
              value={values?.completedDate}
              errors={errors?.completedDate}
              touched={touched?.completedDate}
              onChange={setFieldValue}
              setTouched={setFieldTouched}
              // maxDate={formFields?.completedDate?.maxDate}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <SingleAutoComplete
              label={formFields?.howTheyGotService?.label}
              name={formFields?.howTheyGotService?.name}
              value={values?.howTheyGotService}
              errors={errors?.howTheyGotService}
              touched={touched?.howTheyGotService}
              onChange={(_, value) => {
                setFieldValue(formFields?.howTheyGotService?.name, value);
              }}
              onBlur={handleBlur}
              inputValues={formFields?.howTheyGotService?.inputValues || []}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              paddingTop: "0px !important",
            }}
          >
            <DividerLine gap={"8px 0 24px"} />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label={formFields?.donorName?.label}
              name={formFields?.donorName?.name}
              fieldType={formFields?.donorName?.fieldType}
              value={values?.donor?.name}
              errors={errors?.donor?.name}
              touched={touched?.donor?.name}
              onChange={handleChange}
              onBlur={handleBlur}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label={formFields?.donorContact?.label}
              name={formFields?.donorContact?.name}
              fieldType={formFields?.donorContact?.fieldType}
              value={values?.donor?.contact}
              errors={errors?.donor?.contact}
              touched={touched?.donor?.contact}
              onChange={handleChange}
              onBlur={handleBlur}
              isViewMode={isViewMode}
              maxLength={10}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label={formFields?.donorAddress?.label}
              name={formFields?.donorAddress?.name}
              fieldType={formFields?.donorAddress?.fieldType}
              value={values?.donor?.address}
              errors={errors?.donor?.address}
              touched={touched?.donor?.address}
              onChange={handleChange}
              onBlur={handleBlur}
              isViewMode={isViewMode}
            />
          </Grid>
        </WithCondition>

        <WithCondition isValid={values?.isCompleted === CODES?.NO}>
          <Grid item xs={12}>
            <CustomTextField
              label={formFields?.reasonForNonCompletion?.label}
              name={formFields?.reasonForNonCompletion?.name}
              fieldType={formFields?.reasonForNonCompletion?.fieldType}
              value={values?.reasonForNonCompletion}
              errors={errors?.reasonForNonCompletion}
              touched={touched?.reasonForNonCompletion}
              onChange={handleChange}
              onBlur={handleBlur}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid item xs={12} marginBottom={"-20px"}>
            <CustomRadioButton
              name={formFields?.isFollowUpRequired?.name}
              label={formFields?.isFollowUpRequired?.label}
              inputValues={formFields?.isFollowUpRequired?.inputValues}
              value={values?.isFollowUpRequired}
              touched={touched?.isFollowUpRequired}
              errors={errors?.isFollowUpRequired}
              labelStyle={{ color: theme?.palette?.commonColor?.lightBlue }}
              onChange={(_, value) => {
                setValues({
                  ...values,
                  isFollowUpRequired: value,
                  followUp: {
                    ...editInitialValues?.followUp,
                  },
                });
                setTouched({
                  ...touched,
                  followUp: {
                    followUpdate: false,
                    followUpState: false,
                    followUpDistrict: false,
                    followUpSevaKendra: false,
                    followUpUser: false,
                  },
                });
              }}
              onBlur={handleBlur}
              isViewMode={isViewMode}
            />
          </Grid>

          <WithCondition isValid={values?.isFollowUpRequired === CODES?.YES}>
            <Grid item xs={12}>
              <CustomTypography
                capitalize={"capitalize"}
                color={{ color: theme?.palette?.commonColor?.lightBlue }}
              >
                Follow Up Details
              </CustomTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <CustomDatePicker
                name={formFields?.followUpdate?.name}
                label={formFields?.followUpdate?.label}
                minDate={formFields?.followUpdate?.minDate}
                value={values?.followUp?.followUpdate}
                errors={errors?.followUp?.followUpdate}
                touched={touched?.followUp?.followUpdate}
                onChange={setFieldValue}
                setTouched={setFieldTouched}
                maxDate={formFields?.followUpdate?.maxDate}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              sx={{ paddingTop: "0px !important" }}
            />

            <Grid item xs={12} sm={12} md={6}>
              <SingleAutoComplete
                label={formFields?.followUpState?.label}
                name={formFields?.followUpState?.name}
                value={values?.followUp?.stateId}
                errors={errors?.followUp?.stateId}
                touched={touched?.followUp?.stateId}
                customOnchange={(_, value) => {
                  setValues({
                    ...values,
                    followUp: {
                      ...values?.followUp,
                      stateId: value?.id,
                      districtId: "",
                      sevaKendraId: "",
                      userId: "",
                    },
                  });
                  setTouched({
                    ...touched,
                    followUp: {
                      ...touched?.followUp,
                      stateId: false,
                      districtId: false,
                      sevaKendraId: false,
                      userId: false,
                    },
                  });
                }}
                onBlur={handleBlur}
                inputValues={allStates || []}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <SingleAutoComplete
                label={formFields?.followUpDistrict?.label}
                name={formFields?.followUpDistrict?.name}
                value={values?.followUp?.districtId}
                errors={errors?.followUp?.districtId}
                touched={touched?.followUp?.districtId}
                customOnchange={(_, value) => {
                  setValues({
                    ...values,
                    followUp: {
                      ...values?.followUp,
                      districtId: value?.id,
                      sevaKendraId: "",
                      userId: "",
                    },
                  });
                  setTouched({
                    ...touched,
                    followUp: {
                      ...touched?.followUp,
                      districtId: false,
                      sevaKendraId: false,
                      userId: false,
                    },
                  });
                }}
                onBlur={handleBlur}
                inputValues={allDistricts || []}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12}>
              <SingleAutoComplete
                label={formFields?.followUpSevaKendra?.label}
                name={formFields?.followUpSevaKendra?.name}
                value={values?.followUp?.sevaKendraId}
                errors={errors?.followUp?.sevaKendraId}
                touched={touched?.followUp?.sevaKendraId}
                customOnchange={(_, value) => {
                  setValues({
                    ...values,
                    followUp: {
                      ...values?.followUp,
                      sevaKendraId: value?.id,
                      userId: "",
                    },
                  });
                  setTouched({
                    ...touched,
                    followUp: {
                      ...touched?.followUp,
                      sevaKendraId: false,
                      userId: false,
                    },
                  });
                }}
                onBlur={handleBlur}
                inputValues={allSevaKendras || []}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12}>
              <SingleAutoComplete
                label={formFields?.followUpUser?.label}
                name={formFields?.followUpUser?.name}
                getOptionLabel={formFields?.followUpUser?.getOptionLabel}
                value={values?.followUp?.userId}
                errors={errors?.followUp?.userId}
                touched={touched?.followUp?.userId}
                onChange={setFieldValue}
                onBlur={handleBlur}
                inputValues={allSevaKendraUsers || []}
                isViewMode={isViewMode}
              />
            </Grid>
          </WithCondition>
        </WithCondition>
      </WithCondition>

      <WithCondition isValid={!editId}>
        <Grid item xs={12} sm={12} md={6}>
          <SingleAutoComplete
            label={formFields?.serviceType?.label}
            name={formFields?.serviceType?.name}
            value={values?.serviceTypeId}
            errors={errors?.serviceTypeId}
            touched={touched?.serviceTypeId}
            onChange={(_, value) => {
              setFieldValue(formFields?.serviceType?.name, value);
            }}
            onBlur={handleBlur}
            inputValues={allServiceType || []}
            isViewMode={isViewMode}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <SingleAutoComplete
            label={formFields?.serviceSubtype?.label}
            name={formFields?.serviceSubtype?.name}
            value={values?.serviceId}
            errors={errors?.serviceId}
            touched={touched?.serviceId}
            onChange={(_, value) => {
              setFieldValue(formFields?.serviceSubtype?.name, value);
            }}
            onBlur={handleBlur}
            inputValues={allService || []}
            isViewMode={isViewMode}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CustomDatePicker
            name={formFields?.dateOfService?.name}
            label={formFields?.dateOfService?.label}
            minDate={formFields?.dateOfService?.minDate}
            value={values?.dateOfService}
            errors={errors?.dateOfService}
            touched={touched?.dateOfService}
            onChange={setFieldValue}
            setTouched={setFieldTouched}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CustomDatePicker
            name={formFields?.completedBefore?.name}
            label={formFields?.completedBefore?.label}
            minDate={formFields?.completedBefore?.minDate}
            value={values?.dueDate}
            errors={errors?.dueDate}
            touched={touched?.dueDate}
            onChange={setFieldValue}
            setTouched={setFieldTouched}
          />
        </Grid>

        <Grid item xs={12}>
          <DividerLine />
        </Grid>

        <Grid item xs={12} marginBottom={"-20px"}>
          <CustomRadioButton
            name={formFields?.isNonSevaKendraFollowUpRequired?.name}
            label={formFields?.isNonSevaKendraFollowUpRequired?.label}
            inputValues={
              formFields?.isNonSevaKendraFollowUpRequired?.inputValues
            }
            value={values?.isNonSevaKendraFollowUpRequired}
            touched={touched?.isNonSevaKendraFollowUpRequired}
            errors={errors?.isNonSevaKendraFollowUpRequired}
            onChange={(_, value) => {
              setValues({
                ...values,
                isNonSevaKendraFollowUpRequired: value,
                stateId: "",
                districtId: "",
                sevaKendraId: "",
                assignUserId: "",
                nonSevaKendraFollowUp: {
                  ...values.nonSevaKendraFollowUp,
                  name: "",
                  mobileNumber: "",
                  email: "",
                },
              });
              setTouched({
                ...touched,
                [formFields?.state?.name]: false,
                [formFields?.district?.name]: false,
                [formFields?.sevaKendra?.name]: false,
                [formFields?.assignUser?.name]: false,
                nonSevaKendraFollowUp: {
                  name: false,
                  mobileNumber: false,
                  email: false,
                },
              });
            }}
            onBlur={handleBlur}
            isViewMode={isViewMode}
            rowBreak
          />
        </Grid>
      </WithCondition>

      <WithCondition isValid={!!editId && values?.isCompleted !== CODES?.YES}>
        <Grid item xs={12}>
          <CustomTypography
            color={theme?.palette?.commonColor?.black}
            fontSize={isMobile ? "16px" : "18px"}
          >
            Forward to non SevaKendra Volunteer
          </CustomTypography>
        </Grid>
      </WithCondition>

      <WithCondition
        isValid={
          values?.isNonSevaKendraFollowUpRequired === CODES.NO && !editId
        }
      >
        <Grid item xs={12} sm={12} md={6}>
          <SingleAutoComplete
            label={formFields?.state?.label}
            name={formFields?.state?.name}
            value={values?.stateId}
            errors={errors?.stateId}
            touched={touched?.stateId}
            customOnchange={(_, value) => {
              setValues({
                ...values,
                [formFields?.state?.name]: value?.id,
                [formFields?.district?.name]: "",
                [formFields?.sevaKendra?.name]: "",
                [formFields?.assignUser?.name]: "",
              });
              setTouched({
                ...touched,
                [formFields?.state?.name]: false,
                [formFields?.district?.name]: false,
                [formFields?.sevaKendra?.name]: false,
                [formFields?.assignUser?.name]: false,
              });
            }}
            onBlur={handleBlur}
            inputValues={allStates || []}
            isViewMode={isViewMode}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <SingleAutoComplete
            label={formFields?.district?.label}
            name={formFields?.district?.name}
            value={values?.districtId}
            errors={errors?.districtId}
            touched={touched?.districtId}
            customOnchange={(_, value) => {
              setValues({
                ...values,
                [formFields?.district?.name]: value?.id,
                [formFields?.sevaKendra?.name]: "",
                [formFields?.assignUser?.name]: "",
              });
              setTouched({
                ...touched,
                [formFields?.district?.name]: false,
                [formFields?.sevaKendra?.name]: false,
                [formFields?.assignUser?.name]: false,
              });
            }}
            onBlur={handleBlur}
            inputValues={allDistricts || []}
            isViewMode={isViewMode}
          />
        </Grid>

        <Grid item xs={12}>
          <SingleAutoComplete
            label={formFields?.sevaKendra?.label}
            name={formFields?.sevaKendra?.name}
            value={values?.sevaKendraId}
            errors={errors?.sevaKendraId}
            touched={touched?.sevaKendraId}
            customOnchange={(_, value) => {
              setValues({
                ...values,
                [formFields?.sevaKendra?.name]: value?.id,
                [formFields?.assignUser?.name]: "",
              });
              setTouched({
                ...touched,
                [formFields?.sevaKendra?.name]: false,
                [formFields?.assignUser?.name]: false,
              });
            }}
            onBlur={handleBlur}
            inputValues={allSevaKendras || []}
            isViewMode={isViewMode}
          />
        </Grid>

        <Grid item xs={12}>
          <SingleAutoComplete
            label={formFields?.assignUser?.label}
            name={formFields?.assignUser?.name}
            getOptionLabel={formFields?.assignUser?.getOptionLabel}
            value={values?.userId}
            errors={errors?.userId}
            touched={touched?.userId}
            onChange={setFieldValue}
            onBlur={handleBlur}
            inputValues={allSevaKendraUsers || []}
            isViewMode={isViewMode}
          />
        </Grid>
      </WithCondition>

      <WithCondition
        isValid={
          (values?.isNonSevaKendraFollowUpRequired === CODES?.YES ||
            !!editId) &&
          values?.isCompleted !== CODES?.YES
        }
      >
        <Grid item xs={12} sm={12} md={6}>
          <CustomTextField
            label={formFields?.contactPersonName?.label}
            name={formFields?.contactPersonName?.name}
            fieldType={formFields?.contactPersonName?.fieldType}
            value={values?.nonSevaKendraFollowUp?.name}
            errors={errors?.nonSevaKendraFollowUp?.name}
            touched={touched?.nonSevaKendraFollowUp?.name}
            onChange={handleChange}
            onBlur={handleBlur}
            isViewMode={isViewMode}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CustomTextField
            label={formFields?.mobileNo?.label}
            name={formFields?.mobileNo?.name}
            fieldType={formFields?.mobileNo?.fieldType}
            value={values?.nonSevaKendraFollowUp?.mobileNumber}
            errors={errors?.nonSevaKendraFollowUp?.mobileNumber}
            touched={touched?.nonSevaKendraFollowUp?.mobileNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            isViewMode={isViewMode}
            maxLength={10}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CustomTextField
            label={formFields?.emailId?.label}
            name={formFields?.emailId?.name}
            fieldType={formFields?.emailId?.fieldType}
            value={values?.nonSevaKendraFollowUp?.email}
            errors={errors?.nonSevaKendraFollowUp?.email}
            touched={touched?.nonSevaKendraFollowUp?.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isViewMode={isViewMode}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CustomRadioButton
            name={formFields?.emailStatus?.name}
            label={formFields?.emailStatus?.label}
            inputValues={formFields?.emailStatus?.inputValues}
            labelStyle={formFields?.emailStatus?.labelStyle}
            value={values?.nonSevaKendraFollowUp?.sendMail}
            touched={touched?.nonSevaKendraFollowUp?.sendMail}
            errors={errors?.nonSevaKendraFollowUp?.sendMail}
            onChange={handleChange}
            onBlur={handleBlur}
            isViewMode={isViewMode}
            rowBreak
          />
        </Grid>
      </WithCondition>

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={handleOnReset}
        isViewMode={isViewMode}
        isUpdate={!!editId}
      />
    </FormWrapper>
  );
};

export default Form;

const DivyangCard = ({ divyangDetail, key, divyangId, setDivayangId }) => (
  <Box
    sx={{
      display: "flex",
      borderRadius: "16px",
      boxShadow: `2px 2px 4px ${theme?.palette?.shadowColor?.main}`,
      flexWrap: "wrap",
      flex: 1,
      columnGap: 2,
      position: "relative",
      cursor: "pointer",
    }}
    key={key || " "}
    onClick={() =>
      setDivayangId &&
      setDivayangId(divyangId !== divyangDetail?.id ? divyangDetail?.id : "")
    }
  >
    <img
      style={{
        width: 120,
        aspectRatio: 1,
        objectFit: "cover",
        borderRadius: "16px",
      }}
      src={divyangDetail?.profileImageUrl || user}
      onError={(e) => (e.target.src = user)}
      alt="divyang profile"
    />
    <Box>
      {divyangDetailsColumn?.map((item, key) => (
        <WithCondition
          isValid={!!item?.Cell || !!divyangDetail?.[item?.accessor]}
          key={key + item?.accessor}
        >
          <Box sx={{ display: "flex" }}>
            <Typography>{`${item?.Header} : `}</Typography>
            <Typography>
              {!!item?.Cell
                ? item?.Cell(divyangDetail)
                : divyangDetail?.[item?.accessor]}
            </Typography>
          </Box>
        </WithCondition>
      ))}
    </Box>

    <WithCondition isValid={!!setDivayangId}>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          right: 0,
          top: 8,
          backgroundColor: "white",
        }}
      >
        <CustomCheckBox
          name={" "}
          checked={divyangId === divyangDetail?.id}
          onChange={() =>
            setDivayangId &&
            setDivayangId(
              divyangId !== divyangDetail?.id ? divyangDetail?.id : ""
            )
          }
          checkboxColor={"green"}
        />
      </Box>
    </WithCondition>
  </Box>
);
