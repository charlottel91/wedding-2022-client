import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AuthProvider} from './context';

import HideAppBar from './component/HideAppBar';
import SignIn from './pages/SignIn';

import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/connexion" component={SignIn} />
          <HideAppBar />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
