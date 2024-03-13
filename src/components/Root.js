import { ThemeProvider } from "@emotion/react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Routes } from "react-router-dom";

import { SERVER_ERROR } from "../constants/globalConstants.js";
import useNotify from "../hooks/useNotify";
import { theme } from "../styles/theme";
import { UserNotification } from "./shared";
import { CustomLoader } from "./shared/CustomLoader";

const Root = () => {
  const { notifyError } = useNotify();
  const snackBar = useSelector((state) => state?.snackBar);
  const isLoading = useSelector((state) => state?.isLoading);

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (res) => {
        const error = res?.response?.data?.error;
        if (typeof error === "string") notifyError(error);
        else notifyError(SERVER_ERROR);
      },
    }),
    mutationCache: new MutationCache({
      onError: (res) => {
        const error = res?.response?.data?.error;
        if (typeof error === "string") notifyError(error);
        else notifyError(SERVER_ERROR);
      },
    }),
  });

  queryClient.setDefaultOptions({
    queries: { refetchOnWindowFocus: false, retry: false },
    mutations: { retry: false },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {isLoading ? <CustomLoader /> : null}

        <Routes></Routes>

        {snackBar && <UserNotification />}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Root;
