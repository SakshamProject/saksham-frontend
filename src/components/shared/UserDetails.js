import { Typography, styled } from "@mui/material";
import propTypes from "prop-types";

const CustomTypography = styled(Typography)(({ theme, color, fontSize }) => ({
  color: color || theme.palette?.primary?.contrastText,
  fontSize: fontSize || 16,
  textTransform: "capitalize",
  cursor: "pointer",
}));

export const UserDetails = ({ userInfo, style, color }) => (
  <>
    <CustomTypography style={{ ...style }} color={color}>
      {userInfo?.name || userInfo?.person?.name || "Anonymous"}
    </CustomTypography>

    <CustomTypography color={color} style={{ ...style, fontSize: "12px" }}>
      {userInfo?.designation?.name || userInfo?.role || "Unknown"}
    </CustomTypography>
  </>
);

UserDetails.propTypes = {
  userInfo: propTypes.object,
  style: propTypes.object,
  color: propTypes.string,
};
