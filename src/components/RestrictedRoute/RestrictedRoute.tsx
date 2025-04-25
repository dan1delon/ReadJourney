import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';

type RestrictedRouteProps = {
  children: ReactNode;
};

const RestrictedRoute = ({ children }: RestrictedRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to="/recommended" replace /> : children;
};

export default RestrictedRoute;
