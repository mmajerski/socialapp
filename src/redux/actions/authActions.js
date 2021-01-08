import { APP_INIT, SIGN_IN, SIGN_OUT, UPDATE_IMAGE } from "../types";
import firebase from "../../firebaseConfig/firebase";

export const signIn = (user) => {
  return {
    type: SIGN_IN,
    payload: user
  };
};

export const checkAuth = () => {
  return (dispatch) => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signIn(user));
        dispatch({ type: APP_INIT });
      } else {
        dispatch(signOut());
        dispatch({ type: APP_INIT });
      }
    });
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const updateProfileImage = (image) => {
  return {
    type: UPDATE_IMAGE,
    payload: image
  };
};
