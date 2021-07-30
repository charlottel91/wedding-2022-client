import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AuthProvider} from './context';

import {ThemeProvider} from '@material-ui/core/styles';

import HideAppBar from './component/HideAppBar';
import SignIn from './pages/SignIn';

import theme from './style/theme';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/connexion" component={SignIn} />
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
