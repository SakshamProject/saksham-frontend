import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { COOKIE_KEYS } from "../constants/globalConstants";
import { ROUTE_PATHS } from "../routes/routePaths";
import { getCookie, removeAllCookie } from "../utils/cookie";
import { dispatchIsLoading } from "../utils/dispatch";

export const appApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_MODE
      : process.env.REACT_APP_PRO_MODE,
});

appApi.interceptors.request.use(
  (config) => {
    config.headers["authorization"] = getCookie(COOKIE_KEYS?.TOKEN);
    dispatchIsLoading(true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

appApi.interceptors.response.use(
  (response) => {
    dispatchIsLoading(false);
    return response;
  },
  (error) => {
    const token = getCookie(COOKIE_KEYS?.TOKEN);
    const isTokenExp = (token ? jwtDecode(token) : "")?.exp;
    const currentTime = Math.floor(new Date().getTime() / 1000);

    dispatchIsLoading(false);

    if (isTokenExp < currentTime) {
      removeAllCookie();
      return <Navigate to={ROUTE_PATHS?.LOGIN} />;
    }

    return Promise.reject(error);
  }
);
