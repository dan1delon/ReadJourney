import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

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

let isRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = newToken => {
  refreshSubscribers.forEach(callback => callback(newToken));
  refreshSubscribers = [];
};

instance.interceptors.request.use(config => {
  config.params = { ...config.params, t: Date.now() };
  return config;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await instance.post('/users/current/refresh');
        const newAccessToken = data.data.accessToken;

        setToken(newAccessToken);

        isRefreshing = false;
        onTokenRefreshed(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        clearToken();
        return Promise.reject(refreshError);
      }
    } else if (error.response?.status === 401) {
      clearToken();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export const setToken = (token: string | null) => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    clearToken();
  }
};

export const clearToken = () => {
  delete instance.defaults.headers.common.Authorization;
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
  try {
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
