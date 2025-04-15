import { Toaster } from 'react-hot-toast';
import css from './Layout.module.css';
import { toastOptions } from '../../helpers/toasterOptions';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <div>
      <div className={css.container}>
        {!isAuthPage && <Header />}
        <main className={css.content}>
          <Toaster position="top-right" toastOptions={toastOptions} />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
