import React from "react";
import { Tab } from "semantic-ui-react";

import About from "./About";
import ImageComponent from "./ImageComponent";

const ProfileContent = ({ profile, isCurrentUser }) => {
  const panes = [
    {
      menuItem: "About",
      render: () => <About profile={profile} isCurrentUser={isCurrentUser} />
    },
    {
      menuItem: "Images",
      render: () => (
        <ImageComponent profile={profile} isCurrentUser={isCurrentUser} />
      )
    },
    { menuItem: "Items", render: () => <Tab.Pane>Items</Tab.Pane> },
    { menuItem: "Followers", render: () => <Tab.Pane>Followers</Tab.Pane> },
    { menuItem: "Following", render: () => <Tab.Pane>Following</Tab.Pane> }
  ];

  return (
    <>
      {isCurrentUser ? (
        <Tab panes={panes} menu={{ secondary: true, pointing: true }} />
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfileContent;
