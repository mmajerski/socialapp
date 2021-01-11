import {
  CLEAR_ITEMS,
  COMMENT_LISTENER,
  CREATE_ITEM,
  DELETE_ITEM,
  GET_ALL_ITEMS,
  GET_ITEMS,
  RETAIN_STATE,
  RETAIN_STATE_CLEAR,
  SELECTED_ITEM_CLEAR,
  SELECTED_ITEM_LISTENER,
  UPDATE_ITEM
} from "../types";

const INITIAL_STATE = {
  items: [],
  comments: [],
  moreItems: false,
  selectedItem: null,
  lastVisible: null,
  retainState: false
};

const itemReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CREATE_ITEM:
      return { ...state, items: [payload, ...state.items] };
    case UPDATE_ITEM:
      return {
        ...state,
        items: [
          payload,
          ...state.items.filter((item) => item.id !== payload.id)
        ]
      };
    case GET_ITEMS:
      return {
        ...state,
        items: [...state.items, ...payload.items],
        moreItems: payload.moreItems,
        lastVisible: payload.lastVisible
      };
    case GET_ALL_ITEMS:
      return { ...state, items: payload };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload)
      };
    case COMMENT_LISTENER: {
      return { ...state, comments: payload };
    }
    case SELECTED_ITEM_LISTENER:
      return { ...state, selectedItem: payload };
    case SELECTED_ITEM_CLEAR: {
      return { ...state, selectedItem: null };
    }
    case CLEAR_ITEMS:
      return {
        ...state,
        items: [],
        comments: [],
        moreItems: false,
        selectedItem: null,
        lastVisible: null
      };
    case RETAIN_STATE:
      return { ...state, retainState: true };
    case RETAIN_STATE_CLEAR:
      return { ...state, retainState: false };
    default:
      return state;
  }
};

export default itemReducer;
