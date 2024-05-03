import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackBar: "",
  isLoading: false,
  userInfo: {},
  seeds: {},
};

const { reducer, actions } = createSlice({
  name: "appStates",
  initialState,
  reducers: {
    notifyUser: (state, action) => {
      if (!action.payload) {
        state.snackBar = null;
        return;
      }
      const [message, severity] = action.payload;
      state.snackBar = { message, severity };
    },

    setIsLoading: (state, action) => {
      state.isLoading = action?.payload;
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
