import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {authContext} from '../context/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {
  const {auth} = useContext(authContext);
  const {loading} = auth;

  if (loading) {
    return (
      <Route
        {...rest}
        render={() => {
          return <p>Loading...</p>;
        }}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return auth.data?.token ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/sign-in" />
        );
      }}
    />
  );
  // eslint-disable-next-line max-len
  /*  we are spreading routeProps to be able to access this routeProps in the component. */
};

export default PrivateRoute;
