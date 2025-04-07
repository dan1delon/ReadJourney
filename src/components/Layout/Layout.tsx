import { Toaster } from 'react-hot-toast';
import css from './Layout.module.css';
import { toastOptions } from '../../helpers/toasterOptions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className={css.container}>
        <main className={css.content}>
          <Toaster position="top-right" toastOptions={toastOptions} />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
