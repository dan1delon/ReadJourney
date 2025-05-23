import { FC, useState } from 'react';
import Icon from '../../../shared/Icon/Icon';
import css from './AuthForm.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import {
  loginFormSchema,
  registerFormSchema,
} from '../../../helpers/formValidation';
import {
  loginAPI,
  registerAPI,
  LoginForm,
  RegisterForm,
} from '../../../redux/auth/operations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

const AuthForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const formSchema = isLoginPage ? loginFormSchema : registerFormSchema;
  const defaultValues: AuthFormData = isLoginPage
    ? { email: '', password: '' }
    : { name: '', email: '', password: '' };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(formSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  const onSubmit: SubmitHandler<AuthFormData> = data => {
    if (isLoginPage) {
      dispatch(loginAPI(data as LoginForm));
    } else {
      dispatch(registerAPI(data as RegisterForm));
    }
    reset();
  };

  const handleClickShowPassword = () => setShowPassword(prev => !prev);
  const handlePasswordFocus = () => setIsPasswordTouched(true);
  const handlePasswordBlur = () => setIsPasswordTouched(false);

  const passwordValue = getValues('password');
  const isPasswordValid =
    !errors.password && !!passwordValue && passwordValue.length >= 7;

  return (
    <div className={css.container}>
      <div className={css.logoWrapper}>
        <Icon iconId="icon-logo" className={css.iconLogo} />
        <p className={css.logoText}>Read Journey</p>
      </div>
      <div className={css.formWrapper}>
        <h2 className={css.title}>
          Expand your mind, reading{' '}
          <span className={css.highlight}>a book</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.inputContainer}>
            {!isLoginPage && (
              <label className={css.labelWrapper}>
                <div
                  className={clsx(css.inputWrapper, {
                    [css.inputError]: errors.name,
                  })}
                >
                  <p className={css.labelText}>Name:</p>
                  <input
                    type="text"
                    {...register('name')}
                    className={css.input}
                  />
                  {errors.name && (
                    <Icon className={css.iconMessage} iconId="icon-error" />
                  )}
                </div>
                {errors.name && (
                  <p className={css.errorMessage}>{errors.name?.message}</p>
                )}
              </label>
            )}
            <label className={css.labelWrapper}>
              <div
                className={clsx(css.inputWrapper, {
                  [css.inputError]: errors.email,
                })}
              >
                <p className={css.labelText}>Mail:</p>
                <input
                  type="email"
                  {...register('email')}
                  className={css.input}
                />
                {errors.email && (
                  <Icon className={css.iconMessage} iconId="icon-error" />
                )}
              </div>
              {errors.email && (
                <p className={css.errorMessage}>{errors.email?.message}</p>
              )}
            </label>
            <label className={css.labelWrapper}>
              <div
                className={clsx(css.inputWrapper, {
                  [css.inputError]: errors.password,
                  [css.inputSuccess]:
                    isPasswordTouched &&
                    !errors.password &&
                    passwordValue.length >= 7,
                })}
              >
                <p className={css.labelText}>Password:</p>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  autoComplete="on"
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  className={css.input}
                />
              </div>

              <button
                className={css.showPasswordBtn}
                type="button"
                onClick={handleClickShowPassword}
              >
                {errors.password ? (
                  <Icon className={css.icon} iconId="icon-error" />
                ) : isPasswordTouched &&
                  getValues('password') &&
                  isPasswordValid ? (
                  <Icon className={css.icon} iconId="icon-success" />
                ) : showPassword ? (
                  <Icon className={css.icon} iconId="icon-eye-off" />
                ) : (
                  <Icon className={css.icon} iconId="icon-eye" />
                )}
              </button>

              <div className={css.messageWrapper}>
                {!errors.password &&
                  isPasswordTouched &&
                  getValues('password') && (
                    <p className={clsx(css.errorMessage, css.successMessage)}>
                      Password is valid!
                    </p>
                  )}
                {errors.password && (
                  <p className={css.errorMessage}>{errors.password.message}</p>
                )}
              </div>
            </label>
          </div>

          <div className={css.btnWrapper}>
            <button type="submit" className={css.btn}>
              {isLoginPage ? 'Log in' : 'Registration'}
            </button>
            {isLoginPage ? (
              <NavLink to="/register" className={css.linkLogin}>
                Don’t have an account?
              </NavLink>
            ) : (
              <NavLink to="/login" className={css.linkLogin}>
                Already have an account?
              </NavLink>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
