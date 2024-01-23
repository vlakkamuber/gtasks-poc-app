import React from 'react';
import { Redirect } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import FullPageLoader from './FullPageLoader';

function RequireAuth({ children }: { children: JSX.Element }): JSX.Element {
  const { user, loading } = useUserAuth();

  // TODO: update loading indicator
  return loading ? <FullPageLoader /> : user ? children : <Redirect to="/login" />;
}

export default RequireAuth;
