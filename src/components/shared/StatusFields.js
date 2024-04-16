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

    if (values?.status === CODES.ACTIVE) {
      setFieldValue("description", "");
      setFieldValue("date", "");
    }
    if (values?.status === CODES.DEACTIVE) {
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
          rowBreak={rowBreak}
        />
      </Grid>
      <WithCondition isValid={values?.status === CODES.DEACTIVE}>
        <Grid item xs={12} md={6}>
          <CustomDatePicker
            name="date"
            label={"Effective Date *"}
            value={values?.date}
            onChange={setFieldValue}
            isViewMode={true}
            maxDate={new Date()}
            fullWidth
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
