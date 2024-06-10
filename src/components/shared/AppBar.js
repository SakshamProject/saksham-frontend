import { Menu } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postApiService } from "../../api/api";
import { API_PATHS } from "../../api/apiPaths";
import companyLogo from "../../assets/logo.png";
import { CODES } from "../../constants/globalConstants";
import { RIGHT_SIDE_MENU } from "../../constants/menus";
import useResponsive from "../../hooks/useResponsive";
import { ROUTE_PATHS } from "../../routes/routePaths";
import {
  AppBarLayout,
  AppLogo,
  AppProfile,
  AppProfileDetails,
  StyledIconButton,
  StyledLogo,
  StyledName,
} from "../../styles";
import { removeAllCookie } from "../../utils/cookie";
import CustomTooltip from "./CustomTooltip";
import { ResponsiveMenu } from "./ResponsiveMenu";
import { RightMenu } from "./RightMenu";
import { UserDetails } from "./UserDetails";
import { UserProfile } from "./UserProfile";
import { WithCondition } from "./WithCondition";

export const AppBar = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state?.userInfo);
  const { isTablets, theme } = useResponsive();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => {
      const apiPath =
        userInfo?.role === CODES?.SEVA_KENDRA
          ? API_PATHS?.LOGOUT
          : API_PATHS?.LOGOUT_DIVYANG;
      return postApiService(apiPath);
    },
  });

  const redirect = (routePath) => {
    if (routePath === ROUTE_PATHS?.LOGIN) {
      removeAllCookie();
      if (userInfo?.role !== CODES?.ADMIN) {
        mutate();
      }
    }
    navigate(routePath);
    handleClose();
    setDrawerOpen(false);
  };

  useEffect(() => {
    if (!isTablets) {
      setDrawerOpen(false);
    }
  }, [isTablets]);

  return (
    <AppBarLayout>
      <AppLogo>
        <WithCondition isValid={isTablets}>
          <CustomTooltip title={"Menu"}>
            <StyledIconButton
              sx={{ color: theme.palette?.primary?.contrastText }}
              onClick={() => setDrawerOpen(true)}
            >
              <Menu />
            </StyledIconButton>
          </CustomTooltip>
        </WithCondition>

        <StyledLogo src={companyLogo} alt="company logo" />

        <StyledName>Saksham</StyledName>
      </AppLogo>

      <WithCondition isValid={!isTablets}>
        <AppProfile onClick={handleClick}>
          <AppProfileDetails>
            <UserDetails userInfo={userInfo} />
          </AppProfileDetails>

          <UserProfile userInfo={userInfo} />
        </AppProfile>

        <RightMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          open={Boolean(anchorEl)}
          redirect={redirect}
          menuList={RIGHT_SIDE_MENU(userInfo?.role)}
        />
      </WithCondition>

      <WithCondition isValid={isTablets}>
        <ResponsiveMenu
          redirect={redirect}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      </WithCondition>
    </AppBarLayout>
  );
};
