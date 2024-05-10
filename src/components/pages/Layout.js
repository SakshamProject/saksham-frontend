import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CODES, COOKIE_KEYS } from "../../constants/globalConstants";
import { getSideMenus } from "../../constants/menus";
import useResponsive from "../../hooks/useResponsive";
import { ADMIN_ROUTES } from "../../routes";
import { ROUTE_PATHS } from "../../routes/routePaths";
import {
  AppContainerLayout,
  AppMainContainer,
  AppMainLayout,
} from "../../styles/index";
import { getCookie } from "../../utils/cookie";
import { objectDecryption } from "../../utils/encryptionAndDecryption";
import { CustomLoader, SideBarNavigation, WithCondition } from "../shared";
import { AppBar } from "../shared/AppBar";

export const Layout = () => {
  const userInfo =
    useSelector((state) => state?.userInfo) ||
    objectDecryption(getCookie(COOKIE_KEYS?.USER_INFO));
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isTablets } = useResponsive();

  useEffect(() => {
    if (pathname === ROUTE_PATHS?.LAYOUT) {
      if (userInfo?.role === CODES?.SEVA_KENDRA) {
        const userPage = ADMIN_ROUTES?.find(
          (item) => item?.key === userInfo?.designation?.designations[0]
        );
        navigate(userPage?.path);
      } else if (userInfo?.role === CODES?.DIVYANG) {
        navigate(ROUTE_PATHS?.MY_PROFILE);
      } else if (userInfo?.role === CODES?.ADMIN) {
        navigate(ROUTE_PATHS?.DASHBOARD);
      } else {
        navigate(ROUTE_PATHS?.LOGIN);
      }
    }
  }, [pathname]); //eslint-disable-line

  return (
    <AppContainerLayout>
      <AppBar />

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
