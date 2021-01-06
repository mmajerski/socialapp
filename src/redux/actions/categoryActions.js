import { SET_CATEGORY } from "../types";

export const setCategoryRedux = (category) => {
  return {
    type: SET_CATEGORY,
    payload: category
  };
};
