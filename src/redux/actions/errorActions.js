import { CLEAR_ERROR, SET_ERROR } from "../types";

export const setError = (payload) => {
  return {
    type: SET_ERROR,
    payload
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
};
