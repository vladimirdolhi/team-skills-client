import { API_URL, api } from "../../config/api";
import {
  CREATE_SKILL_CATEGORY_FAILURE,
  CREATE_SKILL_CATEGORY_REQUEST,
  CREATE_SKILL_CATEGORY_SUCCESS,
  CREATE_SKILL_REQUEST,
  CREATE_SKILL_SUCCESS,
  DELETE_SKILL_CATEGORY_FAILURE,
  DELETE_SKILL_CATEGORY_REQUEST,
  DELETE_SKILL_CATEGORY_SUCCESS,
  DELETE_SKILL_FAILURE,
  DELETE_SKILL_REQUEST,
  DELETE_SKILL_SUCCESS,
  GET_SKILLS_FAILURE,
  GET_SKILLS_REQUEST,
  GET_SKILLS_SUCCESS,
  GET_SKILL_CATEGORIES_FAILURE,
  GET_SKILL_CATEGORIES_REQUEST,
  GET_SKILL_CATEGORIES_SUCCESS,
  UPDATE_SKILL_CATEGORY_FAILURE,
  UPDATE_SKILL_CATEGORY_REQUEST,
  UPDATE_SKILL_CATEGORY_SUCCESS,
  UPDATE_SKILL_REQUEST,
  UPDATE_SKILL_SUCCESS,
} from "./ActionType";

export const getAllSkillCategories =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_SKILL_CATEGORIES_REQUEST });
    try {
      const url = `${API_URL}/api/skills/categories`;
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all categories ", response.data);
      dispatch({ type: GET_SKILL_CATEGORIES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_SKILL_CATEGORIES_FAILURE, payload: error });
      console.log("error", error);
    }
  };

export const getAllSkills =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_SKILLS_REQUEST });
    try {
      const url = `${API_URL}/api/skills`;
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all skills ", response.data);
      dispatch({ type: GET_SKILLS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_SKILLS_FAILURE, payload: error });
      console.log("error", error);
    }
  };

export const createSkillCategory = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_SKILL_CATEGORY_REQUEST });

    try {
      const res = await api.post(`/api/skills/category`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create category ", res.data);
      dispatch({ type: CREATE_SKILL_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: CREATE_SKILL_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const updateSkillCategory = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_SKILL_CATEGORY_REQUEST });

    try {
      const res = await api.post(`/api/skills/category/update`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update category ", res.data);
      dispatch({ type: UPDATE_SKILL_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: UPDATE_SKILL_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const deleteSkillCategory = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const url = `/api/skills/category/${id}`;
      const res = await api.delete(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete category ", res.data);
      dispatch({ type: DELETE_SKILL_CATEGORY_SUCCESS, payload: id });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: DELETE_SKILL_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const createSkill = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_SKILL_REQUEST });

    try {
      const res = await api.post(`/api/skills/skill`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create skill ", res.data);
      dispatch({ type: CREATE_SKILL_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: CREATE_SKILL_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const updateSkill = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_SKILL_REQUEST });

    try {
      const res = await api.put(`/api/skills/skill/${reqData.id}`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update skill ", res.data);
      dispatch({ type: UPDATE_SKILL_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: UPDATE_SKILL_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const deleteSkill = ({ id, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_SKILL_REQUEST });

    try {
      const res = await api.delete(`/api/skills/skill/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete skill ", res.data);
      dispatch({ type: DELETE_SKILL_SUCCESS, payload: id });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: DELETE_SKILL_FAILURE, payload: error });
    }
  };
};
