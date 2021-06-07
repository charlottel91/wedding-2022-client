import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Auth from '../context/AuthContext';

const PrivateRoute = ({component, path}) => {
  const {isAuthenticated} = useContext(Auth);

  return isAuthenticated ? (
    <Route exact path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
