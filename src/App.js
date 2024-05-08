import * as ReactQuery from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import { SERVER_ERROR } from "./constants/globalConstants.js";
import store from "./redux/store";
import { dispatchSnackbarError } from "./utils/dispatch.js";

const handleError = (res) => {
  console.log({ response: res?.data });
  if (res?.data?.name === "ZodError") {
    const issue = res?.data?.issues[0];
    dispatchSnackbarError(`${issue?.path[0]} ${issue?.message}`);
  } else if (typeof res?.data?.error?.message === "string") {
    dispatchSnackbarError(res?.data?.error?.message);
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
    <BrowserRouter>
      <Provider store={store}>
        <ReactQuery.QueryClientProvider client={queryClient}>
          <Root />
        </ReactQuery.QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
