export const initialState = {
  user: {},
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...initialState,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        user: {},
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
