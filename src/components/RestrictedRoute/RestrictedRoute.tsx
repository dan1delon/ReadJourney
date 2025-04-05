// import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { ReactNode } from 'react';

type RestrictedRouteProps = {
  children: ReactNode;
};

const RestrictedRoute = ({ children }: RestrictedRouteProps) => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggedIn = false;

  return isLoggedIn ? <Navigate to="/dictionary" replace /> : children;
};

export default RestrictedRoute;
