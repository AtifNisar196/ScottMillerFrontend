const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,  // assuming user data is in data field
        error: null,
      };
    case "LOGIN_FAIL":
    case "SIGNUP_FAIL":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
