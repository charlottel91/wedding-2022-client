import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {ConfirmPresence, Home} from './Pages';
import PrivateRoute from './Components/PrivateRoute';
import SignIn from './Pages/connection/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/registration" component={ConfirmPresence} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
