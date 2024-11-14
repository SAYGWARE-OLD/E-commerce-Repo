import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { getRoutePath } from './routes';
import { ROUTES_ID } from './routes_id';

const RouteWithRedirections = ({ children, path }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  const isLoginSidePage = (path) => {
    const loginsidePages = [
      ROUTES_ID.login,
      ROUTES_ID.register,
      ROUTES_ID.forgotpassword,
    ];
    const loginsidePaths = loginsidePages.map((id) => getRoutePath(id));
    return loginsidePaths.some((route) => route === path);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    if (isLoginSidePage(location.pathname)) {
      return <Navigate to={getRoutePath(ROUTES_ID.profile)} />;
    } else {
      return <>{children}</>;
    }
  } else {
    if (isLoginSidePage(location.pathname)) {
      return <>{children}</>;
    } else {
      return <Navigate to={getRoutePath(ROUTES_ID.login)} />;
    }
  }
};

export default RouteWithRedirections;