import axios from "axios";

import { setIsLoading } from "../redux/slice";
import store from "../redux/store";

export const appApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_MODE
      : process.env.REACT_APP_PRO_MODE,
});

appApi.interceptors.request.use(
  (config) => {
    store.dispatch(setIsLoading(true));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

appApi.interceptors.response.use(
  (response) => {
    store.dispatch(setIsLoading(false));
    return response;
  },
  async (error) => {
    store.dispatch(setIsLoading(false));
    return Promise.reject(error);
  }
);
