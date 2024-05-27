import * as ReactQuery from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import { SERVER_ERROR } from "./constants/globalConstants.js";
import store from "./redux/store";
import { dispatchSnackbarError } from "./utils/dispatch.js";

const handleError = (res) => {
  const { data = {} } = res || {};
  
  if (typeof data?.error?.message === "string") {
    dispatchSnackbarError(data?.error?.message);
  } else if (data?.name === "ZodError" && Array.isArray(data?.issues)) {
    const issues = data?.issues[0];
    dispatchSnackbarError(`${issues?.path[0]} ${issues?.message}`);
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
