import { useEffect } from 'react';
import Dashboard from '../../components/RecommendedPage/Dashboard/Dashboard';
import RecommendedBooks from '../../components/RecommendedPage/RecommendedBooks/RecommendedBooks';
import css from './RecommendedPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommendedBooks } from '../../redux/books/operations';
import { AppDispatch } from '../../redux/store';
import { useMediaQuery } from '@mui/material';
import { selectRecommendPage } from '../../redux/books/selectors';
import { changePage } from '../../redux/books/slice';

const RecommendedPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentPage = useSelector(selectRecommendPage) || 1;

  const mobile = useMediaQuery('(max-width: 767px)');
  const tablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');

  useEffect(() => {
    const params = { page: currentPage };
    if (mobile) {
      dispatch(fetchRecommendedBooks({ ...params, limit: 2 }));
    } else if (tablet) {
      dispatch(fetchRecommendedBooks({ ...params, limit: 8 }));
    } else {
      dispatch(fetchRecommendedBooks(params));
    }
  }, [dispatch, currentPage, mobile, tablet]);

  useEffect(() => {
    return () => {
      dispatch(changePage(1));
    };
  }, [dispatch]);

  return (
    <div className={css.container}>
      <Dashboard />
      <RecommendedBooks />
    </div>
  );
};

export default RecommendedPage;
