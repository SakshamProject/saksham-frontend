import axios from "axios";
import { dispatchLoading } from "../utils/dispatch";

export const appApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_MODE
      : process.env.REACT_APP_PRO_MODE,
});

appApi.interceptors.request.use(
  (config) => {
    dispatchLoading(true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

appApi.interceptors.response.use(
  (response) => {
    dispatchLoading(false);
    return response;
  },
  async (error) => {
    dispatchLoading(false);
    return Promise.reject(error);
  }
);
