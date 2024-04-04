import { Layout } from "../components/pages/Layout";
import { getCookie } from "../utils/cookie";

export const ProtectedRoute = () => {
  const token = getCookie("token");

  return <Layout />;

  // return token ? <Layout /> : <Navigate to="/login" />;
};
