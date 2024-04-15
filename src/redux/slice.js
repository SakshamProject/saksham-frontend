import { createSlice } from "@reduxjs/toolkit";

import { makeNotification } from "./actions";

const initialState = {
  snackBar: "",
  isLoading: false,
  userInfo: {},
};

const { reducer, actions } = createSlice({
  name: "appStates",
  initialState,
  reducers: {
    notifyUser: (state, action) => {
      state.snackBar = makeNotification(action.payload);
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setUserInfo: (state, action) => {
      state.userInfo = action?.payload;
    },

    removeAppState: (state) => {
      state = {};
    },
  },
});

export default reducer;

export const { notifyUser, setIsLoading, setUserInfo, removeAppState } =
  actions;
