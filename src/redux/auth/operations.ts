import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { RootState } from '../store';

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface AuthResponse {
  name: string;
  email: string;
  token: string;
}

export interface RefreshResponseData {
  token: string;
  refreshToken: string;
}

export const instance = axios.create({
  baseURL: 'https://readjourney.b.goit.study/api',
});

export const setToken = (token: string | null) => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    clearToken();
  }
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
  localStorage.removeItem('token');
};

export const registerAPI = createAsyncThunk<
  AuthResponse,
  RegisterForm,
  { rejectValue: string }
>('auth/register', async (formData, thunkApi) => {
  try {
    const { data } = await instance.post<AuthResponse>(
      '/users/signup',
      formData
    );
    setToken(data.token);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const msg = error.response?.data?.message || error.message;
    toast.error(msg);
    return thunkApi.rejectWithValue(msg);
  }
});

export const loginAPI = createAsyncThunk<
  AuthResponse,
  LoginForm,
  { rejectValue: string }
>('auth/login', async (formData, thunkApi) => {
  try {
    const { data } = await instance.post<AuthResponse>(
      '/users/signin',
      formData
    );
    setToken(data.token);

    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const msg = error.response?.data?.message || error.message;
    toast.error(msg);
    return thunkApi.rejectWithValue(msg);
  }
});

export const refreshUserAPI = createAsyncThunk<
  RefreshResponseData,
  void,
  { rejectValue: string }
>('auth/refresh', async (_, thunkApi) => {
  const state: RootState = thunkApi.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkApi.rejectWithValue('Unable to fetch user');
  }
  try {
    setToken(persistedToken);
    const { data } = await instance.get<RefreshResponseData>(
      '/users/current/refresh'
    );
    setToken(data.token);

    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const msg = error.response?.data?.message || error.message;
    clearToken();
    return thunkApi.rejectWithValue(msg);
  }
});

export const getUserAPI = createAsyncThunk<
  { name: string; email: string },
  void,
  { rejectValue: string }
>('auth/getUser', async (_, thunkApi) => {
  try {
    const { data } = await instance.get<{ name: string; email: string }>(
      '/users/current'
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const msg = error.response?.data?.message || error.message;
    return thunkApi.rejectWithValue(msg);
  }
});

export const logoutAPI = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      await instance.post('/users/signout');
      clearToken();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const msg = error.response?.data?.message || error.message;
      return thunkApi.rejectWithValue(msg);
    }
  }
);
