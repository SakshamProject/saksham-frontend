import { Divider } from "@mui/material";

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
        minHeight: 2,
        margin: gap ? gap || "30px 0" : "",
      }}
    />
  );
};
