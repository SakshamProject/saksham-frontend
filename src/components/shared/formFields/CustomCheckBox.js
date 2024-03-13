import { Box, Checkbox, FormLabel } from "@mui/material";

export const CustomCheckBox = ({
  name = "",
  label = "",
  onChange = () => {},
  checked = false,
  isViewMode,
  disabled,
  style = {},
  indeterminate,
}) => {
  return (
    <Box style={{ display: "flex", alignItems: "center", ...style }}>
      <Checkbox
        id={name}
        name={name}
        sx={{ padding: 0, margin: 0, marginRight: 1 }}
        checked={Boolean(checked)}
        indeterminate={indeterminate}
        disabled={isViewMode || disabled}
        onChange={onChange}
        inputProps={{ "aria-label": "controlled" }}
        color="primary"
      />

      <FormLabel htmlFor={name} sx={{ color: "#00000090", cursor: "pointer" }}>
        {label}
      </FormLabel>
    </Box>
  );
};
