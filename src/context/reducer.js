export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING_START':
      return {
        ...state,
        loading: true,
      };
    case 'LOADING_STOP':
      return {
        ...state,
        loading: false,
      };
    case 'LOGIN':
      return {
        user: action.payload,
        loading: true,
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
