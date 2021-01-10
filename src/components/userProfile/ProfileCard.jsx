import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";

import imgUser from "../../images/user.png";

const ProfileCard = ({ profile }) => {
  return (
    <div style={{ marginBottom: "50px" }}>
      <Card as={Link} to={`/profile/${profile.id}`}>
        <Image src={profile.photoURL || imgUser} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{profile.displayName}</Card.Header>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ProfileCard;
