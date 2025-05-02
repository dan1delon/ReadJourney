import css from './BooksPagination.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectRecommendPage,
  selectRecommendTotalPages,
} from '../../../redux/books/selectors';
import { changePage } from '../../../redux/books/slice';
import { AppDispatch } from '../../../redux/store';
import Icon from '../../../shared/Icon/Icon';

const BooksPagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pageTotalCount = useSelector(selectRecommendTotalPages) || 1;
  const currentPage = useSelector(selectRecommendPage) || 1;

  const goToPage = (newPage: number) => {
    dispatch(changePage(newPage));
  };

  if (pageTotalCount <= 1) return null;

  return (
    <div className={css.wrapper}>
      <button
        className={`${css.button} ${currentPage === 1 ? css.disabled : ''}`}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon iconId="icon-chevron-left" className={css.iconArrowBack} />
      </button>

      <button
        className={`${css.button} ${
          currentPage === pageTotalCount ? css.disabled : ''
        }`}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === pageTotalCount}
      >
        <Icon iconId="icon-chevron-left" className={css.iconArrowNext} />
      </button>
    </div>
  );
};

export default BooksPagination;
