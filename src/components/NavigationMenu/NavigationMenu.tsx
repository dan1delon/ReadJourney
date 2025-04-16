import { NavLink } from 'react-router-dom';
import css from './NavigationMenu.module.css';
import clsx from 'clsx';

type NavigationMenuProps = {
  toggleMenu: () => void;
};

type HandleActiveLinkProps = {
  isActive: boolean;
  customClass: string;
};

const NavigationMenu = ({ toggleMenu }: NavigationMenuProps) => {
  const handleActiveLink = ({
    isActive,
    customClass,
  }: HandleActiveLinkProps) => {
    return clsx(css.link, customClass, { [css.active]: isActive });
  };

  return (
    <nav className={css.wrapper}>
      <NavLink
        to="/recommended"
        className={({ isActive }) =>
          handleActiveLink({ isActive, customClass: css.linkHome })
        }
        onClick={toggleMenu}
      >
        Home
      </NavLink>
      <NavLink
        to="/library"
        className={({ isActive }) =>
          handleActiveLink({ isActive, customClass: css.linkMedicineStore })
        }
        onClick={toggleMenu}
      >
        My library
      </NavLink>
    </nav>
  );
};

export default NavigationMenu;
