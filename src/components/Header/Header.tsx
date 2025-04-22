import { NavLink } from 'react-router-dom';
import css from './Header.module.css';
import Icon from '../../shared/Icon/Icon';
import { useState } from 'react';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import { useMediaQuery } from '@mui/material';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <>
      {isOpen && <div className={css.overlay} onClick={toggleMenu} />}
      <header className={css.container}>
        <NavLink to="/recommended" className={css.logoLink}>
          <Icon iconId="icon-logo" className={css.logo} />
          {isDesktop && <span className={css.logoText}>READ JOURNEY</span>}
        </NavLink>
        {!isMobile && <NavigationMenu />}
        <div className={css.usersBlock}>
          <div className={css.userAvatar}>
            <div className={css.userName}>U</div>
            {isDesktop && <span className={css.userText}>User</span>}
          </div>
          {isMobile ? (
            <button
              type="button"
              className={css.mobileMenuButton}
              onClick={toggleMenu}
            >
              <Icon iconId="icon-mobile-menu" className={css.mobileMenuIcon} />
            </button>
          ) : (
            <button type="button" className={css.logoutBtn}>
              Log out
            </button>
          )}
        </div>

        {isMobile && isOpen && (
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
