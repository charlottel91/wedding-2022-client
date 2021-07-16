import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AuthProvider} from './context';

import ConfirmPresence from './pages/ConfirmPresence';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import PrivateRoute from './routing/PrivateRoute';

import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/register" component={ConfirmPresence} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
