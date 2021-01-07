import { CURRENT_USER_PROFILE_GET, SELECTED_USER_PROFILE } from "../types";

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
