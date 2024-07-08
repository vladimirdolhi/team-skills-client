import {
  DELETE_EMPLOYEE_SUCCESS,
  GET_EMPLOYEES_FAILURE,
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
  GET_MANAGERS_SUCCESS,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_MANAGER_ACCOUNT_SUCCESS,
} from "./ActionType";

const initialState = {
  employees: [],
  managers: [],
  isLoading: false,
  failure: null,
};

export const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employees: action.payload,
      };
    case GET_EMPLOYEES_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: action.payload,
      };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employees: state.employees.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.filter((item) => item.id !== action.payload),
      };
    case GET_MANAGERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        managers: action.payload,
      };
    case UPDATE_MANAGER_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        managers: state.managers.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    default:
      return state;
  }
};
