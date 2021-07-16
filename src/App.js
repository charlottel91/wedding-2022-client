import {BrowserRouter as Router, Switch} from 'react-router-dom';
import './App.css';
import {AuthProvider} from './context';
// import PrivateRoute from './routing/PrivateRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* <Route exact path="/login" component={SignIn} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/register" component={ConfirmPresence} /> */}
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
