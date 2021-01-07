import { CURRENT_USER_PROFILE_GET, SELECTED_USER_PROFILE } from "../types";

const INITIAL_STATE = {
  currentUserProfile: null,
  selectedUserProfile: null
};

const profileReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CURRENT_USER_PROFILE_GET:
      return { ...state, currentUserProfile: payload };
    case SELECTED_USER_PROFILE:
      return { ...state, selectedUserProfile: payload };
    default:
      return state;
  }
};

export default profileReducer;
