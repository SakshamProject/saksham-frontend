import * as ReactQuery from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import {
  SERVER_ERROR,
  STRING,
  ZOD_ERROR,
} from "./constants/globalConstants.js";
import store from "./redux/store";
import { dispatchSnackbarError } from "./utils/dispatch.js";

const queryClient = new ReactQuery.QueryClient({
  queryCache: new ReactQuery.QueryCache({
    onError: ({ response }) => {
      if (response?.data?.name === ZOD_ERROR) {
        const issue = response?.data?.issues[0];
        console.log("query cache", { issue });
        dispatchSnackbarError(`${issue?.path[0]} ${issue?.message}`);
      } else if (typeof response?.data?.error?.message === STRING) {
        dispatchSnackbarError(response?.data?.error?.message);
      } else {
        dispatchSnackbarError(SERVER_ERROR);
      }
    },
  }),
  mutationCache: new ReactQuery.MutationCache({
    onError: ({ response }) => {
      if (response?.data?.name === ZOD_ERROR) {
        const issue = response?.data?.issues[0];
        console.log("mutation cache", { issue });
        dispatchSnackbarError(`${issue?.path[0]} ${issue?.message}`);
      } else if (typeof response?.data?.error?.message === STRING) {
        dispatchSnackbarError(response?.data?.error?.message);
      } else {
        dispatchSnackbarError(SERVER_ERROR);
      }
    },
  }),
});

queryClient.setDefaultOptions({
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
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
