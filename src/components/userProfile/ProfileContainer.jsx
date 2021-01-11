import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import { useFirebaseDocument } from "../../utils/useFirebaseDocument";
import { getUserProfile } from "../../firebase/firebaseService";
import { selectedUserProfileAction } from "../../redux/actions/profileActions";
import Loading from "../../layout/Loading";
import { Redirect } from "react-router-dom";

const ProfileContainer = ({ match }) => {
  const dispatch = useDispatch();
  const { selectedUserProfile } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.loader);
  const { message: errorMessage } = useSelector((state) => state.error);

  useFirebaseDocument({
    firestoreQuery: () => getUserProfile(match.params.id),
    onDataReceived: (profile) => dispatch(selectedUserProfileAction(profile)),
    dependencies: [dispatch, match.params.id],
    shouldExecute: true
  });

  if (
    (loading && !selectedUserProfile) ||
    (!selectedUserProfile && !errorMessage)
  ) {
    return <Loading />;
  }

  if (errorMessage) {
    console.log(errorMessage);
    return <Redirect to="/error" />;
  }

  return (
    <>
      <ProfileHeader
        profile={selectedUserProfile}
        isCurrentUser={currentUser?.uid === selectedUserProfile.id}
        currentUser={currentUser}
      />
      <ProfileContent
        profile={selectedUserProfile}
        isCurrentUser={currentUser?.uid === selectedUserProfile.id}
        match={match}
      />
    </>
  );
};

export default ProfileContainer;
