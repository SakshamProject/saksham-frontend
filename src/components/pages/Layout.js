import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getSideMenus } from "../../constants/menus";
import useResponsive from "../../hooks/useResponsive";
import {
  AppContainerLayout,
  AppMainContainer,
  AppMainLayout,
} from "../../styles/index";
import { CustomLoader, SideBarNavigation, WithCondition } from "../shared";
import { AppBar } from "../shared/AppBar";

export const Layout = () => {
  const userInfo = useSelector((state) => state?.userInfo);
  const { isTablets } = useResponsive();

  return (
    <AppContainerLayout>
      <AppBar />

      <AppMainContainer>
        <WithCondition isValid={!isTablets}>
          <SideBarNavigation
            menuList={getSideMenus({
              designations: userInfo?.designations,
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
