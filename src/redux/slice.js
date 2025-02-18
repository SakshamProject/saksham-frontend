import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbar: "",
  isLoading: false,
  userInfo: null,
  seeds: {},
};

const { reducer, actions } = createSlice({
  name: "globalStates",
  initialState,
  reducers: {
    setSnackbar: (state, action) => {
      if (!action.payload) {
        state.snackbar = null;
        return;
      }
      const [message, severity] = action.payload;
      state.snackbar = { message, severity };
    },

    setIsLoading: (state, action) => {
      state.isLoading = action?.payload;
    },

    setUserInfo: (state, action) => {
      state.userInfo = action?.payload;
    },

    setSeeds: (state, action) => {
      state.seeds = { ...state.seeds, ...action };
    },

    removeGlobalStates: (state) => {
      state.isLoading = initialState?.isLoading;
      state.snackbar = initialState?.snackbar;
      state.userInfo = initialState?.userInfo;
      state.seeds = initialState?.seeds;
    },
  },
});

export { actions, reducer };
