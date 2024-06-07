import { Box, Checkbox, FormLabel, styled } from "@mui/material";
import propTypes from "prop-types";

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: 0,
  margin: 0,
  marginRight: 1,
  "&.Mui-checked": {
    color: theme.palette?.commonColor?.blue,
  },
  "&.MuiCheckbox-indeterminate": {
    color: theme.palette?.commonColor?.blue,
  },
}));

const StyledLabel = styled(FormLabel)(({ theme }) => ({
  color: theme.palette?.shadowColor?.dark,
  cursor: "pointer",
  paddingTop: "2px",
  userSelect: "none",
}));

export const CustomCheckBox = ({
  name = "",
  label = "",
  onChange,
  checked,
  isViewMode,
  disabled,
  style,
  indeterminate,
  labelStyle,
}) => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        ...style,
      }}
    >
      <StyledCheckbox
        id={name}
        name={name}
        checked={Boolean(checked)}
        indeterminate={indeterminate}
        disabled={isViewMode || disabled}
        onChange={onChange}
        inputProps={{ "aria-label": "controlled" }}
      />

      <StyledLabel
        htmlFor={name}
        sx={{
          ...labelStyle,
        }}
      >
        {label}
      </StyledLabel>
    </Box>
  );
};

CustomCheckBox.propTypes = {
  label: propTypes.string,
  onChange: propTypes.func,
  name: propTypes.string,
  checked: propTypes.bool,
  isViewMode: propTypes.bool,
  disabled: propTypes.bool,
  style: propTypes.object,
  indeterminate: propTypes.bool,
  labelStyle: propTypes.object,
};
