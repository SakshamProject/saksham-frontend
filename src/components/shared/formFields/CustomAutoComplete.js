import { Autocomplete, Chip, TextField } from "@mui/material";
import propTypes from "prop-types";

export const CustomAutoComplete = ({
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
  getOptionLabel,
  accessor,
  labelAccessor,
  autoComplete,
  isViewMode,
  customHelperText,
  sx,
  limitTags,
}) => {
  return (
    <Autocomplete
      sx={sx}
      multiple
      className={className}
      onChange={onChange}
      autoComplete={autoComplete || "off"}
      onBlur={onBlur}
      value={value || null}
      disabled={readOnly}
      options={inputValues || []}
      getOptionLabel={(option) =>
        (getOptionLabel && getOptionLabel(option)) ||
        option?.[labelAccessor] ||
        option?.name ||
        option?.label ||
        "No data Found"
      }
      isOptionEqualToValue={(option, value) =>
        option?.[accessor || "id"] === value?.[accessor || "id"]
      }
      readOnly={readOnly || isViewMode}
      limitTags={limitTags || 6}
      renderTags={(value, getTagProps) =>
        value?.map((option, index) => (
          <Chip
            key={index + option?.name}
            variant="outlined"
            label={option?.[labelAccessor] || option?.name}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            name={name}
            variant="outlined"
            label={label}
            error={Boolean(customHelperText || (touched && errors))}
            helperText={customHelperText || (touched && errors) || " "}
            fullWidth
            onKeyDown={(e) => {
              if (e?.keyCode === 13) {
                e.preventDefault();
              }
            }}
          />
        );
      }}
    />
  );
};

CustomAutoComplete.propTypes = {
  className: propTypes.string,
  label: propTypes.string,
  onChange: propTypes.func,
  onBlur: propTypes.func,
  value: propTypes.string,
  inputValues: propTypes.array,
  readOnly: propTypes.bool,
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
};
