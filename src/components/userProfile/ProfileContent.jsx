import React from "react";
import { Tab } from "semantic-ui-react";

import About from "./About";
import ImageComponent from "./ImageComponent";
import ItemComponent from "./ItemComponent";

const ProfileContent = ({ profile, isCurrentUser, match }) => {
  let panes = [
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
    {
      menuItem: "Items",
      render: () => (
        <ItemComponent
          profile={profile}
          isCurrentUser={isCurrentUser}
          match={match}
        />
      )
    },
    { menuItem: "Followers", render: () => <Tab.Pane>Followers</Tab.Pane> },
    { menuItem: "Following", render: () => <Tab.Pane>Following</Tab.Pane> }
  ];

  if (!isCurrentUser) {
    panes = panes.filter((pane) => pane.menuItem !== "Images");
  }

  return <Tab panes={panes} menu={{ secondary: true, pointing: true }} />;
};

export default ProfileContent;
