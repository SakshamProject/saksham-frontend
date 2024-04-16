import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export const CustomTimePicker = ({
  label,
  onChange,
  value,
  name,
  isViewMode,
  maxTime,
  minTime,
  className,
  disabled,
  touched,
  onBlur,
  errors,
  customHelperText,
  setTouched,
  views,
  autoComplete = false,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        views={views || ["hours", "minutes"]}
        className={className}
        label={label}
        name={name}
        readOnly={Boolean(isViewMode)}
        disabled={disabled}
        onBlur={onBlur}
        value={value ? new Date(value) : null}
        fullWidth
        onChange={onChange || (() => {})}
        minTime={minTime ? new Date(minTime) : null}
        maxTime={maxTime ? new Date(maxTime) : null}
        autoFocus={Boolean(value)}
        error={Boolean(customHelperText || (touched && errors))}
        helperText={customHelperText || (touched && errors) || " "}
        closeOnSelect
        sx={{ width: "100%" }}
        slotProps={{
          textField: {
            autoComplete: autoComplete,
            onBlur: (e) => {
              !touched?.lastDonatedDate && setTouched(name, e.type === "blur");
            },
            error: !!touched && !!errors,
            helperText: (!!touched && errors) || " ",
          },
        }}
      />
    </LocalizationProvider>
  );
};
