import { CLOSE_MODAL, OPEN_MODAL } from "../types";

const INITIAL_STATE = null;

const modalReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case OPEN_MODAL:
      const { modalType, otherProps } = payload;
      return { modalType, otherProps };
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
