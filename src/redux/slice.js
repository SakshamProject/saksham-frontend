import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbar: "",
  isLoading: false,
  userInfo: null,
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
      state.seeds = { ...state.seeds, ...action.payload };
    },

    removeGlobalStates: (state) => {
      state.isLoading = initialState?.isLoading;
      state.seeds = initialState?.seeds;
      state.snackbar = initialState?.snackbar;
      state.userInfo = initialState?.userInfo;
    },
  },
});

export default reducer;

export const {
  setIsLoading,
  setSnackbar,
  setSeeds,
  setUserInfo,
  removeGlobalStates,
} = actions;
