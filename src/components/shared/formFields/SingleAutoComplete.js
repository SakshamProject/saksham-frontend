import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import propTypes from "prop-types";

export const SingleAutoComplete = ({
  className,
  label,
  onChange,
  onBlur,
  value,
  inputValues,
  readOnly,
  name,
  errors,
  touched,
  accessor,
  labelAccessor,
  isReturnObject,
  isViewMode,
  getOptionLabel,
  disabled,
  customOnchange,
  customHelperText,
  autoComplete,
  size,
}) => {
  return (
    <Autocomplete
      size={size || "medium"}
      className={className}
      label={label}
      name={name}
      readOnly={!!readOnly || isViewMode}
      fullWidth
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
        customOnchange ||
        ((_, v) =>
          onChange(
            name,
            isReturnObject ? v || { id: "" } : v?.[accessor || "id"] || ""
          ))
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
            autoComplete={autoComplete}
            variant="outlined"
            label={label}
            name={name}
            error={errors && touched}
            helperText={customHelperText || (touched && errors) || " "}
            fullWidth
            readOnly={!!readOnly || isViewMode}
          />
        );
      }}
    />
  );
};

SingleAutoComplete.propTypes = {
  className: propTypes.string,
  label: propTypes.string,
  onChange: propTypes.func,
  onBlur: propTypes.func,
  value: propTypes.string,
  inputValues: propTypes.array,
  readOnly: propTypes.oneOfType([propTypes.string, propTypes.bool]),
  name: propTypes.string,
  errors: propTypes.string,
  touched: propTypes.bool,
  getOptionLabel: propTypes.func,
  accessor: propTypes.string,
  labelAccessor: propTypes.string,
  autoComplete: propTypes.string,
  isViewMode: propTypes.bool,
  customHelperText: propTypes.string,
  sx: propTypes.number,
  limitTags: propTypes.number,
  isReturnObject: propTypes.any,
  size: propTypes.string,
  disabled: propTypes.bool,
  customOnchange: propTypes.func,
};
