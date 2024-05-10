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
import { dispatchUserInfo } from "../utils/dispatch.js";
import { objectDecryption } from "../utils/encryptionAndDecryption.js";
import { CustomLoader, UserNotification } from "./shared";
import NotFound from "./shared/NotFound.js";

const Root = () => {
  const userInfoSelector = useSelector((state) => state?.userInfo);
  const userInfo =
    userInfoSelector || objectDecryption(getCookie(COOKIE_KEYS?.USER_INFO));
  const isLoading = useSelector((state) => state?.isLoading);
  const snackbar = useSelector((state) => state?.snackbar);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = getCookie(COOKIE_KEYS?.TOKEN);

  useEffect(() => {
    if (
      [ROUTE_PATHS?.RESET_PASSWORD, ROUTE_PATHS?.FORGOT_PASSWORD].includes(
        pathname
      )
    ) {
      navigate(ROUTE_PATHS?.LOGIN);
    } else if (token && userInfo && !userInfoSelector) {
      dispatchUserInfo(userInfo);
    }
  }, []); //eslint-disable-line

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? <CustomLoader /> : null}

      <Routes>
        {routeMapping(GENERAL_ROUTES)}

        <Route path={ROUTE_PATHS?.LAYOUT} element={<ProtectedRoute />}>
          {routeMapping(
            getRoutes({
              role: userInfo?.role,
              designations: userInfo?.designation?.designations,
            })
          )}
        </Route>

        <Route path={ROUTE_PATHS?.NOT_FOUND} element={<NotFound />} />
      </Routes>

      {snackbar ? <UserNotification /> : null}
    </ThemeProvider>
  );
};

export default Root;
