import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export const CustomPasswordField = ({
  id,
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
  fixedErrors,
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
      id={id}
      label={label}
      placeholder={placeholder}
      variant={variant ? variant : "outlined"}
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
      helperText={
        customHelperText || (!fixedErrors && touched && errors ? errors : " ")
      }
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
