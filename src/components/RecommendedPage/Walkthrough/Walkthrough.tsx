import { NavLink } from 'react-router-dom';
import css from './Walkthrough.module.css';
import Icon from '../../../shared/Icon/Icon';

const Walkthrough = () => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Start your workout</h2>
      <ul className={css.list}>
        <li className={css.listItem}>
          <div className={css.listItemNumber}>1</div>
          <p className={css.listItemText}>
            <span className={css.listItemHighlight}>
              Create a personal library:
            </span>{' '}
            add the books you intend to read <br /> to it.
          </p>
        </li>
        <li className={css.listItem}>
          <div className={css.listItemNumber}>2</div>
          <p className={css.listItemText}>
            <span className={css.listItemHighlight}>
              Create your first workout:
            </span>{' '}
            define a goal, choose a period, start training.
          </p>
        </li>
      </ul>
      <div className={css.btnWrapper}>
        <NavLink to="/library" className={css.btnLink}>
          My library
        </NavLink>
        <NavLink to="/library" className={css.btnLinkArrow}>
          <Icon iconId="icon-arrow" className={css.iconArrow} />
        </NavLink>
      </div>
    </div>
  );
};

export default Walkthrough;
