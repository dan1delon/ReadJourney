import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import {
  Book,
  RecommendResponse,
  fetchRecommendedBooks,
  addBook,
  addRecommendedBook,
  deleteBook,
  fetchOwnBooks,
  startReading,
  finishReading,
  deleteReadingSession,
} from './operations';

interface BooksState {
  recommended: Book[];
  own: Book[];
  recommendMeta: {
    totalPages: number;
    page: number;
    perPage: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  recommended: [],
  own: [],
  recommendMeta: { totalPages: 0, page: 1, perPage: 10 },
  loading: false,
  error: null,
};

const handlePending = (state: BooksState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state: BooksState, action: any) => {
  state.loading = false;
  state.error = action.payload || action.error.message;
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    changePage: (state, { payload }: PayloadAction<number>) => {
      state.recommendMeta.page = payload;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch recommended
      .addCase(
        fetchRecommendedBooks.fulfilled,
        (state, { payload }: PayloadAction<RecommendResponse>) => {
          state.loading = false;
          state.recommended = payload.results;
          state.recommendMeta = {
            totalPages: payload.totalPages,
            page: payload.page,
            perPage: payload.perPage,
          };
        }
      )
      // Add manually
      .addCase(addBook.fulfilled, (state, { payload }: PayloadAction<Book>) => {
        state.loading = false;
        state.own.push(payload);
      })
      // Add from recommend
      .addCase(
        addRecommendedBook.fulfilled,
        (state, { payload }: PayloadAction<Book>) => {
          state.loading = false;
          state.own.push(payload);
        }
      )
      // Delete book
      .addCase(
        deleteBook.fulfilled,
        (state, { payload }: PayloadAction<{ id: string }>) => {
          state.loading = false;
          state.own = state.own.filter(b => b._id !== payload.id);
        }
      )
      // Fetch own
      .addCase(
        fetchOwnBooks.fulfilled,
        (state, { payload }: PayloadAction<Book[]>) => {
          state.loading = false;
          state.own = payload;
        }
      )
      // Start reading
      .addCase(
        startReading.fulfilled,
        (state, { payload }: PayloadAction<Book>) => {
          state.loading = false;
          state.own = state.own.map(b => (b._id === payload._id ? payload : b));
        }
      )
      // Finish reading
      .addCase(
        finishReading.fulfilled,
        (state, { payload }: PayloadAction<Book>) => {
          state.loading = false;
          state.own = state.own.map(b => (b._id === payload._id ? payload : b));
        }
      )
      // Delete reading session
      .addCase(
        deleteReadingSession.fulfilled,
        (state, { payload }: PayloadAction<Book>) => {
          state.loading = false;
          state.own = state.own.map(b => (b._id === payload._id ? payload : b));
        }
      )
      // Pending/Rejected
      .addMatcher(
        isAnyOf(
          fetchRecommendedBooks.pending,
          addBook.pending,
          addRecommendedBook.pending,
          deleteBook.pending,
          fetchOwnBooks.pending,
          startReading.pending,
          finishReading.pending,
          deleteReadingSession.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          fetchRecommendedBooks.rejected,
          addBook.rejected,
          addRecommendedBook.rejected,
          deleteBook.rejected,
          fetchOwnBooks.rejected,
          startReading.rejected,
          finishReading.rejected,
          deleteReadingSession.rejected
        ),
        handleRejected
      );
  },
});

export const booksReducer = booksSlice.reducer;
export const { changePage } = booksSlice.actions;
