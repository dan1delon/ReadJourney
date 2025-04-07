import Icon from '../../../shared/Icon/Icon';
import css from './RegisterForm.module.css';

const RegisterForm = () => {
  return (
    <div className={css.container}>
      <div className={css.logoContainer}>
        <Icon iconId="icon-logo" className={css.iconLogo} />
      </div>
      <div className={css.form}>
        <h2 className={css.title}>
          Expand your mind, reading{' '}
          <span className={css.highlight}>a book</span>
        </h2>
      </div>
    </div>
  );
};

export default RegisterForm;
