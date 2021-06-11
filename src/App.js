import {useState} from 'react';
import './App.css';
import Auth from './context/AuthContext';
import Routes from './Routes';
import {hasAuthenticated} from './services/AuthApi';

function App() {
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState({
    isAuthenticated: hasAuthenticated(),
    name: '',
    _id: '',
  });
  return (
    <Auth.Provider value={{isAuthenticatedUser, setIsAuthenticatedUser}}>
      <Routes />
    </Auth.Provider>
  );
}

export default App;
