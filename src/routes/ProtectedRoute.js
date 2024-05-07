import { Navigate } from "react-router-dom";
import { Layout } from "../components/pages/Layout";
import { COOKIE_KEYS } from "../constants/globalConstants";
import { getCookie } from "../utils/cookie";
import { ROUTE_PATHS } from "./routePaths";

export const ProtectedRoute = () => {
  const token = getCookie(COOKIE_KEYS?.TOKEN);

  return token ? <Layout /> : <Navigate to={ROUTE_PATHS?.LOGIN} />;
};
