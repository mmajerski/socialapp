import { CREATE_ITEM, DELETE_ITEM, GET_ITEMS, UPDATE_ITEM } from "../types";

const INITIAL_STATE = {
  items: []
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
    case GET_ITEMS:
      return {
        ...state,
        items: [...payload]
      };
    default:
      return state;
  }
};

export default itemReducer;
