import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import {
  registerAPI,
  loginAPI,
  refreshUserAPI,
  logoutAPI,
  AuthResponse,
  RefreshResponseData,
} from './operations';

export interface AuthState {
  name: string | null;
  email: string | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: AuthState = {
  name: null,
  email: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: false,
};

const handlePending = (state: AuthState) => {
  state.loading = true;
  state.error = false;
};

const handleRejected = (state: AuthState) => {
  state.loading = false;
  state.error = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        registerAPI.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.isLoggedIn = true;
          state.name = action.payload.name;
          state.email = action.payload.email;
          state.token = action.payload.token;
        }
      )
      .addCase(
        loginAPI.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.isLoggedIn = true;
          state.name = action.payload.name;
          state.email = action.payload.email;
          state.token = action.payload.token;
        }
      )
      .addCase(refreshUserAPI.pending, state => {
        state.isRefreshing = true;
        state.loading = true;
        state.error = false;
      })
      .addCase(
        refreshUserAPI.fulfilled,
        (state, action: PayloadAction<RefreshResponseData>) => {
          state.isRefreshing = false;
          state.isLoggedIn = true;
          state.token = action.payload.accessToken;
        }
      )
      .addCase(refreshUserAPI.rejected, state => {
        state.isRefreshing = false;
        state.loading = false;
        state.isLoggedIn = false;
        state.token = null;
        state.error = true;
      })
      .addCase(logoutAPI.fulfilled, () => initialState)
      .addMatcher(
        isAnyOf(registerAPI.pending, loginAPI.pending, logoutAPI.pending),
        handlePending
      )
      .addMatcher(
        isAnyOf(registerAPI.rejected, loginAPI.rejected, logoutAPI.rejected),
        handleRejected
      );
  },
});

export const authReducer = authSlice.reducer;
