import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Root from "./components/Root";
import store from "./redux/store";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Root />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
