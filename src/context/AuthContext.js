import React, {createContext, useReducer} from 'react';
import {AuthReducer} from './reducer';
import jwtDecode from 'jwt-decode';

let initialState = {
  user: null,
};

if (localStorage.getItem('token')) {
  const decodeToken = jwtDecode(localStorage.getItem('token') || '{}');
  if (parseInt(decodeToken.exp) * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    initialState = {
      user: decodeToken.user,
    };
  }
}

const AuthContext = createContext(initialState);

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{state, dispatch}}>{children}</AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
