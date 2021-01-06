import { SET_CATEGORY } from "../types";

const INITIAL_STATE = {
  category: ""
};

const categoryReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_CATEGORY:
      return { ...state, category: payload };
    default:
      return state;
  }
};

export default categoryReducer;
