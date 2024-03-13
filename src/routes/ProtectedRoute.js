import React from "react";
import { Navigate } from "react-router-dom";

import { Layout } from "../components/pages/Layout";
import { getCookie } from "../constants/globalConstants.js";

export const ProtectedRoute = () => {
  const token = getCookie("token");

  return token ? <Layout /> : <Navigate to="/login" />;
};
