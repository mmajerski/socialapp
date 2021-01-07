import { CLEAR_LOADER, SET_LOADER } from "../types";

export const setLoader = () => {
  return {
    type: SET_LOADER
  };
};

export const clearLoader = () => {
  return {
    type: CLEAR_LOADER
  };
};
