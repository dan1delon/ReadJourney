import AuthForm from '../../components/AuthPages/AuthForm/AuthForm';
import Banner from '../../components/AuthPages/Banner/Banner';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={css.container}>
      <AuthForm />
      <Banner />
    </div>
  );
};

export default LoginPage;
