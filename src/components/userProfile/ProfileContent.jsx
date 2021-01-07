import React from "react";
import { Tab } from "semantic-ui-react";
import About from "./About";

const ProfileContent = ({ profile, isCurrentUser }) => {
  const panes = [
    {
      menuItem: "About",
      render: () => <About profile={profile} isCurrentUser={isCurrentUser} />
    },
    { menuItem: "Images", render: () => <Tab.Pane>Images</Tab.Pane> },
    { menuItem: "Items", render: () => <Tab.Pane>Items</Tab.Pane> },
    { menuItem: "Followers", render: () => <Tab.Pane>Followers</Tab.Pane> },
    { menuItem: "Following", render: () => <Tab.Pane>Following</Tab.Pane> }
  ];

  return <Tab panes={panes} menu={{ secondary: true, pointing: true }} />;
};

export default ProfileContent;
