import { Toaster } from 'react-hot-toast';
import css from './Layout.module.css';
import { toastOptions } from '../../helpers/toasterOptions';

const Layout = ({ children }) => {
  return (
    <div>
      <main className={css.content}>
        <Toaster position="top-right" toastOptions={toastOptions} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
