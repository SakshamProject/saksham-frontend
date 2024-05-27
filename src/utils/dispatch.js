import { CODES } from "../constants/globalConstants";
import { actions } from "../redux/slice";
import store from "../redux/store";

export const dispatchSnackbar = (payload) => {
  store.dispatch(actions.setSnackbar(payload));
};

export const dispatchIsLoading = (isLoading) => {
  store.dispatch(actions.setIsLoading(isLoading));
};

export const dispatchUserInfo = (userInfo) => {
  store.dispatch(actions.setUserInfo(userInfo));
};

export const dispatchRemoveGlobalStates = () => {
  store.dispatch(actions.removeGlobalStates());
};

export const dispatchSnackbarSuccess = (message) => {
  dispatchSnackbar([message, "success"]);
};

export const dispatchSnackbarError = (message) => {
  dispatchSnackbar([message, "error"]);
};

export const dispatchSeeds = (seed) => {
  store.dispatch(actions.setSeeds(seed));
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
