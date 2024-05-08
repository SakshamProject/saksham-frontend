import { Typography, styled, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/avatar.png";
import companyLogo from "../../assets/logo.png";
import { ROUTE_PATHS } from "../../routes/routePaths";
import {
  AppBarLayout,
  AppLogo,
  AppProfile,
  AppProfileDetails,
  CommonAvatar,
  StyledLogo,
  StyledName,
  theme,
} from "../../styles";
import { removeAllCookie } from "../../utils/cookie";
import CustomTooltip from "./CustomTooltip";
import { RightMenu } from "./RightMenu";
import { WithCondition } from "./WithCondition";

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette?.primary?.contrastText,
  fontSize: 16,
  textTransform: "capitalize",
}));

export const AppBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const userInfo = useSelector((state) => state?.userInfo);
  const isTablets = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const redirect = (routePath) => {
    if (routePath === ROUTE_PATHS?.LOGIN) removeAllCookie();
    navigate(routePath);
    handleClose();
  };

  return (
    <AppBarLayout>
      <AppLogo>
        <CustomTooltip title={"logo"}>
          <StyledLogo src={companyLogo} alt="company logo" />
        </CustomTooltip>
        <StyledName>Saksham</StyledName>
      </AppLogo>

      <WithCondition isValid={!isTablets}>
        <AppProfile onClick={handleClick}>
          <AppProfileDetails>
            <CustomTypography>{userInfo?.name || "Anonymous"}</CustomTypography>

            <CustomTypography sx={{ fontSize: "12px" }}>
              {userInfo?.userRole || "Unknown"}
            </CustomTypography>
          </AppProfileDetails>

          <CustomTooltip title={"profile"} placement={"left"}>
            <CommonAvatar
              src={userInfo?.profileImg || defaultAvatar}
              onError={(e) => (e.target.src = defaultAvatar)}
              alt="profile"
            />
          </CustomTooltip>
        </AppProfile>
      </WithCondition>

      <RightMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        open={Boolean(anchorEl)}
        redirect={redirect}
      />
    </AppBarLayout>
  );
};
