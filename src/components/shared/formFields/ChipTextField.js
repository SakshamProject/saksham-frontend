import { Chip, Stack, TextField } from "@mui/material";
import useNotify from "../../../hooks/useNotify";

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
  autoComplete,
  fullWidth,
  placeholder,
  chipVariant,
  chipValue = [],
  chipAccessor = "",
  handleKeyPress = () => {},
}) => {
  const { notifyError } = useNotify();

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
        notifyError("Duplicate value");
        return;
      }

      const currentChips = !!chipAccessor
        ? [...chipValue, { [chipAccessor]: e.target.value.trim() }]
        : [...chipValue, e.target.value.trim()];
      customOnChange({ event: e, value: "" });
      handleKeyPress(currentChips);
    }
  };

  return (
    <TextField
      value={value || ""}
      onChange={(e) => customOnChange({ event: e, value: e.target.value })}
      onKeyPress={handleInputKeyPress}
      autoComplete={autoComplete || "off"}
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
        startAdornment: !!chipValue?.length ? (
          <Stack
            direction="row"
            sx={{
              flexWrap: "wrap",
              gap: 1,
              width: "100%",
              paddingTop: 1,
            }}
          >
            {chipValue?.map((chip, index) => (
              <Chip
                key={index}
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
