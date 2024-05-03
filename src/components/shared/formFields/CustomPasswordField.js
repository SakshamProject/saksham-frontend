import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import propTypes from "prop-types";
import { useState } from "react";

export const CustomPasswordField = ({
  name,
  onChange,
  value,
  variant,
  onBlur,
  label,
  disabled,
  style,
  isViewMode,
  showEyeIcon,
  touched,
  onKeyDown,
  errors,
  customHelperText,
  placeholder,
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleKeyPress = (e) => {
    return !/^\S+$/.test(e.key) && e.preventDefault();
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      variant={variant || "outlined"}
      type={showPassword ? "text" : "password"}
      name={name}
      fullWidth
      autoComplete={autoComplete || "off"}
      onChange={onChange}
      onBlur={onBlur}
      value={value || ""}
      style={style}
      onKeyDown={onKeyDown}
      error={Boolean(customHelperText || (touched && errors))}
      helperText={customHelperText || (touched && errors) || " "}
      InputProps={{
        readOnly: isViewMode,
        disabled: disabled,
        onKeyPress: (e) => handleKeyPress(e),
        endAdornment: showEyeIcon && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              color="primary"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

CustomPasswordField.propTypes = {
  value: propTypes.oneOfType([propTypes.number, propTypes.string]),
  touched: propTypes.bool,
  errors: propTypes.string,
  customHelperText: propTypes.string,
  name: propTypes.string,
  label: propTypes.string,
  disabled: propTypes.bool,
  style: propTypes.object,
  isViewMode: propTypes.bool,
  autoComplete: propTypes.bool,
  onChange: propTypes.func,
  variant: propTypes.string,
  placeholder: propTypes.string,
  showEyeIcon: propTypes.bool,
  onBlur: propTypes.func,
  onKeyDown: propTypes.func,
};
