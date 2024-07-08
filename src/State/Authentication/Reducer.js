import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  success: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        jwt: action.payload,
        success: "Register success",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        jwt: action.payload,
        success: "Login success",
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: "Wrong email or password",
        success: null,
      };
    case LOGOUT:
      return {
        user: null,
        isLoading: false,
        error: null,
        jwt: null,
        success: null,
      };
    default:
      return state;
  }
};
