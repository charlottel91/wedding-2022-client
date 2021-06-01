import './App.css';
import {Switch, Route} from 'react-router-dom';
import {ConfirmPresence, Home} from './Pages';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registration" component={ConfirmPresence} />
        {/* <Route path="/orders" component={Orders} /> */}
      </Switch>
    </div>
  );
}

export default App;
