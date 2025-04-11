import * as Yup from 'yup';

export const registerFormSchema = Yup.object({
  name: Yup.string().required('Name is required'),

  email: Yup.string()
    .email('Invalid email address')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 7 characters')
    .required('Password is required'),
});

export const loginFormSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 7 characters')
    .required('Password is required'),
});
