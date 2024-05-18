import { Typography, styled } from "@mui/material";
import propTypes from "prop-types";

const CustomTypography = styled(Typography)(({ theme, color, fontSize }) => ({
  color: color || theme.palette?.primary?.contrastText,
  fontSize: fontSize || 16,
  textTransform: "capitalize",
}));

export const UserDetails = ({ userInfo, color }) => (
  <>
    <CustomTypography color={color}>
      {userInfo?.person?.name || userInfo?.name || "Anonymous"}
    </CustomTypography>

    <CustomTypography color={color} fontSize={"12px"}>
      {userInfo?.designation?.name || userInfo?.role || "Unknown"}
    </CustomTypography>
  </>
);

UserDetails.propTypes = {
  userInfo: propTypes.object.isRequired,
  color: propTypes.string,
};
