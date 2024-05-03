import axios from "axios";
import { COOKIE_KEYS } from "../constants/globalConstants";
import { getCookie } from "../utils/cookie";
import { dispatchIsLoading } from "../utils/dispatch";

export const appApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_MODE
      : process.env.REACT_APP_PRO_MODE,
});

appApi.interceptors.request.use(
  (config) => {
    config.headers["authorization"] = getCookie(COOKIE_KEYS.TOKEN);
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
  async (error) => {
    dispatchIsLoading(false);
    return Promise.reject(error);
  }
);
