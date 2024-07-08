import { type } from "@testing-library/user-event/dist/type";
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
import axios from "axios";
import { API_URL, api } from "../../config/api";

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_URL}/auth/signup`,
      reqData.userData
    );
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    if (data.role === "MANAGER_ROLE") {
      reqData.navigate("/manager/"); //TODO
    } else if (data.role === "EMPLOYEE_ROLE") {
      reqData.navigate("/employee/profile"); //TODO
    }
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error });
    console.log("error", error);
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const url = `${API_URL}/auth/signin`;
    const { data } = await axios.post(
      `${API_URL}/auth/signin`,
      reqData.userData
    );
    if (data.jwt) localStorage.setItem("jwt", data.jwt);
    if (data.role === "MANAGER_ROLE") {
      reqData.navigate("/manager/courses"); //TODO
    } else if (data.role === "ADMIN_ROLE") {
      reqData.navigate("/admin/courses");
    } else {
      reqData.navigate("/employee/profile");
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
    console.log("error", error);
  }
};

export const getUser = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      console.log("jwt -------" + jwt);
      const response = await api.get(`/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const user = response.data;

      dispatch({ type: GET_USER_SUCCESS, payload: user });
      console.log("req User ", user);
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
  };
};
