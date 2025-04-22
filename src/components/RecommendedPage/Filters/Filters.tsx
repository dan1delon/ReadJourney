import { useForm } from 'react-hook-form';
import css from './Filters.module.css';

const Filters = () => {
  type AuthFormData = {
    title: string;
    author: string;
  };

  const { register, handleSubmit, reset } = useForm<AuthFormData>({
    mode: 'onSubmit',
    defaultValues: { title: '', author: '' },
  });

  const onSubmit = (data: AuthFormData) => {
    console.log('Form submitted:', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.inputContainer}>
        <h4 className={css.title}>Filters:</h4>
        <label className={css.labelWrapper}>
          <div className={css.inputWrapper}>
            <p className={css.labelText}>Book title:</p>
            <input
              type="text"
              {...register('title')}
              className={css.input}
              placeholder="Enter text"
            />
          </div>
        </label>
        <label className={css.labelWrapper}>
          <div className={css.inputWrapper}>
            <p className={css.labelText}>The author:</p>
            <input
              type="text"
              {...register('author')}
              className={css.input}
              placeholder="Enter text"
            />
          </div>
        </label>
      </div>
      <button type="submit" className={css.submitButton}>
        To apply
      </button>
    </form>
  );
};

export default Filters;
