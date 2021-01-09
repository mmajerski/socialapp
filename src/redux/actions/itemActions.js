import {
  COMMENT_LISTENER,
  CREATE_ITEM,
  DELETE_ITEM,
  GET_ITEMS,
  UPDATE_ITEM
} from "../types";

export const createItem = (item) => {
  return {
    type: CREATE_ITEM,
    payload: item
  };
};

export const updateItem = (item) => {
  return {
    type: UPDATE_ITEM,
    payload: item
  };
};

export const deleteItem = (itemId) => {
  return {
    type: DELETE_ITEM,
    payload: itemId
  };
};

export const getItems = (items) => {
  return {
    type: GET_ITEMS,
    payload: items
  };
};

export const onComment = (comments) => {
  return {
    type: COMMENT_LISTENER,
    payload: comments
  };
};
