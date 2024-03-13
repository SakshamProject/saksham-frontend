import { TextField } from "@mui/material";
import React from "react";

export const CustomTextarea = ({
  type,
  name,
  onChange,
  errors,
  touched,
  value,
  variant,
  onBlur,
  label,
  disabled,
  style,
  isViewMode,
  maxLength,
  fullWidth,
  autoComplete,
  onkeydown,
  error,
  helperText,
  placeholder,
  endAdornment,
  minRows,
  maxRows,
  className,
}) => {
  return (
    <TextField
      multiline
      maxRows={maxRows}
      minRows={minRows}
      id="standard-basic"
      label={label}
      placeholder={placeholder}
      variant={variant ? variant : "outlined"}
      type={type || "text"}
      name={name}
      className={className}
      fullWidth={fullWidth || true}
      autoComplete={autoComplete}
      onChange={onChange}
      onBlur={onBlur}
      value={value || ""}
      endAdornment={endAdornment}
      sx={style}
      error={Boolean(error || (touched?.[name] && errors?.[name]))}
      helperText={
        error ||
        helperText ||
        (touched?.[name] && errors?.[name] ? errors?.[name] : "")
      }
      InputProps={{
        onKeyDown: (e) => onkeydown && onkeydown(e),
        readOnly: isViewMode,
        disabled: disabled,
      }}
      onInput={(e) => {
        e.target.value &&
          maxLength &&
          (e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, maxLength));
      }}
    />
  );
};
