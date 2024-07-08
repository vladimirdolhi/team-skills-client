import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  DELETE_EVENTS_SUCCESS,
  DELETE_EVENT_SUCCESS,
  GET_EVENTS_FAILURE,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
} from "./ActionType";

const initialState = {
  events: [],
  isLoading: false,
  error: null,
};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: action.payload,
      };
    case GET_EVENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
