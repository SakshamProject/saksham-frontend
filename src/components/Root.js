import { ThemeProvider } from "@emotion/react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { SERVER_ERROR } from "../constants/globalConstants.js";
import { ProtectedRoute } from "../routes/ProtectedRoute.js";
import { SUPER_ADMIN_ROUTES } from "../routes/index.js";
import { routeMapping } from "../routes/routeMapping.js";
import { ROUTE_PATHS } from "../routes/routePaths.js";
import { theme } from "../styles/theme";
import { dispatchNotifyError } from "../utils/dispatch.js";
import Login from "./pages/login/Login";
import { UserNotification } from "./shared";
import { CustomLoader } from "./shared/CustomLoader";
import NotFound from "./shared/NotFound.js";

const Root = () => {
  const snackBar = useSelector((state) => state?.snackBar);
  const isLoading = useSelector((state) => state?.isLoading);

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: ({ response }) => {
        if (response?.data?.name === "ZodError") {
          dispatchNotifyError(response?.data?.issues[0]?.message);
        } else if (typeof response?.data?.error?.message === "string") {
          dispatchNotifyError(response?.data?.error?.message);
        } else {
          dispatchNotifyError(SERVER_ERROR);
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: ({ response }) => {
        if (response?.data?.name === "ZodError") {
          dispatchNotifyError(response?.data?.issues[0]?.message);
        } else if (typeof response?.data?.error?.message === "string") {
          dispatchNotifyError(response?.data?.error?.message);
        } else {
          dispatchNotifyError(SERVER_ERROR);
        }
      },
    }),
  });

  queryClient.setDefaultOptions({
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {isLoading ? <CustomLoader /> : null}

        <Routes>
          <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />

          <Route path={ROUTE_PATHS.LAYOUT} element={<ProtectedRoute />}>
            {routeMapping(SUPER_ADMIN_ROUTES)}
          </Route>

          <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFound />} />
        </Routes>

        {snackBar && <UserNotification />}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Root;
