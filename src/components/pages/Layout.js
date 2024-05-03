import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getSideMenus } from "../../constants/menus";
import {
  AppContainerLayout,
  AppMainContainer,
  AppMainLayout,
} from "../../styles/index";
import { CustomLoader, SideBarNavigation } from "../shared";
import { AppBar } from "../shared/AppBar";

export const Layout = () => {
  const userInfo = useSelector((state) => state?.userInfo);

  return (
    <AppContainerLayout>
      <AppBar />

      <AppMainContainer>
        <SideBarNavigation
          menuList={getSideMenus(userInfo?.designation?.features)}
        />

        <Suspense fallback={<CustomLoader />}>
          <AppMainLayout>
            <Outlet />
          </AppMainLayout>
        </Suspense>
      </AppMainContainer>
    </AppContainerLayout>
  );
};
