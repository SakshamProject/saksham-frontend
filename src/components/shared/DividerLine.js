import { Divider, createTheme } from "@mui/material";
import { theme } from "../../styles";

export const DividerLine = ({
  color = theme.palette?.backgroundColor?.divider,
  gap,
}) => {
  return (
    <Divider
      style={{
        background: color,
        borderRadius: 20,
        height: 2,
        margin: gap ? "30px 0" : "",
      }}
    />
  );
};
