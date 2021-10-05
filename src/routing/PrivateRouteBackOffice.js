import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AuthContext} from '../context';

const PrivateRouteBackOffice = ({component: Component, ...rest}) => {
  const {state} = useContext(AuthContext);
  let token = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={(props) =>
        token && state.user.role === 'ADMIN' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/connexion" />
        )
      }
    />
  );
};

export default PrivateRouteBackOffice;
