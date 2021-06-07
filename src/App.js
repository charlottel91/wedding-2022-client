import {useState} from 'react';
import './App.css';
import Auth from './context/AuthContext';
import Routes from './Routes';
import {hasAuthenticated} from './services/AuthApi';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
  return (
    <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>
      <Routes />
    </Auth.Provider>
  );
}

export default App;
