import { Navigate } from "react-router-dom";

import { Layout } from "../components/pages/Layout";
import { getCookie } from "../utils/cookie";
import { ROUTE_PATHS } from "./routePaths";

export const ProtectedRoute = () => {
  const token = getCookie("token");

  return token ? <Layout /> : <Navigate to={ROUTE_PATHS.LOGIN} />;
};
