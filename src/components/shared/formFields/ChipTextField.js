import { Chip, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

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
  placeholder,
  chipVariant,
  chipValue = [],
  chipAccessor = "",
  handleKeyPress = () => {},
}) => {
  const [chips, setChips] = useState(chipValue);

  const handleDelete = (chipToDelete) => () => {
    setChips((prev) => {
      const currentChips = prev.filter(
        (chip) =>
          chip?.[chipAccessor] !== chipToDelete?.[chipAccessor] ||
          chip !== chipToDelete
      );
      handleKeyPress(currentChips);
      return currentChips;
    });
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && value.trim() !== "" && !errors) {
      setChips((prev) => {
        const currentChips = !!chipAccessor
          ? [...prev, { [chipAccessor]: e.target.value.trim() }]
          : [...prev, e.target.value.trim()];
        customOnChange({ event: e, value: "" });
        handleKeyPress(currentChips);
        return currentChips;
      });
    }
  };

  useEffect(() => {
    if (chipValue?.length === 0) setChips([]);
    else setChips([...chipValue]);
  }, [chipValue]);

  return (
    <TextField
      value={value || ""}
      onChange={(e) => customOnChange({ event: e, value: e.target.value })}
      onKeyPress={handleInputKeyPress}
      label={label}
      placeholder={placeholder}
      variant={variant || "outlined"}
      type={"text"}
      name={name}
      fullWidth={fullWidth || true}
      onBlur={onBlur}
      style={style}
      sx={{
        ".MuiInputBase-root": {
          display: "flex",
          flexDirection: "column",
          input: {
            paddingLeft: "16px",
          },
        },
      }}
      error={Boolean(customHelperText || (touched && errors))}
      helperText={customHelperText || (touched && errors) || " "}
      InputProps={{
        readOnly: Boolean(isViewMode),
        disabled: disabled,
        startAdornment: !!chips?.length ? (
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
                label={chip?.[chipAccessor] || chip || ""}
                variant={chipVariant || ""}
                onDelete={handleDelete(chip)}
              />
            ))}
          </Stack>
        ) : null,
      }}
    />
  );
};
