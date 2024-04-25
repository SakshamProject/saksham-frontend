import { TextField } from "@mui/material";
import propTypes from "prop-types";

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
  autoComplete,
  onkeydown,
  customHelperText,
  placeholder,
  endAdornment,
  minRows,
  maxRows,
  className,
}) => {
  return (
    <TextField
      id={label + name}
      multiline
      maxRows={maxRows}
      minRows={minRows}
      label={label}
      placeholder={placeholder}
      variant={variant || "outlined"}
      type={type || "text"}
      name={name}
      className={className}
      fullWidth
      autoComplete={autoComplete}
      onChange={onChange}
      onBlur={onBlur}
      value={value || ""}
      endAdornment={endAdornment}
      sx={style}
      error={Boolean(customHelperText || (touched && errors))}
      helperText={customHelperText || (touched && errors) ? errors : " "}
      InputProps={{
        onKeyDown: (e) => (onkeydown ? onkeydown(e) : () => {}),
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

CustomTextarea.propTypes = {
  value: propTypes.object,
  touched: propTypes.func,
  errors: propTypes.string,
  customHelperText: propTypes.string,
  name: propTypes.string,
  label: propTypes.string,
  disabled: propTypes.bool,
  style: propTypes.object,
  isViewMode: propTypes.bool,
  autoComplete: propTypes.string,
  onChange: propTypes.func,
  variant: propTypes.string,
  placeholder: propTypes.string,
  onBlur: propTypes.func,
  type: propTypes.string,
  maxLength: propTypes.number,
  onkeydown: propTypes.func,
  endAdornment: propTypes.any,
  minRows: propTypes.number,
  maxRows: propTypes.number,
  className: propTypes.string,
};
