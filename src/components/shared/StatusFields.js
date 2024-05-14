import { Grid } from "@mui/material";
import propTypes from "prop-types";
import { useEffect } from "react";
import { CODES, statusColumns } from "../../constants/globalConstants";
import useResponsive from "../../hooks/useResponsive";
import { CustomReactTable } from "./CustomReactTable";
import { DividerLine } from "./DividerLine";
import { WithCondition } from "./WithCondition";
import { CustomDatePicker } from "./formFields/CustomDatePicker";
import { CustomRadioButton } from "./formFields/CustomRadioButton";
import { CustomTextField } from "./formFields/CustomTextField";

const StatusFields = ({
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  isViewMode,
  setFieldValue,
  setFieldTouched,
  statusSeeds,
  rowBreak,
  statusHistory,
  disableListLayout,
  hide,
  gap,
}) => {
  const { isMobile } = useResponsive();

  useEffect(() => {
    if (hide) return;

    if (values?.status === CODES?.ACTIVE) {
      setFieldValue("description", "");
      setFieldValue("date", new Date());
    }
    setFieldTouched("description", false);
  }, [values?.status]); // eslint-disable-line

  if (hide) return <></>;

  return (
    <>
      <Grid item xs={12}>
        <DividerLine gap={gap || "8px 0 24px"} />
      </Grid>
      <Grid item xs={6}>
        <CustomRadioButton
          name="status"
          label={"Status"}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.status || ""}
          touched={touched?.status}
          errors={errors?.status}
          isViewMode={isViewMode}
          accessor="id"
          inputValues={statusSeeds}
          rowBreak={rowBreak || true}
        />
      </Grid>

      <WithCondition isValid={values?.status === CODES?.DEACTIVE}>
        <Grid item xs={12} md={6}>
          <CustomDatePicker
            name="date"
            label={"Effective Date *"}
            value={values?.date}
            onChange={setFieldValue}
            isViewMode={isViewMode}
            // minDate={new Date()}
            errors={errors?.date}
            onBlur={handleBlur}
            setTouched={setFieldTouched}
            touched={touched?.date}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            name="description"
            label={"Reason for deactivation *"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values?.description || ""}
            touched={touched?.description}
            errors={errors?.description}
            isViewMode={isViewMode}
          />
        </Grid>
      </WithCondition>

      <WithCondition
        isValid={(values?.statusHistory || statusHistory) && !isMobile}
      >
        <Grid item xs={12}>
          <CustomReactTable
            columnData={statusColumns}
            rawData={values?.statusHistory || statusHistory?.reverse()}
            disablePagination
            disableColumnHiding
            disableSort
            disableLayout={disableListLayout}
            maxHeight={"40vh"}
          />
        </Grid>
      </WithCondition>
    </>
  );
};

export default StatusFields;

StatusFields.propTypes = {
  handleChange: propTypes.func,
  handleBlur: propTypes.func,
  values: propTypes.object,
  touched: propTypes.object,
  errors: propTypes.object,
  isViewMode: propTypes.bool,
  setFieldValue: propTypes.func,
  setFieldTouched: propTypes.func,
  statusSeeds: propTypes.any,
  rowBreak: propTypes.bool,
  statusHistory: propTypes.array,
  disableListLayout: propTypes.bool,
  hide: propTypes.bool,
  gap: propTypes.any,
};
