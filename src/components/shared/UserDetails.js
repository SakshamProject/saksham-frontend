import { Typography, styled } from "@mui/material";
import propTypes from "prop-types";

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette?.primary?.contrastText,
  fontSize: 16,
  textTransform: "capitalize",
}));

export const UserDetails = ({ userInfo, color }) => (
  <>
    <CustomTypography sx={{ color }}>
      {userInfo?.person?.name || userInfo?.name || "Anonymous"}
    </CustomTypography>

    <CustomTypography sx={{ fontSize: "12px", color }}>
      {userInfo?.designation?.name || userInfo?.role || "Unknown"}
    </CustomTypography>
  </>
);

UserDetails.propTypes = {
  userInfo: propTypes.any,
  color: propTypes.string,
};
