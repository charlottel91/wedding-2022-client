import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {ConfirmPresence, Home, SignIn} from './pages';
import {PrivateRoute} from './components';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={SignIn} />
        <PrivateRoute path="/" component={Home} />
        <PrivateRoute path="/registration" component={ConfirmPresence} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
