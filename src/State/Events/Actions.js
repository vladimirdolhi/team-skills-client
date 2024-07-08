import { API_URL, api } from "../../config/api";
import {
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_SUCCESS,
  GET_EVENTS_FAILURE,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
} from "./ActionType";

export const createEvent =
  ({ reqData, jwt }) =>
  async (dispatch) => {
    //dispatch({ type: GET_COURSE_PROGRAMS_REQUEST });
    try {
      const url = `${API_URL}/api/events`;
      const response = await api.post(url, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create event", response.data);
      dispatch({ type: CREATE_EVENT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_EVENT_FAILURE, payload: error });
      console.log("error", error);
    }
  };

export const getAllEvents =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_EVENTS_REQUEST });
    try {
      const url = `${API_URL}/api/events`;
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all events ", response.data);
      dispatch({ type: GET_EVENTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_EVENTS_FAILURE, payload: error });
      console.log("error", error);
    }
  };
