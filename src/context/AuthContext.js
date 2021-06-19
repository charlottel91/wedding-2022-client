import React, {createContext, useReducer} from 'react';
import {AuthReducer, initialState} from './reducer';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

if (localStorage.getItem('token')) {
  const decodeToken = jwtDecode(localStorage.getItem('token') || '{}');
  if (parseInt(decodeToken.exp) * 1000 < Date.now()) {
    localStorage.removeItem('token');
  }
}

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const loginData = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.user._id);
    dispatch({
      type: 'LOGIN',
      payload: data.user,
    });
  };
  const logoutData = () => {
    localStorage.removeItem('token', 'id');
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <AuthContext.Provider value={{state, dispatch: {loginData, logoutData}}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
