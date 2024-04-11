import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

export function CustomDatePicker({
  label,
  onChange,
  value,
  name,
  isViewMode,
  maxDate,
  minDate,
  className,
  style,
  disabled,
  onBlur,
  touched,
  errors,
  setTouched,
  views,
  customHelpertext,
  customOnChange,
}) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DatePicker
          name={name}
          label={label}
          value={value ? dayjs(value) : null}
          minDate={minDate ? dayjs(minDate) : ""}
          maxDate={maxDate ? dayjs(maxDate) : ""}
          views={views || ["year", "month", "day"]}
          style={style}
          autoComplete="off"
          readOnly={Boolean(isViewMode)}
          disabled={disabled}
          closeOnSelect
          className={className}
          onChange={
            customOnChange
              ? customOnChange
              : (value) => {
                  onChange(name, value?.$d ? new Date(value?.$d) : null);
                }
          }
          sx={{ width: "100%" }}
          slotProps={{
            textField: {
              onBlur: (e) => {
                !touched?.lastDonatedDate &&
                  setTouched(name, e.type === "blur");
              },
              error: !!touched && !!errors,
              helperText: !!touched ? errors : " ",
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
}
