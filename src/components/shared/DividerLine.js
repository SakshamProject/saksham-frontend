import { Divider } from "@mui/material";
import propTypes from "prop-types";
import { theme } from "../../styles";

export const DividerLine = ({
  color = theme.palette?.commonColor?.darkBlue,
  gap,
}) => {
  return (
    <Divider
      style={{
        background: color,
        borderRadius: 20,
        minHeight: 2,
        margin: gap || "",
      }}
    />
  );
};

DividerLine.propTypes = {
  color: propTypes.string,
  gap: propTypes.any,
};
