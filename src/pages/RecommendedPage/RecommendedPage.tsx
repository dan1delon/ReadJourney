import Dashboard from '../../components/RecommendedPage/Dashboard/Dashboard';
import RecommendedBooks from '../../components/RecommendedPage/RecommendedBooks/RecommendedBooks';
import css from './RecommendedPage.module.css';

const RecommendedPage = () => {
  return (
    <div className={css.container}>
      <Dashboard />
      <RecommendedBooks />
    </div>
  );
};

export default RecommendedPage;
