import { ThemeProvider } from "@emotion/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "../routes/ProtectedRoute.js";
import { GENERAL_ROUTES, getRoutes } from "../routes/index.js";
import { routeMapping } from "../routes/routeMapping.js";
import { ROUTE_PATHS } from "../routes/routePaths.js";
import { theme } from "../styles/theme";
import { CustomLoader, UserNotification } from "./shared";
import NotFound from "./shared/NotFound.js";

const Root = () => {
  const userInfo = useSelector((state) => state?.userInfo);
  const isLoading = useSelector((state) => state?.isLoading);
  const snackbar = useSelector((state) => state?.snackbar);
  const navigate = useNavigate();
  const location = useLocation();
  const verifyRoutes = [
    ROUTE_PATHS?.FORGOT_PASSWORD,
    ROUTE_PATHS?.RESET_PASSWORD,
    ROUTE_PATHS?.LAYOUT,
  ];

  useEffect(() => {
    if (verifyRoutes?.includes(location?.pathname))
      navigate(ROUTE_PATHS?.LOGIN);
  }, []); //eslint-disable-line

  console.log(userInfo);

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? <CustomLoader /> : null}

      <Routes>
        {routeMapping(GENERAL_ROUTES)}
        <Route path={ROUTE_PATHS?.LAYOUT} element={<ProtectedRoute />}>
          {routeMapping(
            getRoutes({
              role: userInfo?.role,
              designations: userInfo?.designations,
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
