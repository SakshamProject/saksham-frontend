import { Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  getApiService,
  getByIdApiService,
  postApiService,
  updateApiService,
} from "../../../../api/api";
import { API_PATHS } from "../../../../api/apiPaths";
import { CODES } from "../../../../constants/globalConstants";
import {
  fields,
  initialValues,
} from "../../../../constants/sevaKendraSetup/designation";
import { useCustomQuery } from "../../../../hooks/useCustomQuery";
import { ROUTE_PATHS } from "../../../../routes/routePaths";
import { CustomTypography } from "../../../../styles";
import {
  dispatchResponseAction,
  dispatchSnackbarError,
} from "../../../../utils/dispatch";
import { validationSchema } from "../../../../validations/sevaKendraSetup/designation";
import {
  AuditLog,
  CustomCheckBox,
  CustomTextField,
  FormActions,
  FormWrapper,
  SingleAutoComplete,
  WithCondition,
} from "../../../shared";

const Form = () => {
  const { state } = useLocation();
  const [params] = useSearchParams();
  const editId = params.get("editId");
  const isViewMode = state?.viewDetails;
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["create and update"],
    mutationFn: (payload) => {
      return editId
        ? updateApiService(API_PATHS?.DESIGNATION, editId, payload)
        : postApiService(API_PATHS?.DESIGNATION, payload);
    },
    onSuccess: () => {
      dispatchResponseAction(
        "Designation",
        editId ? CODES?.UPDATED : CODES?.ADDED
      );
      handleOnReset();
    },
  });

  const handleOnReset = () => navigate(ROUTE_PATHS?.DESIGNATIONS_LIST);

  const handleOnSubmit = (value) => {
    if (value?.featuresId?.length === 0) {
      dispatchSnackbarError("Minimum one access is required");
      return;
    }
    const payload = editId
      ? {
          ...value,
          features: value?.featuresId,
          auditLog: { date: new Date(), status: CODES?.ACTIVE },
        }
      : { ...value };
    mutate(payload);
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
    setValues,
  } = formik;

  const { data } = useCustomQuery({
    queryKey: ["fetchDesignationById"],
    queryFn: () => getByIdApiService(API_PATHS?.DESIGNATION, editId),
    enabled: !!editId,
    onSuccess: (data) => {
      setValues({
        stateId: data?.sevaKendra?.district?.state?.id,
        districtId: data?.sevaKendra?.district?.id,
        sevaKendraId: data?.sevaKendra?.id,
        designation: data?.name,
        featuresId: data?.features?.map((item) => item?.feature),
        auditLog: {
          ...data?.designationAuditLog[0],
        },
      });
    },
    select: ({ data }) => data?.data,
  });

  const { data: accessMenu } = useQuery({
    queryKey: ["getAllAccessList"],
    queryFn: () => getApiService(API_PATHS?.FEATURES),
    select: ({ data }) => data?.data,
  });

  const { data: stateList } = useQuery({
    queryKey: ["getAllStates"],
    queryFn: () => getApiService(API_PATHS?.STATES),
    select: ({ data }) => data?.data,
  });

  const { data: districtList } = useQuery({
    queryKey: ["getAllDistrictByState", values?.stateId],
    queryFn: () => getByIdApiService(API_PATHS?.STATES, values?.stateId),
    select: ({ data }) => data?.data,
    enabled: !!values?.stateId,
  });

  const { data: sevaKendraNames } = useQuery({
    queryKey: ["getSevaKendraNameByDistrict", values?.districtId],
    queryFn: () =>
      getByIdApiService(
        API_PATHS?.DISTRICTS,
        API_PATHS?.ACTIVE(`${values?.districtId}${API_PATHS?.SEVAKENDRA}`)
      ),
    select: ({ data }) => data?.data,
    enabled: !!values?.districtId,
  });

  const checkExistence = (id) => {
    if (editId) {
      return values?.featuresId?.some((item) => item?.id === id);
    }
    return values?.featuresId?.includes(id);
  };

  const checkItem = (id, name) => {
    if (checkExistence(id)) {
      setFieldValue(
        name,
        values?.featuresId?.filter((item) => {
          return editId ? item?.id !== id : item !== id;
        })
      );
      return;
    }
    setFieldValue(name, [...(values?.featuresId || []), editId ? { id } : id]);
  };

  const handleSelectAll = (e) => {
    if (e.target?.checked) {
      setFieldValue(
        fields?.featuresId?.name,
        accessMenu?.map((item) => {
          return editId ? { id: item?.id } : item?.id;
        })
      );
      return;
    }
    setFieldValue(fields?.featuresId?.name, []);
  };

  return (
    <FormWrapper
      title="Designations"
      navigateTo={ROUTE_PATHS?.DESIGNATIONS_LIST}
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
          isViewMode={isViewMode}
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
          isViewMode={isViewMode}
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
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={6}>
        <CustomTextField
          label={fields?.designation?.label}
          name={fields?.designation?.name}
          fieldType={fields?.designation?.fieldType}
          value={values?.designation}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors?.designation}
          touched={touched?.designation}
          isViewMode={isViewMode}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTypography sx={{ marginBottom: 0 }}>
          {fields.featuresId.label}
        </CustomTypography>
      </Grid>

      <WithCondition isValid={accessMenu?.length > 0}>
        <Grid item xs={12}>
          <CustomCheckBox
            label={"Select All"}
            name="selectAll"
            indeterminate={
              values?.featuresId?.length > 0 &&
              values?.featuresId?.length !== accessMenu?.length
            }
            onChange={handleSelectAll}
            checked={values?.featuresId?.length === accessMenu?.length}
            isViewMode={isViewMode}
            labelStyle={{ fontStyle: "italic" }}
          />
        </Grid>
      </WithCondition>

      {accessMenu?.map((menu) => (
        <Grid item xs={12} key={menu?.id}>
          <CustomCheckBox
            name={menu?.id}
            label={menu?.name?.split("_")?.join(" ")}
            style={{ marginLeft: "18px" }}
            onChange={() => checkItem(menu?.id, fields.featuresId.name)}
            checked={checkExistence(menu?.id)}
            isViewMode={isViewMode}
          />
        </Grid>
      ))}

      <FormActions
        handleSubmit={handleSubmit}
        handleOnReset={handleOnReset}
        isViewMode={isViewMode}
        isUpdate={!!editId}
      />

      <AuditLog
        hide={!editId}
        auditLog={{
          createdAt: data?.createdAt,
          createdBy: `${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`,
          updatedAt: data?.updatedAt,
          updatedBy: data?.updatedBy
            ? `${data?.updatedBy?.firstName} ${data?.updatedBy?.lastName}`
            : "",
        }}
      />
    </FormWrapper>
  );
};

export default Form;
