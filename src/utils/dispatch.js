import { CODES } from "../constants/globalConstants";
import {
  removeGlobalStates,
  setIsLoading,
  setSnackbar,
  setUserInfo,
} from "../redux/slice";
import store from "../redux/store";

export const dispatchSnackbar = (payload) => {
  store.dispatch(setSnackbar(payload));
};

export const dispatchIsLoading = (isLoading) => {
  store.dispatch(setIsLoading(isLoading));
};

export const dispatchUserInfo = (userInfo) => {
  store.dispatch(setUserInfo(userInfo));
};

export const dispatchRemoveGlobalStates = () => {
  store.dispatch(removeGlobalStates());
};

export const dispatchSnackbarSuccess = (message) => {
  dispatchSnackbar([message, "success"]);
};

export const dispatchSnackbarError = (message) => {
  dispatchSnackbar([message, "error"]);
};

export const dispatchResponseAction = (title, action) => {
  let message = "";

  if (action === CODES?.ADDED) message = `${title} Added successfully !`;
  if (action === CODES?.UPDATED) message = `${title} Updated successfully !`;
  if (action === CODES?.DELETED) message = `${title} Deleted successfully !`;
  if (action === CODES?.SAVED) message = `${title} Saved successfully !`;
  if (action === CODES?.CREATED) message = `${title} Created successfully !`;

  dispatchSnackbar([message, "success"]);
};
