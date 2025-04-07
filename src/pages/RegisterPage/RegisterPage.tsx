import Banner from '../../components/RegisterPage/Banner/Banner';
import RegisterForm from '../../components/RegisterPage/RegisterForm/RegisterForm';
import css from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div className={css.container}>
      <RegisterForm />
      <Banner />
    </div>
  );
};

export default RegisterPage;
