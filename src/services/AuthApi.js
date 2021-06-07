import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {getItem, addItem, removeItem} from './LocalStorage';

export function hasAuthenticated() {
  const token = getItem('token');
  const tokenValid = token ? tokenIsValid(token) : false;

  if (tokenValid === false) {
    removeItem('token');
  }
  return tokenValid;
}

export function login(credentials) {
  console.log(credentials, 'in login');
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/signIn`, credentials)
    .then((response) => response.data.token)
    .then((token) => {
      addItem('token', token);

      return true;
    })
    .catch((err) => console.log(err));
}

export function logout() {
  removeItem('token');
}

function tokenIsValid(token) {
  const {exp} = jwtDecode(token);
  if (exp * 1000 > new Date().getTime()) {
    return true;
  }
  return false;
}
