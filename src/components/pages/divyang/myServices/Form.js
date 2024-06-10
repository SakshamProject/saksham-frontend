import { Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getApiService,
  getByIdApiService,
  postApiService,
} from "../../../../api/api";
import { API_PATHS } from "../../../../api/apiPaths";
import { CODES } from "../../../../constants/globalConstants";
import {
  formFields,
  initialValues,
} from "../../../../constants/serviceMapping/serviceMapping";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import { formatDate, getValidValues } from "../../../../utils/common";
import { dispatchResponseAction } from "../../../../utils/dispatch";
import { validationSchema } from "../../../../validations/divyang/myService";
import {
  CustomDatePicker,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
} from "../../../shared";
import { useEffect } from "react";

const Form = () => {
  const userInfo = useSelector((state) => state?.userInfo);
  const { state } = useLocation();
  const isViewMode = state?.viewDetails;
  const editId = state?.editId;
  const navigate = useNavigate();

  const handleOnSubmit = (value) => {
    const payload = getValidValues({
      ...value,
      dateOfService: formatDate({
        date: value?.dateOfService,
        format: "iso",
      }),
      dueDate: formatDate({
        date: value?.dueDate,
        format: "iso",
      }),
      isNonSevaKendraFollowUpRequired: false,
      nonSevaKendraFollowUp: "",
    });
    onSubmit(payload);
  };

  const { mutate: onSubmit } = useMutation({
    mutationKey: ["createAndUpdate"],
    mutationFn: (data) => postApiService(API_PATHS?.SERVICE_MAPPING, data),
    onSuccess: () => {
      dispatchResponseAction("Service", CODES?.ADDED);
      navigate(ROUTE_PATHS?.DIVYANG_SERVICES_LIST);
    },
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    setValues,
    handleSubmit,
    setTouched,
    setFieldTouched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  });

  const handleOnReset = () => navigate(ROUTE_PATHS?.DIVYANG_SERVICES_LIST);

  const { data: allStates } = useQuery({
    queryKey: ["getAllStates"],
    queryFn: () => getApiService(API_PATHS?.STATES),
    select: ({ data }) => data?.data,
  });

  const { data: allDistricts } = useQuery({
    queryKey: ["getAllDistrictByState", values?.stateId],
    queryFn: () => getByIdApiService(API_PATHS?.STATES, values?.stateId),
    select: ({ data }) => data?.data?.districts,
    enabled: !!values?.stateId,
  });

  const { data: allSevaKendras } = useQuery({
    queryKey: ["getSevaKendraNameByDistrict", values?.districtId],
    queryFn: () =>
      getByIdApiService(
        API_PATHS?.DISTRICTS,
        `${values?.districtId}${API_PATHS?.SEVAKENDRA}`,
        { status: CODES?.ACTIVE }
      ),
    select: ({ data }) => data?.data,
    enabled: !!values?.districtId,
  });

  const { data: allServiceType } = useQuery({
    queryKey: ["getAllServiceType"],
    queryFn: () => postApiService(API_PATHS?.SERVICES_LIST),
    select: ({ data }) => data?.data,
  });

  const { mutate } = useMutation({
    mutationKey: ["serviceMappingGetById"],
    mutationFn: () => getByIdApiService(API_PATHS?.SERVICE_MAPPING, editId),
    onSuccess: (data) => {
      setValues({});
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

  return (
    <FormWrapper
      title="Service"
      navigateTo={ROUTE_PATHS?.DIVYANG_SERVICES_LIST}
    >
      <Grid item xs={12} md={6}>
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
            });
            setTouched({
              ...touched,
              [formFields?.state?.name]: false,
              [formFields?.district?.name]: false,
              [formFields?.sevaKendra?.name]: false,
            });
          }}
          onBlur={handleBlur}
          inputValues={allStates || []}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12} md={6}>
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
            });
            setTouched({
              ...touched,
              [formFields?.district?.name]: false,
              [formFields?.sevaKendra?.name]: false,
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
            setFieldValue([formFields?.sevaKendra?.name], value?.id);
          }}
          onBlur={handleBlur}
          inputValues={allSevaKendras || []}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12} md={6}>
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

      <Grid item xs={12} md={6}>
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

      <Grid item xs={12} md={6}>
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
