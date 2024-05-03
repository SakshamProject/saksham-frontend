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
import { dispatchNotifyError } from "./utils/dispatch.js";

const App = () => {
  const queryClient = new ReactQuery.QueryClient({
    queryCache: new ReactQuery.QueryCache({
      onError: ({ response }) => {
        if (response?.data?.name === ZOD_ERROR) {
          const issue = response?.data?.issues[0];
          console.log("query cache", { issue });
          dispatchNotifyError(`${issue?.path[0]} ${issue?.message}`);
        } else if (typeof response?.data?.error?.message === STRING) {
          dispatchNotifyError(response?.data?.error?.message);
        } else {
          dispatchNotifyError(SERVER_ERROR);
        }
      },
    }),
    mutationCache: new ReactQuery.MutationCache({
      onError: ({ response }) => {
        if (response?.data?.name === ZOD_ERROR) {
          const issue = response?.data?.issues[0];
          console.log("mutation cache", { issue });
          dispatchNotifyError(`${issue?.path[0]} ${issue?.message}`);
        } else if (typeof response?.data?.error?.message === STRING) {
          dispatchNotifyError(response?.data?.error?.message);
        } else {
          dispatchNotifyError(SERVER_ERROR);
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
