import css from './BooksPagination.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectRecommendPage,
  selectRecommendTotalPages,
} from '../../../redux/books/selectors';
import { useScrollContext } from '../../../context/ScrollContext';
import { changePage } from '../../../redux/books/slice';

const BooksPagination = () => {
  const dispatch = useDispatch();
  const pageTotalCount = useSelector(selectRecommendTotalPages) || 1;
  const currentPage = useSelector(selectRecommendPage) || 1;
  const { headerRef } = useScrollContext();

  const scrollToHeader = () => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChange = (event, value) => {
    scrollToHeader();
    dispatch(changePage(value));
  };

  if (pageTotalCount <= 1) return null;

  return (
    <div className={css.wrapper}>
      <Stack spacing={2} className={css.pagination}>
        <Pagination
          count={pageTotalCount}
          page={currentPage}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          siblingCount={0}
          boundaryCount={1}
          sx={{
            '& .MuiPaginationItem-root': {
              border: '1px solid rgba(18, 20, 23, 0.1)',
              borderRadius: '8px',
              padding: '10px',
              width: '32px',
              height: '32px',
              color: '#121417',
              fontFamily: 'MacPaw Fixel Display',
              fontWeight: 600,
              fontSize: '13px',
            },

            '& .MuiPaginationItem-root:hover': {
              background: '#85aa9f',
              color: 'white',
            },
          }}
        />
      </Stack>
    </div>
  );
};

export default BooksPagination;
