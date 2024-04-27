import axios from "axios";
import { dispatchLoading } from "../utils/dispatch";

export const appApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_MODE
      : process.env.REACT_APP_PRO_MODE,
  withCredentials: true,
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb25JZCI6ImIyMjgyMjYyLTc4Y2QtNGU2ZS04MjU0LTM1MzY0MjYxNmE3MiIsImlhdCI6MTcxNDE5NDk4OCwiZXhwIjoxNzE0MTk4NTg4fQ.1S3KbDjhhBmtMkHLISVKyhUiz44c4O_xx5_pjq4tY7I";

appApi.interceptors.request.use(
  (config) => {
    // config.headers["authorization"] = token;
    config.headers["Cookie"] = `token ${token}`;

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
