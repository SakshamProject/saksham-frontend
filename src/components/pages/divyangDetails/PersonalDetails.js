import { Grid, styled } from "@mui/material";
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
import {
  eqColumns,
  eqInitialValues,
  fields,
  getFilesUrl,
  initialValues,
} from "../../../constants/divyangDetails/personalDetails";
import { CODES } from "../../../constants/globalConstants";
import {
  bloodGroup,
  genderSeed,
  statusSeed,
  yesNoSeed,
} from "../../../constants/seeds";
import useResponsive from "../../../hooks/useResponsive";
import { ROUTE_PATHS } from "../../../routes/routePaths";
import { StyledFormContainer } from "../../../styles";
import { formatDate, getSeedNameById } from "../../../utils/common";
import {
  dispatchResponseAction,
  dispatchSnackbarError,
} from "../../../utils/dispatch";
import { multiPartFormData } from "../../../utils/multipartFormData";
import {
  eqValidationSchema,
  validationSchema,
} from "../../../validations/divyangDetails/personalDetails";
import {
  CustomDatePicker,
  CustomRadioButton,
  CustomReactTable,
  CustomTextField,
  CustomTextarea,
  DividerLine,
  FileUpload,
  FormActions,
  SingleAutoComplete,
  WithCondition,
} from "../../shared";
import StatusFields from "../../shared/StatusFields";

