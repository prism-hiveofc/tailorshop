import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "./auth.types";

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{
        user: AuthState["user"];
        token: string;
      }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },

    clearError(state) {
      state.error = null;
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
});

export const {
  loginSuccess,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;