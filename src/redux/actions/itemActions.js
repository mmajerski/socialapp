import {
  extractDataFromDoc,
  getItemsListener
} from "../../firebase/firebaseService";
import {
  COMMENT_LISTENER,
  CREATE_ITEM,
  DELETE_ITEM,
  GET_ALL_ITEMS,
  GET_ITEMS,
  SELECTED_ITEM_CLEAR,
  SELECTED_ITEM_LISTENER,
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

export const getItems = (limit, lastDocSnapshot) => {
  return async (dispatch) => {
    const snapshot = await getItemsListener(limit, lastDocSnapshot).get();
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    const moreItems = snapshot.docs.length >= limit;
    const items = snapshot.docs.map((doc) => extractDataFromDoc(doc));

    dispatch({
      type: GET_ITEMS,
      payload: { items, moreItems, lastVisible }
    });
  };
};

export const getAllItemsAction = (items) => {
  return {
    type: GET_ALL_ITEMS,
    payload: items
  };
};

export const selectedItemListener = (item) => {
  return {
    type: SELECTED_ITEM_LISTENER,
    payload: item
  };
};

export const clearSelectedItem = () => {
  return {
    type: SELECTED_ITEM_CLEAR
  };
};

export const onComment = (comments) => {
  return {
    type: COMMENT_LISTENER,
    payload: comments
  };
};
