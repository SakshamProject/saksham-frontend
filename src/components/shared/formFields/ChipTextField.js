import { Chip, Stack, TextField } from "@mui/material";
import propTypes from "prop-types";
import { dispatchNotifyError } from "../../../utils/dispatch";

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
  fullWidth,
  placeholder,
  chipVariant,
  chipValue,
  chipAccessor,
  handleKeyPress,
}) => {
  const handleDelete = (chipToDelete) => () => {
    const currentChips = chipValue?.filter(
      (chip) =>
        (chip?.[chipAccessor] || chip)?.toLowerCase() !==
        (chipToDelete?.[chipAccessor] || chipToDelete)?.toLowerCase()
    );
    handleKeyPress(currentChips);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && !!e.target.value.trim() && !errors) {
      const duplicate = chipValue?.some(
        (item) =>
          (item?.[chipAccessor] || item)?.toLowerCase() ===
          e.target.value.trim()?.toLowerCase()
      );

      if (duplicate) {
        dispatchNotifyError("Duplicate value");
        return;
      }

      const currentChips = chipAccessor
        ? [...chipValue, { [chipAccessor]: e.target.value.trim() }]
        : [...chipValue, e.target.value.trim()];
      customOnChange({ event: e, value: "" });
      handleKeyPress(currentChips);
    }
  };

  return (
    <TextField
      value={value}
      onChange={(e) =>
        customOnChange({
          event: e,
          value: e.target.value,
        })
      }
      autoComplete={autoComplete || "off"}
      label={label}
      placeholder={placeholder}
      variant={variant || "outlined"}
      type={"text"}
      name={name}
      fullWidth={fullWidth}
      onBlur={onBlur}
      sx={{
        ".MuiInputBase-root": {
          display: "flex",
          flexDirection: "column",
          paddingLeft: "14px",
          input: {
            padding: "16px 14px",
          },
        },
        ...style,
      }}
      error={Boolean(customHelperText || (touched && errors))}
      helperText={customHelperText || (touched && errors) || " "}
      InputProps={{
        readOnly: Boolean(isViewMode),
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
  customOnChange: propTypes.func,
  value: propTypes.object,
  variant: propTypes.string,
  touched: propTypes.func,
  errors: propTypes.string,
  customHelperText: propTypes.string,
  name: propTypes.string,
  onBlur: propTypes.func,
  label: propTypes.string,
  disabled: propTypes.bool,
  style: propTypes.object,
  isViewMode: propTypes.bool,
  autoComplete: propTypes.string,
  fullWidth: propTypes.bool,
  placeholder: propTypes.string,
  chipVariant: propTypes.string,
  chipValue: propTypes.array,
  chipAccessor: propTypes.string,
  handleKeyPress: propTypes.func,
};
