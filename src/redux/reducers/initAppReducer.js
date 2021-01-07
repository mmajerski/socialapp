import { APP_INIT } from "../types";

const INITIAL_STATE = {
  initialized: false
};

const initAppReducer = (state = INITIAL_STATE, { type }) => {
  switch (type) {
    case APP_INIT:
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export default initAppReducer;
