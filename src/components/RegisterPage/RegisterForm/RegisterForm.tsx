import { useState } from 'react';
import * as Yup from 'yup';
import Icon from '../../../shared/Icon/Icon';
import css from './RegisterForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const FormSchema = Yup.object({
    name: Yup.string().required('Name is required'),

    email: Yup.string()
      .email('Invalid email address')
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email address')
      .required('Email is required'),

    password: Yup.string()
      .min(6, 'Password must be at least 7 characters')
      .required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = data => {
    console.log('Form submitted:', data);
    reset();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordFocus = () => {
    setIsPasswordTouched(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordTouched(false);
  };

  const passwordValue = getValues('password');
  const isPasswordValid =
    !errors.password && passwordValue && passwordValue.length >= 7;

  return (
    <div className={css.container}>
      <Icon iconId="icon-logo" className={css.iconLogo} />
      <div className={css.formWrapper}>
        <h2 className={css.title}>
          Expand your mind, reading{' '}
          <span className={css.highlight}>a book</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <label className={css.labelWrapper}>
            <div
              className={clsx(css.inputWrapper, {
                [css.inputError]: errors.name,
              })}
            >
              <p className={css.labelText}>Name:</p>
              <input type="text" {...register('name')} className={css.input} />
              {errors.name && (
                <Icon className={css.iconMessage} iconId="icon-error" />
              )}
            </div>
            {errors.name && (
              <p className={css.errorMessage}>{errors.name?.message}</p>
            )}
          </label>
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
                [css.inputSuccess]: !errors.password && getValues('password'),
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
          <div className={css.btnWrapper}>
            <button type="submit" className={css.btn}>
              Registration
            </button>
            <NavLink to="/login" className={css.linkLogin}>
              Already have an account?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
