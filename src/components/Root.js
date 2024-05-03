import { ThemeProvider } from "@emotion/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { COOKIE_KEYS } from "../constants/globalConstants.js";
import { ProtectedRoute } from "../routes/ProtectedRoute.js";
import { GENERAL_ROUTES, getRoutes } from "../routes/index.js";
import { routeMapping } from "../routes/routeMapping.js";
import { ROUTE_PATHS } from "../routes/routePaths.js";
import { theme } from "../styles/theme";
import { getCookie } from "../utils/cookie.js";
import { CustomLoader, UserNotification } from "./shared";
import NotFound from "./shared/NotFound.js";

const Root = () => {
  const globalStates = useSelector((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useSelector((state) => state?.isLoading);
  const snackbarMsg = globalStates?.snackbar;
  const designations = globalStates?.userInfo?.designation?.features;

  const getUserInfo = () => {
    if (
      !getCookie(COOKIE_KEYS.TOKEN) ||
      [ROUTE_PATHS.FORGOT_PASSWORD, ROUTE_PATHS.RESET_PASSWORD]?.includes(
        location?.pathname
      )
    ) {
      navigate(ROUTE_PATHS.LOGIN);
    } else {
      console.log("get user details by id, when refresh");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []); //eslint-disable-line

  return (
    <ThemeProvider theme={theme}>
      {loading ? <CustomLoader /> : null}

      <Routes>
        {routeMapping(GENERAL_ROUTES)}

        <Route path={ROUTE_PATHS.LAYOUT} element={<ProtectedRoute />}>
          {routeMapping(getRoutes({ designations }))}
        </Route>

        <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFound />} />
      </Routes>

      {snackbarMsg ? <UserNotification /> : null}
    </ThemeProvider>
  );
};

export default Root;
