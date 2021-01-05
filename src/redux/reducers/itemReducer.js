import { dummyData } from "../../utils/dummyData";
import { CREATE_ITEM, DELETE_ITEM, UPDATE_ITEM } from "../types";

const INITIAL_STATE = {
  items: dummyData
};

const itemReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CREATE_ITEM:
      return { ...state, items: [...state.items, payload] };
    case UPDATE_ITEM:
      return {
        ...state,
        items: [
          ...state.items.filter((item) => item.id !== payload.id),
          payload
        ]
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: [...state.items.filter((item) => item.id !== payload)]
      };
    default:
      return state;
  }
};

export default itemReducer;
