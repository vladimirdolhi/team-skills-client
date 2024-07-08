import {
  CREATE_SKILL_CATEGORY_FAILURE,
  CREATE_SKILL_CATEGORY_REQUEST,
  CREATE_SKILL_CATEGORY_SUCCESS,
  CREATE_SKILL_FAILURE,
  CREATE_SKILL_SUCCESS,
  DELETE_SKILL_CATEGORY_SUCCESS,
  DELETE_SKILL_SUCCESS,
  GET_SKILLS_FAILURE,
  GET_SKILLS_REQUEST,
  GET_SKILLS_SUCCESS,
  GET_SKILL_CATEGORIES,
  GET_SKILL_CATEGORIES_FAILURE,
  GET_SKILL_CATEGORIES_REQUEST,
  GET_SKILL_CATEGORIES_SUCCESS,
  UPDATE_SKILL_CATEGORY_FAILURE,
  UPDATE_SKILL_CATEGORY_REQUEST,
  UPDATE_SKILL_CATEGORY_SUCCESS,
  UPDATE_SKILL_SUCCESS,
} from "./ActionType";

const initialState = {
  skills: [],
  categories: [],
  isLoading: false,
  failure: null,
};

export const skillsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SKILL_CATEGORIES_REQUEST:
    case GET_SKILLS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SKILL_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    case GET_SKILLS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        skills: action.payload,
      };
    case CREATE_SKILL_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_SKILL_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: [...state.categories, action.payload],
      };

    case UPDATE_SKILL_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_SKILL_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: state.categories.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case CREATE_SKILL_SUCCESS:
      return {
        ...state,
        skills: [...state.skills, action.payload],
      };
    case UPDATE_SKILL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        skills: state.skills.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case GET_SKILL_CATEGORIES_FAILURE:
    case GET_SKILLS_FAILURE:
    case CREATE_SKILL_CATEGORY_FAILURE:
    case UPDATE_SKILL_CATEGORY_FAILURE:
    case CREATE_SKILL_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: action.payload,
      };
    case DELETE_SKILL_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (item) => item.id !== action.payload
        ),
      };
    case DELETE_SKILL_SUCCESS:
      return {
        ...state,
        skills: state.skills.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
