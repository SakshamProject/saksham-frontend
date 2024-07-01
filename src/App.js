import * as ReactQuery from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import { SERVER_ERROR } from "./constants/globalConstants.js";
import store from "./redux/store";
import { dispatchSnackbarError } from "./utils/dispatch.js";
import ErrorBoundary from "./components/shared/ErrorBoundary.js";

const handleError = (res) => {
  const data = res?.data || {};
  const error = data?.error;

  if (typeof error?.message === "string") {
    if (error?.name === "Unique constraint violation") {
      const errorMessageParts = error.message.split("->");
      const errorMessage =
        errorMessageParts.length > 1
          ? `${errorMessageParts[1].trim()} is unique`
          : SERVER_ERROR;
      dispatchSnackbarError(errorMessage);
    } else {
      dispatchSnackbarError(error.message);
    }
  } else if (
    data?.name === "ZodError" &&
    Array.isArray(data?.issues) &&
    data?.issues.length > 0
  ) {
    const issue = data.issues[0];
    const zodErrorMessage = `${issue.path[0]} ${issue.message}`;
    dispatchSnackbarError(zodErrorMessage);
  } else {
    dispatchSnackbarError(SERVER_ERROR);
  }
};

const queryClient = new ReactQuery.QueryClient({
  queryCache: new ReactQuery.QueryCache({
    onError: ({ response }) => handleError(response),
  }),
  mutationCache: new ReactQuery.MutationCache({
    onError: ({ response }) => handleError(response),
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary
      fallback={
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            flexDirection: "column",
          }}
        >
          <h1>OOPS !</h1>
          <h3>Something went Wrong</h3>
        </div>
      }
    >
      <BrowserRouter>
        <Provider store={store}>
          <ReactQuery.QueryClientProvider client={queryClient}>
            <Root />
          </ReactQuery.QueryClientProvider>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
