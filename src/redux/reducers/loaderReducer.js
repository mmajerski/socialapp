import { CLEAR_LOADER, SET_LOADER } from "../types";

const INITIAL_STATE = {
  loading: false
};

const loaderReducer = (state = INITIAL_STATE, { type }) => {
  switch (type) {
    case SET_LOADER:
      return { ...state, loading: true };
    case CLEAR_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default loaderReducer;
