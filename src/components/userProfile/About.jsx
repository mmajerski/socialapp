import React, { useState } from "react";
import { Button, Segment, Tab } from "semantic-ui-react";
import ProfileForm from "./ProfileForm";

const About = ({ profile, isCurrentUser }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Segment textAlign="center">
        <h1>About {profile.displayName}</h1>
        {isCurrentUser && (
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Cancel" : "Edit"}
          </Button>
        )}
      </Segment>
      <Segment>
        {editMode ? (
          <ProfileForm profile={profile} />
        ) : (
          <>
            <div>
              Member since:{" "}
              {new Date(profile.createdAt.seconds * 1000)
                .toISOString()
                .slice(0, 10)}
            </div>
            <div>{profile.description || ""}</div>
          </>
        )}
      </Segment>
    </Tab.Pane>
  );
};

export default About;
