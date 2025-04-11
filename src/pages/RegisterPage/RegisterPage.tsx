import Banner from '../../components/AuthPages/Banner/Banner';
import css from './RegisterPage.module.css';
import AuthForm from '../../components/AuthPages/AuthForm/AuthForm';

const RegisterPage = () => {
  return (
    <div className={css.container}>
      <AuthForm />
      <Banner />
    </div>
  );
};

export default RegisterPage;
