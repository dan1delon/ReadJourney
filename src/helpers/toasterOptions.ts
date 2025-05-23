import type { DefaultToastOptions } from 'react-hot-toast';

export const toastOptions: DefaultToastOptions = {
  duration: 3000,
  style: {
    borderRadius: '10px',
    color: '#121417',
    padding: '16px',
    fontSize: '14px',
  },
  success: {
    style: {
      border: '1px solid #3cbf61',
      color: '#121417',
      textAlign: 'center',
    },
    iconTheme: {
      primary: '#3cbf61',
      secondary: '#fff',
    },
  },
  error: {
    style: {
      border: '1px solid #d80027',
    },
    iconTheme: {
      primary: '#d80027',
      secondary: '#fff',
    },
  },
};
