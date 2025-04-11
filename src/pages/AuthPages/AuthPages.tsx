import Banner from '../../components/AuthPages/Banner/Banner';
import css from './AuthPages.module.css';
import AuthForm from '../../components/AuthPages/AuthForm/AuthForm';

const AuthPage = () => {
  return (
    <div className={css.container}>
      <AuthForm />
      <Banner />
    </div>
  );
};

export default AuthPage;