const PersonalDetailsContainer = styled(StyledFormContainer)(({ theme }) => ({
  width: "100% !important",
  [theme.breakpoints.down("sm")]: {
    paddingTop: "8px !important",
  },
}));

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { state, search } = useLocation();
  const params = new URLSearchParams(search);
  const action = params.get("action");
  const isViewMode = state?.viewDetails || false;
  const editId = state?.editId;
  const [tableEditId, setTableEditId] = useState("");
  const { theme } = useResponsive();

  const handleOnReset = () => navigate(ROUTE_PATHS?.DIVYANG_DETAILS_LIST);

  const handleOnSubmit = (values) => {
    if (!values?.educationQualifications?.length) {
      dispatchSnackbarError("At least Add One Education Qualification");
      return;
    }
    const payload = multiPartFormData(
      {
        personalDetails: {
          ...values,
          isMarried: values?.isMarried === CODES?.YES,
          date: formatDate({ date: values?.date, format: "iso" }),
          dateOfBirth: formatDate({ date: values?.dateOfBirth, format: "iso" }),
          effectiveDate: editId
            ? values?.effectiveDate || ""
            : formatDate({ date: new Date(), format: "iso" }),
          currentStatus: values?.status,
          educationQualifications: values?.educationQualifications?.map(
            (value) => ({
              educationQualificationTypeId:
                value?.educationQualificationTypeId?.id,
              ...(value?.educationQualificationId && {
                educationQualificationId: value?.educationQualificationId?.id,
              }),
            })
          ),
        },
        picture: values?.picture,
        profilePhoto: values?.profilePhoto,
        pageNumber: 1,
        auditLog: {
          status: values?.status,
          date: formatDate({ date: values?.date, format: "iso" }),
          description: values?.description,
        },
        id: values?.id,
        personId: values?.person?.id,
      },
      ["picture", "profilePhoto"]
    );
    onSubmit(payload);
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["create and update"],
    mutationFn: (data) =>
      editId
        ? updateApiService(API_PATHS?.DIVYANG_DETAILS, editId, data)
        : postApiService(API_PATHS?.DIVYANG_DETAILS, data),
    onSuccess: ({ data }) => {
      dispatchResponseAction(
        "Personal Details",
        action ? CODES?.UPDATED : CODES?.SAVED
      );
      navigate(
        { pathname: ROUTE_PATHS?.DIVYANG_DETAILS_FORM_IDPROOF, search },
        { state: { editId: data?.data?.id, isViewMode } }
      );
    },
  });

  const resetEqvalues = () => {
    setTableEditId("");
    eqSetValues(eqInitialValues);
    eqSetTouched({});
  };

  const handleEducationQualification = () => {
    if (
      !eqValues?.educationQualificationId &&
      !!educationQualificationSubType?.length
    ) {
      eqSetFieldError(
        fields?.educationQualificationId?.name,
        "Education Qualification Sub Type is required"
      );
      return;
    } else if (
      (values?.educationQualifications.some(
        (obj) =>
          obj.educationQualificationId?.id ===
          eqValues?.educationQualificationId
      ) &&
        !!eqValues?.educationQualificationId) ||
      (values?.educationQualifications.some(
        (obj) =>
          obj.educationQualificationTypeId?.id ===
          eqValues?.educationQualificationTypeId
      ) &&
        !eqValues?.educationQualificationId)
    ) {
      dispatchSnackbarError("Education Qualification already added");
    } else {
      if (tableEditId === 0 || !!tableEditId) {
        const updatedEducationQualifications = [
          ...values.educationQualifications,
        ];
        updatedEducationQualifications[tableEditId] = {
          educationQualificationTypeId: {
            id: eqValues.educationQualificationTypeId,
            name: getSeedNameById(
              educationQualification,
              eqValues.educationQualificationTypeId
            ),
          },
          ...(eqValues.educationQualificationId && {
            educationQualificationId: {
              id: eqValues.educationQualificationId,
              name: getSeedNameById(
                educationQualificationSubType,
                eqValues.educationQualificationId
              ),
            },
          }),
        };
        setFieldValue(
          fields.educationQualifications.name,
          updatedEducationQualifications
        );
      } else {
        setFieldValue(fields?.educationQualifications?.name, [
          ...values?.educationQualifications,
          {
            educationQualificationTypeId: {
              id: eqValues?.educationQualificationTypeId,
              name: getSeedNameById(
                educationQualification,
                eqValues?.educationQualificationTypeId
              ),
            },
            ...(eqValues?.educationQualificationId && {
              educationQualificationId: {
                id: eqValues?.educationQualificationId,
                name: getSeedNameById(
                  educationQualificationSubType,
                  eqValues?.educationQualificationId
                ),
              },
            }),
          },
        ]);
      }
      resetEqvalues();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(editId),
    onSubmit: handleOnSubmit,
  });

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setValues,
  } = formik;

  const eqFormik = useFormik({
    initialValues: eqInitialValues,
    validationSchema: eqValidationSchema,
    onSubmit: handleEducationQualification,
  });

  const {
    values: eqValues,
    touched: eqTouched,
    errors: eqErrors,
    handleSubmit: eqHandleSubmit,
    setFieldValue: eqSetFieldValue,
    setFieldTouched: eqSetFieldTouched,
    setValues: eqSetValues,
    setFieldError: eqSetFieldError,
    setTouched: eqSetTouched,
  } = eqFormik;

  const { data: educationQualification } = useQuery({
    queryKey: ["educationQualificationList"],
    queryFn: () => getApiService(API_PATHS?.EDUCATION_QUALIFICATION),
    select: ({ data }) => data?.data,
  });

  const { data: communityCategory } = useQuery({
    queryKey: ["communityCategory"],
    queryFn: () => getApiService(API_PATHS?.COMMUNITY_CATEGORY),
    select: ({ data }) => data?.data,
  });

  const { data: educationQualificationSubType } = useQuery({
    queryKey: [
      "educationQualificationSubType",
      eqValues?.educationQualificationTypeId,
    ],
    queryFn: () =>
      getByIdApiService(
        API_PATHS?.EDUCATION_QUALIFICATION,
        eqValues?.educationQualificationTypeId
      ),
    select: ({ data }) => data?.data?.educationQualification,
    enabled: !!eqValues?.educationQualificationTypeId,
  });

  const { mutate } = useMutation({
    mutationKey: ["divyangGetById"],
    mutationFn: () => getByIdApiService(API_PATHS?.DIVYANG_DETAILS, editId),
    onSuccess: ({ data }) => {
      setValues({
        ...initialValues,
        ...data?.data,
        UDIDCardNumber: data?.data?.udidCardNumber,
        date: data?.data?.effectiveFromDate,
        isMarried: data?.data?.isMarried ? CODES?.YES : CODES?.NO,
        userName: data?.data?.person?.userName,
        educationQualifications: data?.data?.educationQualifications.map(
          (value) => ({
            educationQualificationTypeId: value?.educationQualificationType,
            educationQualificationId: {
              id: value?.educationQualification?.id,
              name: value?.educationQualification?.name,
            },
          })
        ),
        ...getFilesUrl(data?.files),
      });
    },
  });

  useEffect(() => {
    if (editId) mutate();
  }, []);

  const handleEditList = (index) => {
    setTableEditId(index);
    eqSetValues({
      educationQualificationTypeId:
        values?.educationQualifications[index]?.educationQualificationTypeId
          ?.id,
      educationQualificationId:
        values?.educationQualifications[index]?.educationQualificationId?.id,
    });
  };

  const handleDeleteList = (index) => {
    setFieldValue(
      fields?.educationQualifications?.name,
      values?.educationQualifications?.filter((_, pos) => pos !== index)
    );
  };

  useEffect(() => {
    if (values?.isMarried === CODES?.NO) {
      setFieldValue(fields?.spouseName?.name, "");
      setFieldValue(fields?.spouseNumber?.name, "");
      setFieldTouched(fields?.spouseName?.name, false);
      setFieldTouched(fields?.spouseNumber?.name, false);
    }
  }, [values?.isMarried]); //eslint-disable-line

  return (
    <Grid container direction={"column"}>
      <PersonalDetailsContainer>
        <Grid container columnSpacing={3} rowSpacing={2}>
          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.firstName?.label}
              name={fields?.firstName?.name}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.firstName}
              errors={errors?.firstName}
              touched={touched?.firstName}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.lastName?.label}
              name={fields?.lastName?.name}
              value={values?.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.lastName}
              touched={touched?.lastName}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.divyangId?.label}
              name={fields?.divyangId?.name}
              value={values?.divyangId}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.divyangId}
              touched={touched?.divyangId}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FileUpload
              type={"image"}
              accept={"image/*"}
              setFieldValue={setFieldValue}
              name={editId ? "profilePhoto" : fields?.picture?.name}
              defaultLabel={fields?.picture?.label}
              label={
                values?.pictureFileName || values?.profilePhotoFileName || ""
              }
              value={values?.picture || values?.profilePhoto || ""}
              error={errors?.picture || errors?.profilePhoto}
              touched={touched?.picture || touched?.profilePhoto}
              onChange={(e) =>
                setFieldValue(
                  editId ? "profilePhoto" : fields?.picture?.name,
                  e?.target?.files[0]
                )
              }
              disabled={isViewMode}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomRadioButton
              name={fields?.gender?.name}
              label={fields?.gender?.label}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.gender}
              touched={touched?.gender}
              errors={errors?.gender}
              isViewMode={isViewMode}
              inputValues={genderSeed(true)}
              rowBreak
              labelStyle={{
                color: theme?.palette?.commonColor?.blue,
                fontSize: "16px",
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SingleAutoComplete
              label={fields?.bloodGroup?.label}
              name={fields?.bloodGroup?.name}
              value={values?.bloodGroup}
              onChange={(_, value) => {
                setFieldValue(fields?.bloodGroup?.name, value);
              }}
              onBlur={handleBlur}
              errors={errors?.bloodGroup}
              touched={touched?.bloodGroup}
              inputValues={bloodGroup}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomDatePicker
              label={fields?.dateOfBirth?.label}
              name={fields?.dateOfBirth?.name}
              value={values?.dateOfBirth}
              onChange={setFieldValue}
              isViewMode={isViewMode}
              maxDate={new Date()}
              onBlur={handleBlur}
              setTouched={setFieldTouched}
              errors={errors?.dateOfBirth}
              touched={touched?.dateOfBirth}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.mailId?.label}
              name={fields?.mailId?.name}
              value={values?.mailId}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.mailId}
              touched={touched?.mailId}
              isViewMode={isViewMode}
              fieldType={fields?.mailId?.fieldType}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.mobileNumber?.label}
              name={fields?.mobileNumber?.name}
              value={values?.mobileNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.mobileNumber}
              touched={touched?.mobileNumber}
              isViewMode={isViewMode}
              fieldType={fields?.mobileNumber?.fieldType}
              maxLength={10}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.UDIDCardNumber?.label}
              name={fields?.UDIDCardNumber?.name}
              value={values?.UDIDCardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.UDIDCardNumber}
              touched={touched?.UDIDCardNumber}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid item xs={12}>
            <DividerLine gap={"6px 0 24px"} />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.fatherName?.label}
              name={fields?.fatherName?.name}
              value={values?.fatherName}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.fatherName}
              touched={touched?.fatherName}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.motherName?.label}
              name={fields?.motherName?.name}
              value={values?.motherName}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.motherName}
              touched={touched?.motherName}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid item xs={12}>
            <DividerLine gap={"6px 0 24px"} />
          </Grid>

          <Grid item xs={12}>
            <CustomRadioButton
              name={fields?.isMarried?.name}
              label={fields?.isMarried?.label}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.isMarried || ""}
              touched={touched?.isMarried}
              errors={errors?.isMarried}
              isViewMode={isViewMode}
              inputValues={yesNoSeed}
              rowBreak
              labelStyle={{
                color: theme?.palette?.commonColor?.blue,
                fontSize: "16px",
              }}
            />
          </Grid>

          <WithCondition isValid={values?.isMarried === CODES?.YES}>
            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.spouseName?.label}
                name={fields?.spouseName?.name}
                value={values?.spouseName}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.spouseName}
                touched={touched?.spouseName}
                isViewMode={isViewMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.spouseNumber?.label}
                name={fields?.spouseNumber?.name}
                value={values?.spouseNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.spouseNumber}
                touched={touched?.spouseNumber}
                isViewMode={isViewMode}
                fieldType={fields?.spouseNumber?.fieldType}
                maxLength={10}
              />
            </Grid>
          </WithCondition>

          <Grid item xs={12}>
            <DividerLine gap={"8px 0 24px"} />
          </Grid>

          <Grid item xs={12} md={6}>
            <SingleAutoComplete
              label={fields?.educationQualificationTypeId?.label}
              name={fields?.educationQualificationTypeId?.name}
              value={eqValues?.educationQualificationTypeId}
              onChange={(_, value) => {
                eqSetFieldValue(
                  fields?.educationQualificationTypeId?.name,
                  value
                );
                eqSetFieldValue(fields?.educationQualificationId?.name, "");
                eqSetFieldTouched(
                  fields?.educationQualificationTypeId?.name,
                  false
                );
                eqSetFieldTouched(
                  fields?.educationQualificationId?.name,
                  false
                );
              }}
              errors={eqErrors?.educationQualificationTypeId}
              touched={eqTouched?.educationQualificationTypeId}
              inputValues={educationQualification || []}
              isViewMode={isViewMode}
            />
          </Grid>

          <WithCondition
            isValid={
              !!eqValues?.educationQualificationTypeId &&
              !!educationQualificationSubType?.length
            }
          >
            <Grid item xs={12} md={6}>
              <SingleAutoComplete
                label={fields?.educationQualificationId?.label}
                name={fields?.educationQualificationId?.name}
                value={eqValues?.educationQualificationId}
                onChange={(_, value) => {
                  eqSetFieldValue(
                    fields?.educationQualificationId?.name,
                    value
                  );
                  eqSetFieldTouched(
                    fields?.educationQualificationId?.name,
                    false
                  );
                }}
                errors={eqErrors?.educationQualificationId}
                touched={eqTouched?.educationQualificationId}
                inputValues={educationQualificationSubType || []}
                isViewMode={isViewMode}
              />
            </Grid>
          </WithCondition>

          <FormActions
            handleSubmit={eqHandleSubmit}
            handleOnReset={resetEqvalues}
            resetLabel={"Clear"}
            isUpdate={tableEditId === 0 || !!tableEditId}
            submitLabel="Add"
          />

          <WithCondition isValid={values?.educationQualifications?.length > 0}>
            <Grid item xs={12} my={4}>
              <CustomReactTable
                columnData={
                  eqColumns({
                    tableEditId,
                    handleDeleteList,
                    handleEditList,
                  }) || []
                }
                rawData={values?.educationQualifications || []}
                manualSort
                disablePagination
                disableLayout
                count={values?.educationQualifications?.length}
              />
            </Grid>
          </WithCondition>

          <Grid item xs={12}>
            <DividerLine gap={"10px 0 24px"} />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label={fields?.religion?.label}
              name={fields?.religion?.name}
              value={values?.religion}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.religion}
              touched={touched?.religion}
              isViewMode={isViewMode}
              fieldType={fields?.religion?.type}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <SingleAutoComplete
              label={fields?.communityCategoryId?.label}
              name={fields?.communityCategoryId?.name}
              value={values?.communityCategoryId}
              onChange={(_, value) => {
                setFieldValue(fields?.communityCategoryId?.name, value);
              }}
              onBlur={handleBlur}
              errors={errors?.communityCategoryId}
              touched={touched?.communityCategoryId}
              inputValues={communityCategory || []}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              label={fields?.community?.label}
              name={fields?.community?.name}
              value={values?.community}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.community}
              touched={touched?.community}
              isViewMode={isViewMode}
              fieldType={fields?.community?.type}
            />
          </Grid>

          <Grid item xs={12}>
            <DividerLine gap={"8px 0 24px"} />
          </Grid>

          <Grid item xs={12}>
            <CustomTextarea
              minRows={3}
              label={fields?.extraCurricularActivity?.label}
              name={fields?.extraCurricularActivity?.name}
              value={values?.extraCurricularActivity}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors?.extraCurricularActivity}
              touched={touched?.extraCurricularActivity}
              isViewMode={isViewMode}
            />
          </Grid>

          <Grid item xs={12}>
            <DividerLine gap={"6px 0 24px"} />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label={fields?.userName?.label}
              name={fields?.userName?.name}
              value={values?.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              isViewMode={isViewMode || !!editId}
              errors={errors?.userName}
              touched={touched?.userName}
            />
          </Grid>

          <WithCondition isValid={!editId}>
            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.password?.label}
                name={fields?.password?.name}
                value={values?.password}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors?.password}
                isViewMode={isViewMode}
                touched={touched?.password}
                autoComplete
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label={fields?.confirmPassword?.label}
                name={fields?.confirmPassword?.name}
                value={values?.confirmPassword}
                onChange={handleChange}
                isViewMode={isViewMode}
                onBlur={handleBlur}
                errors={errors?.confirmPassword}
                touched={touched?.confirmPassword}
                autoComplete
              />
            </Grid>
          </WithCondition>

          <WithCondition isValid={!!editId}>
            <StatusFields
              setFieldTouched={setFieldTouched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
              statusSeeds={statusSeed}
              isViewMode={isViewMode}
              statusHistory={values?.auditLog}
              disableListLayout
            />
          </WithCondition>

          <FormActions
            handleSubmit={handleSubmit}
            handleOnReset={handleOnReset}
            disableSubmit={isViewMode}
            submitLabel={"Save\xa0&\xa0Next"}
            isViewMode={isViewMode}
          />
        </Grid>
      </PersonalDetailsContainer>
    </Grid>
  );
};

export default PersonalDetails;
