import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React from "react";

export const SingleAutoComplete = ({
  className,
  label,
  onChange,
  onBlur,
  value,
  inputValues = [],
  readOnly,
  name,
  errors,
  touched,
  required,
  accessor,
  fullWidth,
  labelAccessor,
  isReturnObject,
  isViewMode,
  getOptionLabel,
  disabled,
  customOnchange,
}) => {
  return (
    <Autocomplete
      className={className}
      label={label}
      name={name}
      readOnly={readOnly || isViewMode}
      fullWidth={fullWidth || true}
      options={inputValues || []}
      value={
        inputValues?.find((item) => item?.[accessor || "id"] === value) || null
      }
      disablePortal
      getOptionLabel={(option) =>
        (getOptionLabel && getOptionLabel(option)) ||
        option?.[labelAccessor] ||
        option?.name ||
        option?.label ||
        "No data Found"
      }
      onChange={
        customOnchange
          ? customOnchange
          : (e, v) =>
              onChange(
                name,
                isReturnObject ? v || { id: "" } : v?.[accessor || "id"] || ""
              )
      }
      onBlur={onBlur}
      disabled={Boolean(disabled)}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            {...(inputValues?.length < 5 && {
              onKeyPress: (e) => e.preventDefault(),
            })}
            variant="outlined"
            label={label}
            name={name}
            error={errors && touched}
            helperText={touched && errors}
            fullWidth
            required={required}
            readOnly={readOnly || isViewMode}
          />
        );
      }}
    />
  );
};
