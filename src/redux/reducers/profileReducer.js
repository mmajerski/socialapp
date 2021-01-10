import {
  CLEAR_FOLLOWINGS_ON_LEAVE,
  CURRENT_USER_PROFILE_GET,
  FOLLOWERS_LISTENER,
  FOLLOWINGS_LISTENER,
  SELECTED_USER_PROFILE,
  USER_IS_FOLLOWING,
  USER_IS_NOT_FOLLOWING
} from "../types";

const INITIAL_STATE = {
  currentUserProfile: null,
  selectedUserProfile: null,
  followers: [],
  followings: [],
  userIsFollowing: false
};

const profileReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CURRENT_USER_PROFILE_GET:
      return { ...state, currentUserProfile: payload };
    case SELECTED_USER_PROFILE:
      return { ...state, selectedUserProfile: payload };
    case FOLLOWERS_LISTENER:
      return { ...state, followers: payload };
    case FOLLOWINGS_LISTENER:
      return { ...state, followings: payload };
    case USER_IS_FOLLOWING:
      return { ...state, userIsFollowing: true };
    case USER_IS_NOT_FOLLOWING:
      return { ...state, userIsFollowing: false };
    case CLEAR_FOLLOWINGS_ON_LEAVE:
      return {
        ...state,
        followings: [],
        followers: [],
        userIsFollowing: false
      };
    default:
      return state;
  }
};

export default profileReducer;
