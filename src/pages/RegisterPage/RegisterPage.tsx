import Banner from '../../components/RegisterPage/Banner/Banner';
import css from './RegisterPage.module.css';
import AuthForm from '../../components/RegisterPage/AuthForm/AuthForm';

const RegisterPage = () => {
  return (
    <div className={css.container}>
      <AuthForm />
      <Banner />
    </div>
  );
};

export default RegisterPage;
