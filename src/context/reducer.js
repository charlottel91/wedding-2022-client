export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        user: {},
      };
    case 'UPDATE_GUESTS':
      return {
        ...state,
        user: {...state.user, guests: action.payload},
      };
    default:
      state;
  }
};
