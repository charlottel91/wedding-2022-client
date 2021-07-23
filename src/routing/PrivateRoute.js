import React from 'react';

import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  let token = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={(props) =>
        !token ? <Redirect to="/connexion" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
