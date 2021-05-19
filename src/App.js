import './App.css';
import { Switch, Route } from 'react-router-dom';
import { HideAppBar } from './Components';
import { ConfirmPresence } from './Pages';

function App() {
  return (
    <div className="App">
      <Switch >
        <Route exact path="/" component={HideAppBar} />
        <Route path="/confirmation" component={ConfirmPresence} />
        {/* <Route path="/orders" component={Orders} /> */}
      </Switch>
    </div>
  );
}

export default App;
