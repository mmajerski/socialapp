import { CLOSE_MODAL, OPEN_MODAL } from "../types";

export const openModal = (data) => {
  return {
    type: OPEN_MODAL,
    payload: data
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};
