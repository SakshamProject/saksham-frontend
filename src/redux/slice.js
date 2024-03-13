import { createSlice } from "@reduxjs/toolkit";

import { makeNotification } from "./actions";

const initialState = {
  snackBar: "",
  isLoading: false,
  userInfo: {},
  seeds: {},
};

const { reducer, actions } = createSlice({
  name: "app",
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

    setSeed: (state, action) => {
      state.seeds = { ...state.seeds, ...action.payload };
    },
  },
});

export default reducer;

export const {
  notifyUser,
  setIsLoading,
  setUserInfo,
  setSeed,
  setPortal,
  setIsAdmin,
} = actions;
