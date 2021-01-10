import {
  CLEAR_ITEMS,
  COMMENT_LISTENER,
  CREATE_ITEM,
  DELETE_ITEM,
  GET_ITEMS,
  SELECTED_ITEM_LISTENER,
  UPDATE_ITEM
} from "../types";

const INITIAL_STATE = {
  items: [],
  comments: [],
  moreItems: false,
  selectedItem: null
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
        items: [...state.items, ...payload.items],
        moreItems: payload.moreItems
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: [state.items.filter((item) => item.id !== payload)]
      };
    case COMMENT_LISTENER: {
      return { ...state, comments: payload };
    }
    case SELECTED_ITEM_LISTENER:
      return { ...state, selectedItem: payload };
    case CLEAR_ITEMS:
      return {
        ...state,
        items: [],
        comments: [],
        moreItems: false,
        selectedItem: null
      };
    default:
      return state;
  }
};

export default itemReducer;
