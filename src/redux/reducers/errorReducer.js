import { CLEAR_ERROR, SET_ERROR } from "../types";

const INITIAL_STATE = {
  code: "",
  message: ""
};

const errorReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_ERROR:
      return { ...state, code: payload.code, message: payload.message };
    case CLEAR_ERROR:
      return { ...state, code: "", message: "" };
    default:
      return state;
  }
};

export default errorReducer;
