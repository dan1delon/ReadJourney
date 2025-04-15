import { NavLink } from 'react-router-dom';
import css from './Header.module.css';
import Icon from '../../shared/Icon/Icon';

const Header = () => {
  return (
    <header className={css.container}>
      <NavLink to="/" className={css.logoLink}>
        <Icon iconId="icon-logo" className={css.logo} />
      </NavLink>
      <div className={css.usersBlock}>
        <div className={css.userName}>U</div>
        <button type="button" className={css.mobileMenuButton}>
          <Icon iconId="icon-mobile-menu" className={css.mobileMenuIcon} />
        </button>
      </div>
    </header>
  );
};

export default Header;
