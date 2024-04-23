import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { SIDE_MENU } from "../../constants/menus";
import {
  AppContainerLayout,
  AppMainContainer,
  AppMainLayout,
} from "../../styles/index";
import { CustomLoader, SideBarNavigation } from "../shared";
import { AppBar } from "../shared/AppBar";

export const Layout = () => {
  return (
    <AppContainerLayout>
      <AppBar />

      <AppMainContainer>
        <SideBarNavigation menuList={SIDE_MENU} />

        <Suspense fallback={<CustomLoader />}>
          <AppMainLayout>
            <Outlet />
          </AppMainLayout>
        </Suspense>
      </AppMainContainer>
    </AppContainerLayout>
  );
};
