import React from 'react';

export default React.createContext({
  isAuthenticatedUser: {
    isAuthenticated: false,
    name: '',
    _id: '',
  },
  setIsAuthenticatedUser: () => {},
});
