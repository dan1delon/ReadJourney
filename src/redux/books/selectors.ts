import { RootState } from '../store';

export const selectUsersBooks = (state: RootState) => state.books.own;
export const selectRecommendedBooks = (state: RootState) =>
  state.books.recommended;
export const selectRecommendTotalPages = (state: RootState) =>
  state.books.recommendMeta.totalPages;
export const selectRecommendPage = (state: RootState) =>
  state.books.recommendMeta.page;
export const selectIsLoading = (state: RootState) => state.books.loading;
export const selectIsError = (state: RootState) => state.books.error;
