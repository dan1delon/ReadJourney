import { useEffect } from 'react';
import Dashboard from '../../components/RecommendedPage/Dashboard/Dashboard';
import RecommendedBooks from '../../components/RecommendedPage/RecommendedBooks/RecommendedBooks';
import css from './RecommendedPage.module.css';
import { useDispatch } from 'react-redux';
import { fetchRecommendedBooks } from '../../redux/books/operations';
import { AppDispatch } from '../../redux/store';
import { useMediaQuery } from '@mui/material';

const RecommendedPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const mobile = useMediaQuery('(max-width: 767px)');
  const tablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');

  useEffect(() => {
    if (mobile) {
      dispatch(fetchRecommendedBooks({ limit: 2 }));
    } else if (tablet) {
      dispatch(fetchRecommendedBooks({ limit: 8 }));
    } else {
      dispatch(fetchRecommendedBooks({}));
    }
  }, [dispatch, mobile, tablet]);

  return (
    <div className={css.container}>
      <Dashboard />
      <RecommendedBooks />
    </div>
  );
};

export default RecommendedPage;
