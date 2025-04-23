import { useMediaQuery } from '@mui/material';
import Filters from '../Filters/Filters';
import Walkthrough from '../Walkthrough/Walkthrough';
import css from './Dashboard.module.css';

const Dashboard = () => {
  const isPc = useMediaQuery('(min-width: 1280px)');

  return (
    <div className={css.container}>
      <Filters />
      <Walkthrough />
      {isPc && (
        <div className={css.quoteWrapper}>
          <img src="/img/books.png" alt="books" className={css.quoteIcon} />
          <p className={css.quoteText}>
            "Books are <span className={css.highlight}>windows</span> to the
            world, and reading is a journey into the unknown."
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
