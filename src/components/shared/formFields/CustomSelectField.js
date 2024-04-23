import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import propTypes from "prop-types";

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
  error,
  customHelperText,
  accessor,
  getOptionLabel,
  autoComplete,
}) => {
  return (
    <Box style={style}>
      <FormControl
        fullWidth
        error={Boolean(customHelperText || (touched && error))}
      >
        <InputLabel id="demo-simple-select-error-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-error-label"
          value={value && inputValues?.length ? value : ""}
          label={label}
          onChange={onChange}
          variant={variant || "outlined"}
          autoComplete={autoComplete}
          fullWidth
          onOpen={onOpen}
          name={name}
          onBlur={onBlur}
          error={Boolean(customHelperText || (touched && error))}
          className={className}
          style={fieldStyle}
          inputProps={{
            readOnly: Boolean(isViewMode),
            disabled: Boolean(disabled),
          }}
        >
          {inputValues?.map((option, index) => {
            return (
              <MenuItem
                key={index + option?.id}
                value={option?.[accessor] || option?.id || option?.value}
              >
                {getOptionLabel(option) ||
                  option?.[accessor] ||
                  option?.name ||
                  option?.label ||
                  "No data Found"}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText error>
          {customHelperText || (touched && error) || " "}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

CustomSelectField.propTypes = {
  className: propTypes.string,
  label: propTypes.string,
  onChange: propTypes.func,
  onBlur: propTypes.func,
  value: propTypes.string,
  inputValues: propTypes.array,
  variant: propTypes.string,
  name: propTypes.string,
  error: propTypes.string,
  touched: propTypes.bool,
  getOptionLabel: propTypes.func,
  accessor: propTypes.string,
  autoComplete: propTypes.string,
  isViewMode: propTypes.bool,
  customHelperText: propTypes.string,
  onOpen: propTypes.any,
  disabled: propTypes.bool,
  fieldStyle: propTypes.object,
  style: propTypes.object,
};
