import { lazy, Suspense } from 'react';
import Layout from './components/Layout/Layout.tsx';
import Loader from './components/Loader/Loader.tsx';
import { Route, Routes } from 'react-router-dom';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute.tsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.tsx';

const AuthPage = lazy(() => import('./pages/AuthPages/AuthPages.tsx'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage.tsx'));
const MyLibraryPage = lazy(
  () => import('./pages/MyLibraryPage/MyLibraryPage.tsx')
);
const ReadingPage = lazy(() => import('./pages/ReadingPage/ReadingPage.tsx'));
const RecommendedPage = lazy(
  () => import('./pages/RecommendedPage/RecommendedPage.tsx')
);
const NotFoundPage = lazy(
  () => import('./pages/NotFoundPage/NotFoundPage.tsx')
);

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute>
                <AuthPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <AuthPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/recommended"
            element={
              <PrivateRoute>
                <RecommendedPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/library"
            element={
              <PrivateRoute>
                <MyLibraryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reading"
            element={
              <PrivateRoute>
                <ReadingPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
