import { Autocomplete, Chip, TextField } from "@mui/material";

const CustomAutoComplete = ({
  className,
  label,
  onChange,
  onBlur,
  value,
  inputValues,
  readOnly,
  name,
  error,
  touched,
  getOptionLabel,
  accessor,
  labelAccessor,
  autoComplete,
  isViewMode,
  customHelperText,
  sx,
  limitTags = 6,
}) => {
  return (
    <Autocomplete
      sx={sx}
      multiple
      className={className}
      onChange={onChange}
      autoComplete={autoComplete ? "on" : "off"}
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
      limitTags={limitTags}
      renderTags={(value, getTagProps) =>
        value?.map((option, index) => (
          <Chip
            key={index}
            variant="outlined"
            label={option?.name || option?.[labelAccessor]}
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
            error={Boolean(customHelperText || (touched && error))}
            helperText={customHelperText || (touched && error ? error : " ")}
            fullWidth
            onKeyDown={(e) => {
              if (e.charCode === 13) {
                e.preventDefault();
              }
            }}
          />
        );
      }}
    />
  );
};

export default CustomAutoComplete;
