import { NavLink } from 'react-router-dom';
import css from './Header.module.css';
import Icon from '../../shared/Icon/Icon';
import { useState } from 'react';
import NavigationMenu from '../NavigationMenu/NavigationMenu';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <>
      {isOpen && <div className={css.overlay} onClick={toggleMenu} />}
      <header className={css.container}>
        <NavLink to="/" className={css.logoLink}>
          <Icon iconId="icon-logo" className={css.logo} />
        </NavLink>
        <div className={css.usersBlock}>
          <div className={css.userName}>U</div>
          <button
            type="button"
            className={css.mobileMenuButton}
            onClick={toggleMenu}
          >
            <Icon iconId="icon-mobile-menu" className={css.mobileMenuIcon} />
          </button>
        </div>

        {isOpen && (
          <div className={css.mobileMenu}>
            <button className={css.closeBtn} onClick={toggleMenu}>
              <Icon iconId="icon-x" className={css.iconClose} />
            </button>
            <span />
            <NavigationMenu toggleMenu={toggleMenu} />
            <button className={css.logoutBtn}>Log out</button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
