import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export const CustomSelectField = ({
  label,
  variant,
  inputValues,
  name,
  onChange,
  onBlur,
  value = "",
  className,
  style,
  fieldStyle,
  onOpen,
  isViewMode,
  disabled,
  touched,
  errors,
  customHelperText,
  accessor,
  getOptionLabel,
  autoComplete,
}) => {
  return (
    <Box style={style}>
      <FormControl
        fullWidth
        error={Boolean(customHelperText || (touched && errors))}
      >
        <InputLabel id="demo-simple-select-error-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-error-label"
          id="demo-simple-select"
          value={value && inputValues?.length ? value : ""}
          label={label}
          onChange={onChange}
          variant={variant || "outlined"}
          autoComplete={autoComplete}
          fullWidth
          onOpen={onOpen}
          name={name}
          onBlur={onBlur}
          error={Boolean(customHelperText || (touched && errors))}
          className={className}
          style={fieldStyle}
          inputProps={{
            readOnly: Boolean(isViewMode),
            disabled: Boolean(disabled),
          }}
        >
          {inputValues?.map((option, index) => {
            return (
              <MenuItem key={index} value={option?.id || option?.value}>
                {(getOptionLabel && getOptionLabel(option)) ||
                  option?.[accessor] ||
                  option?.name ||
                  option?.label ||
                  "No data Found"}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText error>
          {customHelperText || (touched && errors) || " "}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};
