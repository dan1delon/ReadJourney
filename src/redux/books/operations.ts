import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../auth/operations';

export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status?: 'unread' | 'in-progress' | 'done';
  owner?: string;
  progress?: [];
  timeLeftToRead?: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export interface RecommendResponse {
  results: Book[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface AddBookPayload {
  title: string;
  author: string;
  totalPages: number;
}

export interface DeleteResponse {
  message: string;
  id: string;
}

export interface ReadingActionPayload {
  id: string;
  page: number;
}

// 1. GET /books/recommend
export const fetchRecommendedBooks = createAsyncThunk<
  RecommendResponse,
  { title?: string; author?: string; page?: number; limit?: number },
  { rejectValue: string }
>('books/fetchRecommended', async (params, { rejectWithValue }) => {
  try {
    const { data } = await instance.get<RecommendResponse>('/books/recommend', {
      params,
    });
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// 2. POST /books/add
export const addBook = createAsyncThunk<
  Book,
  AddBookPayload,
  { rejectValue: string }
>('books/add', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await instance.post<Book>('/books/add', payload);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// 3. POST /books/add/{id}
export const addRecommendedBook = createAsyncThunk<
  Book,
  string,
  { rejectValue: string }
>('books/addRecommended', async (bookId, { rejectWithValue }) => {
  try {
    const { data } = await instance.post<Book>(`/books/add/${bookId}`);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// 4. DELETE /books/remove/{id}
export const deleteBook = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>('books/delete', async (bookId, { rejectWithValue }) => {
  try {
    const { data } = await instance.delete<{ message: string; id: string }>(
      `/books/remove/${bookId}`
    );
    return { id: data.id };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// 5. GET /books/own
export const fetchOwnBooks = createAsyncThunk<
  Book[],
  { status?: 'unread' | 'in-progress' | 'done' },
  { rejectValue: string }
>('books/fetchOwn', async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await instance.get<Book[]>('/books/own', { params });
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// 6. POST /books/reading/start
export const startReading = createAsyncThunk<
  Book,
  ReadingActionPayload,
  { rejectValue: string }
>('books/startReading', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await instance.post<Book>('/books/reading/start', payload);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// 7. POST /books/reading/finish
export const finishReading = createAsyncThunk<
  Book,
  ReadingActionPayload,
  { rejectValue: string }
>('books/finishReading', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await instance.post<Book>(
      '/books/reading/finish',
      payload
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// 8. DELETE /books/reading?bookId=...&readingId=...
export const deleteReadingSession = createAsyncThunk<
  Book,
  { bookId: string; readingId: string },
  { rejectValue: string }
>('books/deleteReadingSession', async (params, { rejectWithValue }) => {
  try {
    const { data } = await instance.delete<Book>('/books/reading', { params });
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
