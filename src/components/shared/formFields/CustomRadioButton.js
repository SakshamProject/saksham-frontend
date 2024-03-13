import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { styled } from "@mui/system";
import * as React from "react";

const RadioBox = styled("div")(({ rowBreak }) => ({
  display: "flex",
  alignItems: rowBreak ? "left" : "center",
  flexDirection: rowBreak && "column",
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
      <RadioBox rowBreak={rowBreak} style={{ justifyContent: "space-between" }}>
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
          {inputValues?.map((option, i) => {
            return (
              <FormControlLabel
                value={option[accessor]}
                control={<Radio />}
                label={option?.name || option?.label}
                key={i}
                name={name}
                disabled={disabled}
              />
            );
          })}
        </RadioGroup>
      </RadioBox>
      <FormHelperText error>
        {customHelperText || (touched && errors)}
      </FormHelperText>
    </FormControl>
  );
};
