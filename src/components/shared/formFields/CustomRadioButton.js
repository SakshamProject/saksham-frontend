import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { styled } from "@mui/system";

const RadioBox = styled("div")(({ rowbreak }) => ({
  display: "flex",
  alignItems: rowbreak ? "left" : "center",
  flexDirection: rowbreak && "column",
}));

export const CustomRadioButton = ({
  inputValues,
  name,
  onChange,
  onBlur,
  value = "",
  labelStyle,
  label,
  style,
  rowBreak,
  disabled,
  defaultValue,
  isViewMode,
  accessor,
  touched,
  errors,
  customHelperText,
}) => {
  return (
    <FormControl style={style}>
      <RadioBox
        rowbreak={rowBreak}
        style={{ justifyContent: "space-between", gap: 4 }}
      >
        <span
          style={{
            marginRight: "20px",
            fontSize: "18px",
            fontWeight: 500,
            color: "#000000de",
            ...labelStyle,
          }}
        >
          {label}
        </span>
        <RadioGroup
          aria-label="demo-radio-buttons-group-label"
          name={name}
          onChange={!isViewMode ? onChange : () => {}}
          onBlur={onBlur}
          error={Boolean(customHelperText || (touched && errors)).toString()}
          value={value || ""}
          defaultValue={defaultValue}
          row
        >
          {inputValues?.map((option, key) => {
            return (
              <FormControlLabel
                value={option[accessor]}
                control={<Radio />}
                label={option?.name || option?.label}
                key={key}
                name={name}
                disabled={disabled}
              />
            );
          })}
        </RadioGroup>
      </RadioBox>
      <FormHelperText error>
        {customHelperText || (touched && errors) || " "}
      </FormHelperText>
    </FormControl>
  );
};
