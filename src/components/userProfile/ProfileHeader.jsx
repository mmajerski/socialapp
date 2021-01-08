import React from "react";
import {
  Button,
  Divider,
  Item,
  Reveal,
  Segment,
  Statistic
} from "semantic-ui-react";

import userImg from "../../images/user.png";

const ProfileHeader = ({ profile, isCurrentUser }) => {
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
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>Followers</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>15</Statistic.Value>
            <Statistic.Label>Following</Statistic.Label>
          </Statistic>
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated="move down">
                <Reveal.Content visible>
                  <Button fluid>Following</Button>
                </Reveal.Content>
                <Reveal.Content hidden>
                  <Button fluid color="red">
                    Unfollow
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
