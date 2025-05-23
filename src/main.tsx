import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { ModalProvider } from './context/modalContext.tsx';
import { setToken } from './redux/auth/operations.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ModalProvider>
          <PersistGate
            persistor={persistor}
            onBeforeLift={() => {
              const token = store.getState().auth.token;
              if (token) {
                setToken(token);
              }
            }}
          >
            <App />
          </PersistGate>
        </ModalProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
