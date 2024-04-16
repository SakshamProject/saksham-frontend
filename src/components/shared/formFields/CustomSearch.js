import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

export const CustomSearch = ({
  label,
  width,
  height,
  name,
  value,
  onChange,
  autoComplete,
}) => {
  return (
    <TextField
      sx={{
        width: width || "100%",
        fontSize: "18px",
        ".MuiInputBase-root-MuiOutlinedInput-root": {
          height: height || "40px",
          paddingLeft: "5px",
        },
      }}
      name={name || ""}
      value={value || ""}
      autoComplete={autoComplete ? "on" : "off"}
      onChange={onChange ? onChange : () => {}}
      placeholder={label || ""}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <Search sx={{ width: "25px", height: "25px" }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
