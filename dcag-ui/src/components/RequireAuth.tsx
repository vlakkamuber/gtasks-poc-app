import React from 'react';
import { Redirect } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

function RequireAuth({ children }: { children: JSX.Element }): JSX.Element {
  const { user, loading } = useUserAuth();

  // TODO: update loading indicator
  return loading ? <div>Loading...</div> : user ? children : <Redirect to="/login" />;
}

export default RequireAuth;
