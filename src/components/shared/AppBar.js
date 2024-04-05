import { Box, Typography, styled } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import defaultAvatar from "../../assets/avatar.png";
import companyLogo from "../../assets/logo.png";
import { AppBarLayout, AppLogo, AppProfile, CommonAvatar } from "../../styles";
import { RightMenu } from "./RightMenu";

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  color: theme?.palette?.textColor?.main,
}));

const StyledLogo = styled("img")(({ theme }) => {
  return {
    height: "50px",
    width: "50px",
  };
});

const StyledTitle = styled("div")(({ theme }) => {
  return {
    fontFamily: "Roboto",
    fontSize: "24px",
    color: theme?.palette?.textColor?.main,
    fontWeight: "600",
  };
});

export const AppBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const {
    name = "",
    profileImageUrl = "",
    firstName = "",
    lastName = "",
  } = useSelector((state) => state?.userInfo);
  const role = useSelector((state) => state?.role);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const redirect = (routePath) => {
    console.log({ routePath });
    // if (routePath === ROUTE_PATHS.LOGIN) {
    //   removeAllCookie();
    //   dispatch();
    // }
    // navigate(routePath);
    // handleClose();
  };

  console.log({ name, firstName, lastName, profileImageUrl });

  return (
    <AppBarLayout>
      <AppLogo>
        <StyledLogo src={companyLogo} />
        <StyledTitle>Saksham</StyledTitle>
      </AppLogo>

      <AppProfile onClick={handleClick}>
        <Box className="appProfileDetails">
          <CustomTypography fontSize={18} fontWeight={500}>
            {name || !!firstName
              ? `${firstName} ${lastName || ""}`
              : "Anonymous"}
          </CustomTypography>

          <CustomTypography fontSize={14}>
            {role?.role || "Unknown"}
          </CustomTypography>
        </Box>

        <CommonAvatar
          src={profileImageUrl || defaultAvatar}
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
