import { SIGN_IN, SIGN_OUT } from "../types";

const INITIAL_STATE = {
  authenticated: false,
  currentUser: null
};

const authReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: payload.email,
          ownerPhoto: payload.photoURL || null,
          uid: payload.uid,
          displayName: payload.displayName,
          providerId: payload.providerData[0].providerId
        }
      };
    case SIGN_OUT: {
      return { ...state, authenticated: false, currentUser: null };
    }
    default:
      return state;
  }
};

export default authReducer;
