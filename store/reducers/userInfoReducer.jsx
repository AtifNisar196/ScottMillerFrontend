import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  error: null
};

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERINFO_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };
    case "USERINFO_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    case "USERINFO_FAILURE":
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userInfoReducer;
