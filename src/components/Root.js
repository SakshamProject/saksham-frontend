import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { COOKIE_KEYS } from "../constants/globalConstants.js";
import { ProtectedRoute } from "../routes/ProtectedRoute.js";
import { getRoutes } from "../routes/index.js";
import { routeMapping } from "../routes/routeMapping.js";
import { ROUTE_PATHS } from "../routes/routePaths.js";
import { theme } from "../styles/theme";
import { getCookie } from "../utils/cookie.js";
import Login from "./pages/login/Login";
import { CustomLoader, UserNotification } from "./shared";
import NotFound from "./shared/NotFound.js";

const Root = () => {
  const snackBar = useSelector((state) => state?.snackBar);
  const isLoading = useSelector((state) => state?.isLoading);
  const userInfo = useSelector((state) => state?.userInfo);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    if (!getCookie(COOKIE_KEYS.TOKEN)) {
      navigate(ROUTE_PATHS.LOGIN);
      return "";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? <CustomLoader /> : null}

      <Routes>
        <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />

        <Route path={ROUTE_PATHS.LAYOUT} element={<ProtectedRoute />}>
          {routeMapping(
            getRoutes({ designations: userInfo?.designation?.features })
          )}
        </Route>

        <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFound />} />
      </Routes>

      {snackBar ? <UserNotification /> : <></>}
    </ThemeProvider>
  );
};

export default Root;
