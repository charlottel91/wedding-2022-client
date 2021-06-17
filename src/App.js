import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import {AuthProvider} from './context';
import PrivateRoute from './routing/PrivateRoute';
import {SignIn, Home, ConfirmPresence} from './pages';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/register" component={ConfirmPresence} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
