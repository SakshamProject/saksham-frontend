import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { styled } from "@mui/system";
import propTypes from "prop-types";

const RadioBox = styled("div")(({ rowbreak }) => ({
  display: "flex",
  alignItems: rowbreak ? "left" : "center",
  flexDirection: rowbreak ? "column" : "row",
}));

const StyledLabel = styled("span")(({ theme }) => ({
  marginRight: "20px",
  fontSize: "18px",
  fontWeight: 500,
  color: theme.palette?.shadowColor?.dark,
}));

const StyledRadio = styled(Radio)(({ theme }) => ({
  "&.Mui-checked": {
    color: theme.palette?.commonColor?.blue,
  },
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
  isHelperText = true,
}) => {
  return (
    <FormControl style={{ ...style }}>
      <RadioBox
        rowbreak={rowBreak}
        style={{ justifyContent: "space-between", gap: 4 }}
      >
        <StyledLabel style={{ ...labelStyle }}>{label}</StyledLabel>
        <RadioGroup
          aria-label="demo-radio-buttons-group-label"
          name={name}
          onChange={!isViewMode ? onChange : () => {}}
          onBlur={onBlur}
          error={customHelperText || (touched && errors)}
          value={value || ""}
          defaultValue={defaultValue}
          row
        >
          {inputValues?.map((option, key) => {
            return (
              <FormControlLabel
                value={option[accessor] || option?.id || option?.name}
                control={<StyledRadio onChange={(e) => e.target.blur()} />}
                label={option?.name || option?.label}
                key={key + option?.name}
                name={name}
                disabled={disabled}
              />
            );
          })}
        </RadioGroup>
      </RadioBox>
      {isHelperText ? (
        <FormHelperText error>
          {customHelperText || (touched && errors) || " "}
        </FormHelperText>
      ) : (
        <></>
      )}
    </FormControl>
  );
};

CustomRadioButton.propTypes = {
  value: propTypes.oneOfType([propTypes.string, propTypes.bool]),
  touched: propTypes.bool,
  errors: propTypes.string,
  customHelperText: propTypes.string,
  name: propTypes.string,
  label: propTypes.string,
  disabled: propTypes.bool,
  style: propTypes.object,
  isViewMode: propTypes.bool,
  inputValues: propTypes.array,
  onChange: propTypes.func,
  labelStyle: propTypes.object,
  rowBreak: propTypes.bool,
  defaultValue: propTypes.any,
  onBlur: propTypes.func,
  accessor: propTypes.string,
  isHelperText: propTypes.bool,
};
