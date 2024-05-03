import { Typography, styled } from "@mui/material";
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
} from "../../styles";
import { removeAllCookie } from "../../utils/cookie";
import { RightMenu } from "./RightMenu";

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette?.commonColor?.black,
}));

const StyledLogo = styled("img")({
  height: "45px",
  width: "45px",
});

export const AppBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const userInfo = useSelector((state) => state?.userInfo);
  const userName = userInfo?.name;
  const userImage = userInfo?.profileImageUrl;
  const userRole = userInfo?.role;

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const redirect = (routePath) => {
    if (routePath === ROUTE_PATHS.LOGIN) {
      removeAllCookie();
    }
    navigate(routePath);
    handleClose();
  };

  return (
    <AppBarLayout>
      <AppLogo>
        <StyledLogo src={companyLogo} alt="company logo" />
      </AppLogo>

      <AppProfile onClick={handleClick}>
        <AppProfileDetails>
          <CustomTypography fontSize={18} fontWeight={500}>
            {userName || "Anonymous"}
          </CustomTypography>

          <CustomTypography fontSize={13}>
            {userRole || "Unknown"}
          </CustomTypography>
        </AppProfileDetails>

        <CommonAvatar
          src={userImage || defaultAvatar}
          onError={(e) => (e.target.src = defaultAvatar)}
          alt="profile avatar"
        />
      </AppProfile>

      <RightMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        open={Boolean(anchorEl)}
        redirect={redirect}
      />
    </AppBarLayout>
  );
};
