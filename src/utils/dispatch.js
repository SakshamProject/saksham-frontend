import {
  notifyUser,
  removeAppState,
  setIsLoading,
  setUserInfo,
} from "../redux/slice";
import store from "../redux/store";

const dispatchNotifyUser = (message, severity) => {
  store.dispatch(notifyUser([message, severity]));
};

const dispatchLoading = (isLoading) => {
  store.dispatch(setIsLoading(isLoading));
};

const dispatchUserInfo = (useInfo) => {
  store.dispatch(setUserInfo(useInfo));
};

const dispatchRemoveAppState = () => {
  store.dispatch(removeAppState());
};

const dispatchNotifySuccess = (message) => {
  dispatchNotifyUser(message, "success");
};

const dispatchNotifyError = (message) => {
  dispatchNotifyUser(message, "error");
};

export {
  dispatchLoading,
  dispatchNotifyError,
  dispatchNotifySuccess,
  dispatchNotifyUser,
  dispatchRemoveAppState,
  dispatchUserInfo,
};
