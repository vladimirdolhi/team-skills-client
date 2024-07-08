import { API_URL, api } from "../../config/api";
import {
  DELETE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  GET_EMPLOYEES_FAILURE,
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
  GET_MANAGERS_FAILURE,
  GET_MANAGERS_REQUEST,
  GET_MANAGERS_SUCCESS,
  UPDATE_ACCOUNT_FAILURE,
  UPDATE_EMPLOYEE_ACCOUNT_REQUEST,
  UPDATE_EMPLOYEE_ACCOUNT_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_MANAGER_ACCOUNT_REQUEST,
  UPDATE_MANAGER_ACCOUNT_SUCCESS,
} from "./ActionType";

export const getAllEmployees =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_EMPLOYEES_REQUEST });
    try {
      const url = `${API_URL}/api/employees`;
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all employees ", response.data);
      dispatch({ type: GET_EMPLOYEES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_EMPLOYEES_FAILURE, payload: error });
      console.log("error", error);
    }
  };

export const updateEmployee = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_EMPLOYEE_REQUEST });

    try {
      const res = await api.put(`/api/employees/${reqData.id}`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update employee ", res.data);
      dispatch({ type: UPDATE_EMPLOYEE_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: UPDATE_EMPLOYEE_FAILURE, payload: error });
    }
  };
};

export const deleteEmployee = ({ id, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EMPLOYEE_REQUEST });

    try {
      const res = await api.delete(`/api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete employee ", res.data);
      dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: id });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: DELETE_EMPLOYEE_FAILURE, payload: error });
    }
  };
};

export const getAllManagers =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_MANAGERS_REQUEST });
    try {
      const url = `${API_URL}/api/managers`;
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all managers ", response.data);
      dispatch({ type: GET_MANAGERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_MANAGERS_FAILURE, payload: error });
      console.log("error", error);
    }
  };

export const updateAccount = ({ reqData, role, jwt }) => {
  return async (dispatch) => {
    if (role === "EMPLOYEE_ROLE") {
      dispatch({ type: UPDATE_EMPLOYEE_ACCOUNT_REQUEST });
    } else if (role === "MANAGER_ROLE") {
      dispatch({ type: UPDATE_MANAGER_ACCOUNT_REQUEST });
    }
    try {
      const res = await api.put(`/api/accounts/${reqData.id}`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update employee ", res.data);
      if (role === "EMPLOYEE_ROLE") {
        dispatch({ type: UPDATE_EMPLOYEE_SUCCESS, payload: res.data });
      } else if (role === "MANAGER_ROLE") {
        dispatch({ type: UPDATE_MANAGER_ACCOUNT_SUCCESS, payload: res.data });
      }
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: UPDATE_ACCOUNT_FAILURE, payload: error });
    }
  };
};
