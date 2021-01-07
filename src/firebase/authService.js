import firebase from "../firebaseConfig/firebase";
import { notification } from "../utils/notification";
import { setUserProfile } from "./firebaseService";

export const signInWithEmailAndPass = (data) => {
  return firebase.auth().signInWithEmailAndPassword(data.email, data.password);
};

export const signOutUser = () => {
  return firebase.auth().signOut();
};

export const signUpUser = async (data) => {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);
    await res.user.updateProfile({ displayName: data.username });
    return await setUserProfile(res.user);
  } catch (error) {
    throw error;
  }
};

export const loginWithProvider = async (provider) => {
  let selectedProvider;
  if (provider === "facebook") {
    selectedProvider = new firebase.auth.FacebookAuthProvider();
  }

  if (provider === "google") {
    selectedProvider = new firebase.auth.GoogleAuthProvider();
  }

  try {
    const result = await firebase.auth().signInWithPopup(selectedProvider);
    if (result.additionalUserInfo.isNewUser) {
      await setUserProfile(result.user);
      notification("Sign up successfully!");
    } else {
      notification("Sign in successfully!");
    }
  } catch (error) {
    notification(error.message, "error");
  }
};

export const updatePassword = (data) => {
  const user = firebase.auth().currentUser;
  return user.updatePassword(data.password);
};
