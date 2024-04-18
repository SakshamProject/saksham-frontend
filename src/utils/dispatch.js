import { CODES } from "../constants/globalConstants";
import {
  notifyUser,
  removeAppState,
  setIsLoading,
  setUserInfo,
} from "../redux/slice";
import store from "../redux/store";

const dispatchNotifyUser = (payload) => {
  store.dispatch(notifyUser(payload));
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
  dispatchNotifyUser([message, "success"]);
};

const dispatchNotifyError = (message) => {
  dispatchNotifyUser([message, "error"]);
};

const dispatchNotifyAction = (title, action) => {
  const message =
    action === CODES?.ADDED
      ? `${title} Added successfully !`
      : action === CODES?.UPDATE
      ? `${title} Updated successfully !`
      : action === CODES?.DELETE
      ? `${title} Deleted successfully !`
      : "";
  dispatchNotifyUser([message, "success"]);
};

export {
  dispatchLoading,
  dispatchNotifyError,
  dispatchNotifySuccess,
  dispatchNotifyUser,
  dispatchRemoveAppState,
  dispatchUserInfo,
  dispatchNotifyAction,
};
