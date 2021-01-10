import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Divider,
  Item,
  Reveal,
  Segment,
  Statistic
} from "semantic-ui-react";
import {
  followUser,
  getFollowingDoc,
  unfollowUser
} from "../../firebase/firebaseService";

import userImg from "../../images/user.png";
import {
  userIsFollowingAction,
  userIsNotFollowingAction
} from "../../redux/actions/profileActions";
import { CLEAR_FOLLOWINGS_ON_LEAVE } from "../../redux/types";
import { notification } from "../../utils/notification";

const ProfileHeader = ({ profile, isCurrentUser, currentUser }) => {
  const [loading, setLoading] = useState(false);
  const { userIsFollowing } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setLoading(true);

    const fetchFollowingDoc = async () => {
      try {
        const followingDoc = await getFollowingDoc(profile.id);
        if (followingDoc && followingDoc.exists) {
          dispatch(userIsFollowingAction());
        }
      } catch (error) {
        notification(error.message, "error");
        setLoading(false);
      }
    };

    fetchFollowingDoc().then(() => setLoading(false));

    return () => {
      dispatch({ type: CLEAR_FOLLOWINGS_ON_LEAVE });
    };
  }, [dispatch, profile.id, currentUser]);

  const followUserHandler = async () => {
    setLoading(true);
    try {
      await followUser(profile);
      dispatch(userIsFollowingAction());
      setLoading(false);
      notification("You are follower now!");
    } catch (error) {
      notification(error.message, "error");
      setLoading(false);
    }
  };

  const unfollowUserHandler = async () => {
    setLoading(true);
    try {
      await unfollowUser(profile);
      dispatch(userIsNotFollowingAction());
      setLoading(false);
      notification("You are not follower anymore!");
    } catch (error) {
      notification(error.message, "error");
      setLoading(false);
    }
  };

  return (
    <>
      <Segment textAlign="center">
        <Item.Group>
          <Item>
            <Item.Image avatar size="small" src={profile.photoURL || userImg} />
            <Item.Content verticalAlign="middle">
              <h1>{profile.displayName}</h1>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment textAlign="center">
        <Statistic.Group>
          <Statistic>
            <Statistic.Value>{profile.followerCount || 0}</Statistic.Value>
            <Statistic.Label>
              {profile.followerCount?.length > 1 ? "Followers" : "Follower"}
            </Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{profile.followingCount || 0}</Statistic.Value>
            <Statistic.Label>
              {profile.followingCount?.length > 1 ? "Followings" : "Following"}
            </Statistic.Label>
          </Statistic>
          {!isCurrentUser && currentUser && (
            <>
              <Divider />
              <Reveal animated="move down">
                <Reveal.Content visible>
                  <Button fluid>
                    {userIsFollowing ? "Following" : "Not following"}
                  </Button>
                </Reveal.Content>
                <Reveal.Content hidden>
                  <Button
                    fluid
                    color={userIsFollowing ? "red" : "green"}
                    onClick={
                      userIsFollowing
                        ? () => unfollowUserHandler()
                        : () => followUserHandler()
                    }
                    loading={loading}
                    disabled={loading}
                  >
                    {userIsFollowing ? "Unfollow" : "Follow"}
                  </Button>
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Statistic.Group>
      </Segment>
    </>
  );
};

export default ProfileHeader;
