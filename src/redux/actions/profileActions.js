import {
  CURRENT_USER_PROFILE_GET,
  FOLLOWERS_LISTENER,
  FOLLOWINGS_LISTENER,
  SELECTED_USER_PROFILE,
  USER_IS_FOLLOWING,
  USER_IS_NOT_FOLLOWING
} from "../types";

export const currentUserProfileGet = (profile) => {
  return {
    type: CURRENT_USER_PROFILE_GET,
    payload: profile
  };
};

export const selectedUserProfileAction = (profile) => {
  return {
    type: SELECTED_USER_PROFILE,
    payload: profile
  };
};

export const followersListener = (followers) => {
  return {
    type: FOLLOWERS_LISTENER,
    payload: followers
  };
};

export const followingListener = (followings) => {
  return {
    type: FOLLOWINGS_LISTENER,
    payload: followings
  };
};

export const userIsFollowingAction = () => {
  return {
    type: USER_IS_FOLLOWING
  };
};

export const userIsNotFollowingAction = () => {
  return {
    type: USER_IS_NOT_FOLLOWING
  };
};
