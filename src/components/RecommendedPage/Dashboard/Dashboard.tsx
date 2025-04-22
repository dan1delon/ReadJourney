import Filters from '../Filters/Filters';
import Walkthrough from '../Walkthrough/Walkthrough';
import css from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={css.container}>
      <Filters />
      <Walkthrough />
    </div>
  );
};

export default Dashboard;
