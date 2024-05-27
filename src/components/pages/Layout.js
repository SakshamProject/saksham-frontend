import { Box } from "@mui/material";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CODES } from "../../constants/globalConstants";
import { getSideMenus } from "../../constants/menus";
import useResponsive from "../../hooks/useResponsive";
import { ADMIN_ROUTES } from "../../routes";
import { ROUTE_PATHS } from "../../routes/routePaths";
import {
  AppContainerLayout,
  AppMainContainer,
  AppMainLayout,
} from "../../styles/index";
import { CustomLoader, SideBarNavigation, WithCondition } from "../shared";
import { AppBar } from "../shared/AppBar";

export const Layout = () => {
  const userInfo = useSelector((state) => state?.userInfo);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isTablets, isMobile } = useResponsive();

  useEffect(() => {
    if (
      pathname === ROUTE_PATHS?.LAYOUT &&
      userInfo?.role === CODES?.SEVA_KENDRA
    ) {
      const userPage = ADMIN_ROUTES?.find(
        (item) => item?.key === userInfo?.designation?.designations[0]
      );
      navigate(userPage?.path);
    } else if (userInfo?.role === CODES?.DIVYANG) {
      navigate(ROUTE_PATHS?.PROFILE);
    } else {
      navigate(ROUTE_PATHS?.DASHBOARD);
    }
  }, [pathname]); //eslint-disable-line

  return (
    <AppContainerLayout>
      <AppBar />

      <WithCondition isValid={isMobile}>
        <Box sx={{ height: "56px" }}></Box>
      </WithCondition>

      <AppMainContainer>
        <WithCondition isValid={!isTablets}>
          <SideBarNavigation
            menuList={getSideMenus({
              designations: userInfo?.designation?.designations,
              role: userInfo?.role,
            })}
          />
        </WithCondition>

        <Suspense fallback={<CustomLoader />}>
          <AppMainLayout>
            <Outlet />
          </AppMainLayout>
        </Suspense>
      </AppMainContainer>
    </AppContainerLayout>
  );
};
