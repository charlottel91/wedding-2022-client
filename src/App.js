import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AuthProvider} from './context';

import {ThemeProvider} from '@material-ui/core/styles';

import BackOffice from './pages/BackOffice';
import HideAppBar from './component/HideAppBar';
import SignIn from './pages/SignIn';

import theme from './style/theme';
import './App.css';
import PrivateRouteBackOffice from './routing/PrivateRouteBackOffice';

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/connexion" component={SignIn} />
            <PrivateRouteBackOffice exact path="/back-office" component={BackOffice} />
            <ThemeProvider theme={theme}>
              <HideAppBar />
            </ThemeProvider>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
