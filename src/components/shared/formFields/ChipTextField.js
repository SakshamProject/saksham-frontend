import { Chip, Stack, TextField } from "@mui/material";
import { useState } from "react";

import { WithCondition } from "../WithCondition";

export const ChipTextField = ({
  customOnChange = () => {},
  value,
  variant,
  touched,
  errors,
  customHelperText,
  name,
  onBlur,
  label,
  disabled,
  style,
  isViewMode,
  fullWidth,
  autoComplete,
  placeholder,
  chipVariant,
  chipAccessor,
}) => {
  const [chips, setChips] = useState([]);

  const handleDelete = (chipToDelete) => () => {
    setChips((prev) => prev.filter((chip) => chip !== chipToDelete));
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      setChips((prev) => {
        if (!!chipAccessor)
          return [...prev, { [chipAccessor]: e.target.value.trim() }];
        return [...prev, e.target.value.trim()];
      });
      customOnChange({ event: e, value: "", chips });
    }
  };

  return (
    <TextField
      value={value || ""}
      onChange={(e) =>
        customOnChange({ event: e, value: e.target.value, chips })
      }
      onKeyPress={handleInputKeyPress}
      label={label}
      placeholder={placeholder}
      variant={variant || "outlined"}
      type={"text"}
      name={name}
      fullWidth={fullWidth || true}
      autoComplete={autoComplete || false}
      onBlur={onBlur}
      style={style}
      InputLabelProps={{ shrink: true }}
      sx={{
        ".MuiInputBase-root": {
          display: "flex",
          flexDirection: "column",
        },
      }}
      error={Boolean(customHelperText || (touched && errors))}
      helperText={customHelperText || (touched && errors) ? errors : " "}
      InputProps={{
        readOnly: Boolean(isViewMode),
        disabled: disabled,
        startAdornment: (
          <WithCondition isValid={!!chips?.length}>
            <Stack
              direction="row"
              sx={{
                flexWrap: "wrap",
                gap: 1,
                width: "100%",
                paddingTop: 1,
              }}
            >
              {chips?.map((chip, index) => (
                <Chip
                  key={index}
                  label={chip?.[chipAccessor] || chip}
                  variant={chipVariant || ""}
                  onDelete={handleDelete(chip)}
                />
              ))}
            </Stack>
          </WithCondition>
        ),
      }}
    />
  );
};
