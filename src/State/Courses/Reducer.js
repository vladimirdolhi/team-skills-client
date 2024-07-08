import {
  CREATE_COURSE_PROGRAM_REQUEST,
  CREATE_COURSE_PROGRAM_SUCCESS,
  CREATE_COURSE_SUCCESS,
  DELETE_COURSE_PROGRAM_SUCCESS,
  DELETE_COURSE_SUCCESS,
  GET_COURSES_SUCCESS,
  GET_COURSE_PROGRAMS_SUCCESS,
  UPDATE_COURSE_PROGRAM_SUCCESS,
  UPDATE_COURSE_SUCCESS,
} from "./ActionType";

const initialState = {
  courses: [],
  coursePrograms: [],
  isLoading: false,
  failure: null,
};

export const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_PROGRAMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        coursePrograms: action.payload,
      };
    case CREATE_COURSE_PROGRAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        coursePrograms: [...state.coursePrograms, action.payload],
      };
    case UPDATE_COURSE_PROGRAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        coursePrograms: state.coursePrograms.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_COURSE_PROGRAM_SUCCESS:
      return {
        ...state,
        coursePrograms: state.coursePrograms.filter(
          (item) => item.id !== action.payload
        ),
      };
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        courses: [...state.courses, action.payload],
      };
    case GET_COURSES_SUCCESS:
      return {
        ...state,
        isLoading: true,
        courses: action.payload,
      };
    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
