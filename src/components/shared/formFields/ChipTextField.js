import { Chip, Stack, TextField } from "@mui/material";
import propTypes from "prop-types";
import { dispatchSnackbarError } from "../../../utils/dispatch";

export const ChipTextField = ({
  customOnChange,
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
  autoComplete,
  placeholder,
  chipVariant,
  chipValue,
  chipAccessor,
  onKeyPress,
  onKeyDown,
}) => {
  const handleDelete = (chipToDelete) => () => {
    const currentChips = chipValue?.filter(
      (chip) =>
        (chip?.[chipAccessor] || chip)?.toLowerCase() !==
        (chipToDelete?.[chipAccessor] || chipToDelete)?.toLowerCase()
    );
    onKeyPress(currentChips);
  };

  const handleInputKeyPress = (e) => {
    const currentValue = e?.target?.value.trim();
    if (
      (e?.key === "Enter" || e?.keycode === 13) &&
      !!currentValue &&
      !errors
    ) {
      const duplicate = chipValue?.some(
        (item) =>
          (item?.[chipAccessor] || item)?.toLowerCase() ===
          currentValue?.toLowerCase()
      );

      if (duplicate) {
        dispatchSnackbarError("Duplicate value");
        return;
      }

      const currentChips = chipAccessor
        ? [...chipValue, { [chipAccessor]: currentValue }]
        : [...chipValue, currentValue];
      customOnChange({ event: e, value: "" });
      onKeyPress(currentChips);
    }
  };

  const fieldStyle = {
    ".MuiInputBase-root": {
      display: "flex",
      flexDirection: "column",
      paddingLeft: "14px",
      input: {
        padding: "16px 14px",
      },
    },
    ...style,
  };

  return (
    <TextField
      fullWidth
      value={value}
      onChange={(e) =>
        customOnChange({
          event: e,
          value: e.target.value,
        })
      }
      autoComplete={autoComplete ? "on" : "off"}
      label={label}
      placeholder={placeholder}
      variant={variant || "outlined"}
      type={"text"}
      name={name}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      sx={fieldStyle}
      error={Boolean(customHelperText || (touched && errors))}
      helperText={customHelperText || (touched && errors) || " "}
      InputProps={{
        readOnly: isViewMode,
        disabled,
        onKeyPress: (e) => handleInputKeyPress(e),
        startAdornment: chipValue?.length ? (
          <Stack
            direction="row"
            sx={{
              flexWrap: "wrap",
              gap: 1,
              width: "100%",
              paddingTop: 1,
            }}
          >
            {chipValue?.map((chip, key) => (
              <Chip
                key={key + chip?.name}
                label={chip?.[chipAccessor] || chip?.name || chip || ""}
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

ChipTextField.propTypes = {
  touched: propTypes.bool,
  disabled: propTypes.bool,
  isViewMode: propTypes.bool,
  autoComplete: propTypes.bool,
  customOnChange: propTypes.func.isRequired,
  onBlur: propTypes.func,
  onKeyPress: propTypes.func,
  onKeyDown: propTypes.func,
  value: propTypes.object,
  style: propTypes.object,
  chipValue: propTypes.array,
  variant: propTypes.string,
  errors: propTypes.string,
  customHelperText: propTypes.string,
  name: propTypes.string,
  label: propTypes.string,
  placeholder: propTypes.string,
  chipVariant: propTypes.string,
  chipAccessor: propTypes.string,
};
