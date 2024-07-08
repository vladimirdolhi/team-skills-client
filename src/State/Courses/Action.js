import { API_URL, api } from "../../config/api";
import { GET_SKILL_CATEGORIES_FAILURE } from "../Skills/ActionType";
import {
  CREATE_COURSE_FAILURE,
  CREATE_COURSE_PROGRAM_FAILURE,
  CREATE_COURSE_PROGRAM_SUCCESS,
  CREATE_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE,
  DELETE_COURSE_PROGRAM_FAILURE,
  DELETE_COURSE_PROGRAM_REQUEST,
  DELETE_COURSE_PROGRAM_SUCCESS,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_COURSE_PROGRAMS_FAILURE,
  GET_COURSE_PROGRAMS_REQUEST,
  GET_COURSE_PROGRAMS_SUCCESS,
  UPDATE_COURSE_FAILURE,
  UPDATE_COURSE_PROGRAM_FAILURE,
  UPDATE_COURSE_PROGRAM_SUCCESS,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
} from "./ActionType";

export const getAllCoursePrograms =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_COURSE_PROGRAMS_REQUEST });
    try {
      const url = `${API_URL}/api/courses/programs`;
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all categories ", response.data);
      dispatch({ type: GET_COURSE_PROGRAMS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_COURSE_PROGRAMS_FAILURE, payload: error });
      console.log("error", error);
    }
  };

export const createCourseProgram =
  ({ reqData, jwt }) =>
  async (dispatch) => {
    //dispatch({ type: GET_COURSE_PROGRAMS_REQUEST });
    try {
      const url = `${API_URL}/api/courses/programs`;
      const response = await api.post(url, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create course program", response.data);
      dispatch({ type: CREATE_COURSE_PROGRAM_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_COURSE_PROGRAM_FAILURE, payload: error });
      console.log("error", error);
    }
  };

export const updateCourseProgram =
  ({ reqData, jwt }) =>
  async (dispatch) => {
    //dispatch({ type: GET_COURSE_PROGRAMS_REQUEST });
    try {
      const url = `${API_URL}/api/courses/programs/${reqData.id}`;
      const response = await api.put(url, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update course program", response.data);
      dispatch({ type: UPDATE_COURSE_PROGRAM_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: UPDATE_COURSE_PROGRAM_FAILURE, payload: error });
      console.log("error", error);
    }
  };

export const deleteCourseProgram = ({ id, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_COURSE_PROGRAM_REQUEST });

    try {
      const res = await api.delete(`/api/courses/programs/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete course program ", res.data);
      dispatch({ type: DELETE_COURSE_PROGRAM_SUCCESS, payload: id });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: DELETE_COURSE_PROGRAM_FAILURE, payload: error });
    }
  };
};

export const getAllCourses =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_COURSES_REQUEST });
    try {
      const url = `${API_URL}/api/courses`;
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all categories ", response.data);
      dispatch({ type: GET_COURSES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_COURSE_PROGRAMS_SUCCESS, payload: error });
      console.log("error", error);
    }
  };

export const createCourse =
  ({ reqData, jwt }) =>
  async (dispatch) => {
    //dispatch({ type: GET_COURSE_PROGRAMS_REQUEST });
    try {
      const url = `${API_URL}/api/courses`;
      const response = await api.post(url, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create course program", response.data);
      dispatch({ type: CREATE_COURSE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_COURSE_FAILURE, payload: error });
      console.log("error", error);
    }
  };

export const updateCourse =
  ({ reqData, jwt }) =>
  async (dispatch) => {
    //dispatch({ type: GET_COURSE_PROGRAMS_REQUEST });
    try {
      const url = `${API_URL}/api/courses/${reqData.id}`;
      const response = await api.put(url, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update course", response.data);
      dispatch({ type: UPDATE_COURSE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: UPDATE_COURSE_FAILURE, payload: error });
      console.log("error", error);
    }
  };

export const deleteCourse = ({ id, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_COURSE_REQUEST });

    try {
      const res = await api.delete(`/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete course ", res.data);
      dispatch({ type: DELETE_COURSE_SUCCESS, payload: id });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: DELETE_COURSE_FAILURE, payload: error });
    }
  };
};
