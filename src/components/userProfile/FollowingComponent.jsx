import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Tab } from "semantic-ui-react";
import {
  getFollowersCollection,
  getFollowingCollection
} from "../../firebase/firebaseService";
import {
  followersListener,
  followingListener
} from "../../redux/actions/profileActions";
import { useFirebaseCollection } from "../../utils/useFirebaseCollection";
import ProfileCard from "./ProfileCard";

const FollowingComponent = ({ profile, activeTab }) => {
  const dispatch = useDispatch();
  const { followings, followers } = useSelector((state) => state.profile);

  useFirebaseCollection({
    firestoreQuery:
      activeTab === 2
        ? () => getFollowersCollection(profile.id)
        : () => getFollowingCollection(profile.id),
    onDataReceived: (data) =>
      activeTab === 2
        ? dispatch(followersListener(data))
        : dispatch(followingListener(data)),
    dependencies: [activeTab, dispatch]
  });

  return (
    <Tab.Pane>
      <Segment textAlign="center">
        <h1>{activeTab === 2 ? "Followers" : "Followings"}</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap"
          }}
        >
          {activeTab === 2 &&
            followers.map((profile) => {
              return <ProfileCard profile={profile} key={profile.id} />;
            })}

          {activeTab === 3 &&
            followings.map((profile) => {
              return <ProfileCard profile={profile} key={profile.id} />;
            })}
        </div>
      </Segment>
    </Tab.Pane>
  );
};

export default FollowingComponent;
