import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getApiService,
  getByIdApiService,
  postApiService,
  updateApiService,
} from "../../../../api/api";
import { API_PATHS } from "../../../../api/apiPaths";
import {
  fields,
  initialValues,
} from "../../../../constants/sevaKendraSetup/designation";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import { CustomTypography } from "../../../../styles";
import {
  dispatchNotifyError,
  dispatchNotifySuccess,
} from "../../../../utils/dispatch";
import { validationSchema } from "../../../../validations/sevaKendraSetup/designation";
import {
  CustomCheckBox,
  CustomTextField,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
} from "../../../shared";
import {
  ADDED_SUCCESSFULLY,
  UPDATED_SUCCESSFULLY,
} from "../../../../constants/globalConstants";

const Form = () => {
  const { state, search } = useLocation();
  const isViewMode = state?.viewDetails;
  const navigate = useNavigate();
  const editId = search?.editId;

  const { mutate } = useMutation({
    mutationKey: ["create and update"],
    mutationFn: (payload) => {
      return !!editId
        ? updateApiService(API_PATHS.DESIGNATION, editId, payload)
        : postApiService(API_PATHS.DESIGNATION, payload);
    },
    onSuccess: () => {
      if (!!editId) {
        dispatchNotifySuccess(UPDATED_SUCCESSFULLY("Designation"));
        handleOnReset();
      }

      dispatchNotifySuccess(ADDED_SUCCESSFULLY("Designation"));
      resetForm();
    },
  });

  const handleOnReset = () => {
    navigate(ROUTE_PATHS.DESIGNATIONS_LIST);
  };

  const handleOnSubmit = (value) => {
    if (value?.featuresId?.length === 0) {
      dispatchNotifyError("Minimum one access is required");
      return;
    }
    mutate(value);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
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
    resetForm,
  } = formik;

  const { data: accessMenu } = useQuery({
    queryKey: ["getAllAccessList"],
    queryFn: () => getApiService(API_PATHS.FEATURES),
    select: ({ data }) => data?.data,
  });

  const { data: stateList } = useQuery({
    queryKey: ["getAllStates"],
    queryFn: () => getApiService(API_PATHS.STATES),
    select: ({ data }) => data?.data,
  });

  const { data: districtList } = useQuery({
    queryKey: ["getAllDistrictByState", values?.stateId],
    queryFn: () => getByIdApiService(API_PATHS.STATES, values?.stateId),
    select: ({ data }) => data?.data,
    enabled: !!values?.stateId,
  });

  const { data: sevaKendraNames } = useQuery({
    queryKey: ["getSevaKendraNameByDistrict", values?.districtId],
    queryFn: () =>
      getByIdApiService(API_PATHS.SEVA_KENDRA_NAME, values?.districtId),
    select: ({ data }) => data?.data,
    enabled: !!values?.districtId,
  });

  const checkExistence = (id) => values?.featuresId?.includes(id);

  const checkItem = (id, name) => () => {
    if (checkExistence(id)) {
      setFieldValue(
        name,
        values?.featuresId?.filter((item) => item !== id)
      );
      return;
    }
    setFieldValue(name, [...values?.featuresId, id]);
  };

  return (
    <FormWrapper
      title="Designations"
      navigateTo={ROUTE_PATHS.DESIGNATIONS_LIST}
    >
      <Grid item xs={6}>
        <SingleAutoComplete
          label={fields?.stateId?.label}
          name={fields?.stateId?.name}
          value={values?.stateId}
          onChange={(_, value) => {
            setFieldValue(fields?.stateId?.name, value);
          }}
          onBlur={handleBlur}
          errors={errors?.stateId}
          touched={touched?.stateId}
          inputValues={stateList || []}
        />
      </Grid>

      <Grid item xs={6}>
        <SingleAutoComplete
          label={fields?.districtId?.label}
          name={fields?.districtId?.name}
          value={values?.districtId}
          onChange={(_, value) => {
            setFieldValue(fields?.districtId?.name, value);
          }}
          onBlur={handleBlur}
          errors={errors?.districtId}
          touched={touched?.districtId}
          inputValues={districtList?.districts || []}
        />
      </Grid>

      <Grid item xs={12}>
        <SingleAutoComplete
          label={fields?.sevaKendraId?.label}
          name={fields?.sevaKendraId?.name}
          value={values?.sevaKendraId}
          onChange={(_, value) => {
            setFieldValue(fields?.sevaKendraId?.name, value);
          }}
          onBlur={handleBlur}
          errors={errors?.sevaKendraId}
          touched={touched?.sevaKendraId}
          inputValues={sevaKendraNames || []}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.designation?.label}
          name={fields?.designation?.name}
          value={values?.designation}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.designation}
          touched={touched?.designation}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTypography>{fields.featuresId.label}</CustomTypography>
      </Grid>

      {accessMenu?.map((menu) => (
        <Grid item xs={12} key={menu?.id}>
          <CustomCheckBox
            name={menu?.id}
            label={menu?.name}
            onChange={checkItem(menu?.id, fields.featuresId.name)}
            checked={checkExistence(menu?.id)}
            isViewMode={isViewMode}
          />
        </Grid>
      ))}

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={handleOnReset}
        isUpdate={!!editId}
      />
    </FormWrapper>
  );
};

export default Form;
