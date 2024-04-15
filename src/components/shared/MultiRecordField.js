/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, styled } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

import { ADD, UPDATE } from "../../constants/globalConstants";
import useNotify from "../../hooks/useNotify";
import { CancelButton } from "../../styles/buttonStyle";
import { dispatchNotifyError } from "../../utils/dispatch";
import { CustomReactTable } from "./CustomReactTable";
import { SingleAutoComplete } from "./formFields";
import { CustomDatePicker } from "./formFields/CustomDatePicker";
import { CustomRadioButton } from "./formFields/CustomRadioButton";
import { CustomSelectField } from "./formFields/CustomSelectField";
import { CustomTextField } from "./formFields/CustomTextField";
import { CustomTimePicker } from "./formFields/CustomTimePicker";

const CustomTitle = styled("span")(({ theme }) => ({
  textTransform: "capitalize",
  marginRight: "20px",
  font: "normal normal 600 18px/17px Lato",
  color: `${theme?.palette.primary.main}`,
  fontSize: "19px",
  span: {
    fontWeight: "500",
    textTransform: "none",
    fontSize: "18px",
  },
}));

export const MultiRecordField = ({
  isViewMode,
  initialValues,
  fields,
  columnData,
  parentValue = [],
  parentSetFieldValue,
  name,
  validation,
  inputValues,
  addBtn,
  customOnSubmit,
  onChange,
  customValidation,
  isAssigned,
  error,
  tableSize,
  uniqueFields,
  children = null,
  getFieldData,
  disableLayout,
}) => {
  const [tableEditId, setTableEditId] = useState("");
  const { notifyError } = useNotify();
  const checkDuplicate = (value) => {
    const duplicate = uniqueFields?.find((unique) =>
      parentValue?.some(
        (data, index) =>
          data[unique?.key] === value[unique?.key] && tableEditId !== index
      )
    );
    if (duplicate) {
      notifyError(duplicate?.message);
      return true;
    }
    return false;
  };
  const onSubmitForm = (value, { resetForm }) => {
    if (customValidation && customValidation(value, tableEditId)) return;
    if (uniqueFields && checkDuplicate(value)) return;
    if (tableEditId !== "") {
      parentValue.splice(tableEditId, 1, value);
      setTableEditId("");
      parentSetFieldValue(name, [...parentValue]);
      setValues(initialValues);
      resetForm();
    } else {
      parentSetFieldValue(name, [...parentValue, value]);
      setValues(initialValues);
      resetForm();
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: customOnSubmit ? customOnSubmit : onSubmitForm,
    validationSchema: validation,
  });

  const {
    handleChange,
    values,
    handleSubmit,
    setValues,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    errors,
    touched,
  } = formik;

  const handleDeleteList = (id) => {
    if (isAssigned) {
      dispatchNotifyError("Unable to Delete,Assigned to User");
    } else {
      let copyValue = [...parentValue];
      copyValue.splice(id, 1);

      parentSetFieldValue(name, copyValue);
      onChange && onChange();
    }
  };

  const handleEditList = (id) => {
    setValues({ ...parentValue?.[id] });
    setTableEditId(id);
  };

  useEffect(() => {
    if (getFieldData) getFieldData(values);
  }, [values]);

  return (
    <>
      {fields?.map((item, index) => {
        if (item?.isChildren) return children;
        if (item?.empty) {
          return <Grid item xs={item?.xs || 6} key={index}></Grid>;
        }
        if (item.type === "select") {
          return (
            <Grid item xs={item.xs || 6} key={index}>
              <CustomSelectField
                label={item.label}
                name={item.name}
                inputValues={inputValues?.[item.name] || inputValues || []}
                value={values?.[item.name]}
                onChange={(e, v) => setFieldValue(item.name, v?.id)}
                errors={errors?.[item.name]}
                touched={touched?.[item.name]}
                onBlur={handleBlur}
                accessorReturn={item.accessorReturn}
                accessor={item.accessor}
                isViewMode={isViewMode}
                getOptionLabel={item?.getOptionLabel}
              />
            </Grid>
          );
        }
        if (item.type === "text") {
          return (
            <Grid item xs={item.xs || 6} key={index}>
              <CustomTextField
                label={item.label}
                name={item.name}
                fieldType={item?.fieldType}
                fullWidth
                value={values?.[item.name]}
                onChange={handleChange}
                errors={errors?.[item.name]}
                touched={touched?.[item.name]}
                onBlur={handleBlur}
                maxLength={item.maxLength}
                isViewMode={isViewMode}
              />
            </Grid>
          );
        }

        if (item.type === "number") {
          return (
            <Grid item xs={item.xs || 6} key={index}>
              <CustomTextField
                label={item.label}
                name={item.name}
                RestrictCopyPaste={true}
                type={item.type}
                fieldType={item.fieldType}
                onBlur={handleBlur}
                value={values?.[item.name]}
                onChange={(e) => {
                  setFieldValue(item.name, Number(e.target.value));
                }}
                errors={errors?.[item.name]}
                touched={touched?.[item.name]}
                maxLength={item.maxLength}
                isViewMode={isViewMode}
              />
            </Grid>
          );
        }
        if (item.type === "autocomplete") {
          return (
            <Grid item xs={item.xs || 6} key={index}>
              <SingleAutoComplete
                label={item.label}
                name={item.name}
                onBlur={handleBlur}
                inputValues={inputValues?.[item.name] || []}
                value={values?.[item.name]}
                onChange={(e, newValue) => {
                  setFieldValue([item.name], newValue);
                  if (item?.onChange) item?.onChange(setFieldValue);
                }}
                errors={errors?.[item.name]}
                touched={touched?.[item.name]}
                readOnly={isViewMode}
                getOptionLabel={item?.getOptionLabel || (() => {})}
              />
            </Grid>
          );
        }
        if (item.type === "date") {
          return (
            <Grid item xs={item.xs || 6} key={index}>
              <CustomDatePicker
                label={item.label}
                name={item.name}
                fieldType={item.fieldType}
                fullWidth
                value={values?.[item.name]}
                onChange={(value) => setFieldValue([item.name], value)}
                setTouced={setFieldTouched}
                errors={errors?.[item.name]}
                touched={touched?.[item.name]}
                onBlur={handleBlur}
                maxDate={item?.max}
                minDate={item?.min}
                isViewMode={isViewMode}
              />
            </Grid>
          );
        }

        if (item.type === "time") {
          return (
            <Grid item xs={item.xs || 6} key={index}>
              <CustomTimePicker
                label={item.label}
                name={item.name}
                fieldType={item.fieldType}
                fullWidth
                value={values?.[item.name]}
                onChange={(value) => setFieldValue([item.name], value)}
                setTouced={setFieldTouched}
                errors={errors?.[item.name]}
                touched={touched?.[item.name]}
                onBlur={handleBlur}
                maxTime={item?.maxTime}
                minTime={item?.minTime}
                isViewMode={isViewMode}
                views={item?.views}
              />
            </Grid>
          );
        }

        if (item.type === "radio") {
          return (
            <Grid item xs={item.xs || 6} key={index}>
              <CustomRadioButton
                label={item.label}
                name={item.name}
                inputValues={inputValues?.[item.name] || []}
                rowWise={item?.rowWise ? true : false}
                rowBreak={item?.rowBreak ? item?.rowBreak : false}
                value={values?.[item.name]}
                accessor={item?.accessor}
                onChange={handleChange}
                errors={errors?.[item.name]}
                touched={touched?.[item.name]}
                onBlur={handleBlur}
                isViewMode={isViewMode}
              />
            </Grid>
          );
        }

        if (item?.type === "title")
          return (
            <Grid item xs={12}>
              <CustomTitle>{item?.title}</CustomTitle>
            </Grid>
          );

        return "";
      })}
      {!isViewMode ? (
        <>
          <Grid
            item
            xs={addBtn ? addBtn : 12}
            sx={{
              display: "flex ",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <CancelButton onClick={handleSubmit}>
              {tableEditId !== "" ? UPDATE : ADD}
            </CancelButton>
          </Grid>
          <Grid item xs={12} sx={{ color: "red" }}>
            {error}
          </Grid>
        </>
      ) : (
        <></>
      )}
      <Grid item xs={tableSize || 12}>
        {parentValue?.length > 0 && (
          <CustomReactTable
            columnData={
              columnData(
                handleDeleteList,
                inputValues,
                tableEditId,
                handleEditList,
                isViewMode
              ) || []
            }
            rawData={parentValue || []}
            disablePagination
            disableSort
            disableColumnHiding={true}
            disableLayout={disableLayout}
          />
        )}
      </Grid>
    </>
  );
};
