import { CREATE_ITEM, DELETE_ITEM, UPDATE_ITEM } from "../types";

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
