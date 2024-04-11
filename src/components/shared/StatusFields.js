import { Grid } from "@mui/material";
import { useEffect } from "react";

import { CODES, statusColumns } from "../../constants/globalConstants";
import { CustomReactTable } from "./CustomReactTable";
import { DividerLine } from "./DividerLine";
import { CustomDatePicker } from "./formFields/CustomDatePicker";
import { CustomRadioButton } from "./formFields/CustomRadioButton";
import { CustomTextField } from "./formFields/CustomTextField";
import WithCondition from "./WithCondition";

function StatusFields({
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  isViewMode,
  setFieldValue,
  setFieldTouched,
  statusSeeds,
  rowBreak = true,
  statusHistory = [],
  disableListLayout,
  hide,
}) {
  useEffect(() => {
    if (hide) return;

    if (values?.status?.statusId === CODES.ACTIVE) {
      setFieldValue("status.deactivationReason", "");
    }
    if (values?.status?.statusId === CODES.IN_ACTIVE) {
      setFieldValue("status.effectiveDate", new Date());
    }
  }, [values?.status?.statusId]); // eslint-disable-line

  if (hide) return <></>;

  return (
    <>
      <Grid item xs={12}>
        <DividerLine />
      </Grid>
      <Grid item xs={6}>
        <CustomRadioButton
          name="status.statusId"
          label={"Status"}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.status?.statusId || ""}
          touched={touched?.status?.statusId}
          errors={errors?.status?.statusId}
          isViewMode={isViewMode}
          accessor="code"
          inputValues={statusSeeds}
          rowBreak={rowBreak}
        />
      </Grid>
      <WithCondition isValid={values?.status?.statusId === CODES.IN_ACTIVE}>
        <Grid item xs={12} md={6}>
          <CustomDatePicker
            name="status.effectiveDate"
            label={"Effective Date *"}
            value={values?.status?.effectiveDate}
            onChange={setFieldValue}
            isViewMode={true}
            maxDate={new Date()}
            fullWidth
            errors={errors?.status?.effectiveDate}
            onBlur={handleBlur}
            setTouched={setFieldTouched}
            touched={touched?.status?.effectiveDate}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            name="status.deactivationReason"
            label={"Reason for deactivation *"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values?.status?.deactivationReason || ""}
            touched={touched?.status?.deactivationReason}
            errors={errors?.status?.deactivationReason}
            isViewMode={isViewMode}
          />
        </Grid>
      </WithCondition>
      <WithCondition isValid={values?.statusHistory || statusHistory}>
        <Grid item xs={12}>
          <CustomReactTable
            columnData={statusColumns}
            rawData={values?.statusHistory || statusHistory}
            disablePagination
            disableColumnHiding
            disableSort
            disableLayout={disableListLayout}
          />
        </Grid>
      </WithCondition>
    </>
  );
}

export default StatusFields;
