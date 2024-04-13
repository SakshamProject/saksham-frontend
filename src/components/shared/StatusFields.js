import { Grid } from "@mui/material";
import { useEffect } from "react";

import { CODES, statusColumns } from "../../constants/globalConstants";
import { CustomReactTable } from "./CustomReactTable";
import { DividerLine } from "./DividerLine";
import { CustomDatePicker } from "./formFields/CustomDatePicker";
import { CustomRadioButton } from "./formFields/CustomRadioButton";
import { CustomTextField } from "./formFields/CustomTextField";
import { WithCondition } from "./WithCondition";

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
  gap,
}) {
  useEffect(() => {
    if (hide) return;

    if (values?.auditLog?.status === CODES.ACTIVE) {
      setFieldValue("auditLog.description", "");
    }
    if (values?.auditLog?.status === CODES.DEACTIVE) {
      setFieldValue("auditLog.date", new Date());
    }
  }, [values?.auditLog?.status]); // eslint-disable-line

  if (hide) return <></>;

  return (
    <>
      <Grid item xs={12}>
        <DividerLine gap={gap || "8px 0 24px"} />
      </Grid>
      <Grid item xs={6}>
        <CustomRadioButton
          name="auditLog.status"
          label={"Status"}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.auditLog?.status || ""}
          touched={touched?.auditLog?.status}
          errors={errors?.auditLog?.status}
          isViewMode={isViewMode}
          accessor="id"
          inputValues={statusSeeds}
          rowBreak={rowBreak}
        />
      </Grid>
      <WithCondition isValid={values?.auditLog?.status === CODES.DEACTIVE}>
        <Grid item xs={12} md={6}>
          <CustomDatePicker
            name="auditLog.date"
            label={"Effective Date *"}
            value={values?.auditLog?.date}
            onChange={setFieldValue}
            isViewMode={true}
            maxDate={new Date()}
            fullWidth
            errors={errors?.auditLog?.date}
            onBlur={handleBlur}
            setTouched={setFieldTouched}
            touched={touched?.auditLog?.date}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            name="auditLog.description"
            label={"Reason for deactivation *"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values?.auditLog?.description || ""}
            touched={touched?.auditLog?.description}
            errors={errors?.auditLog?.description}
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
