import React, { useState } from "react";
import { Tab } from "semantic-ui-react";

import About from "./About";
import FollowingComponent from "./FollowingComponent";
import ImageComponent from "./ImageComponent";
import ItemComponent from "./ItemComponent";

const ProfileContent = ({ profile, isCurrentUser, match }) => {
  const [activeTab, setActiveTab] = useState(0);

  let panes = [
    {
      menuItem: "About",
      render: () => <About profile={profile} isCurrentUser={isCurrentUser} />
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
    {
      menuItem: "Followers",
      render: () => (
        <FollowingComponent
          profile={profile}
          activeTab={activeTab}
          key={profile.id}
        />
      )
    },
    {
      menuItem: "Following",
      render: () => (
        <FollowingComponent
          profile={profile}
          activeTab={activeTab}
          key={profile.id}
        />
      )
    },
    {
      menuItem: "Images",
      render: () => (
        <ImageComponent profile={profile} isCurrentUser={isCurrentUser} />
      )
    }
  ];

  if (!isCurrentUser) {
    panes = panes.filter((pane) => pane.menuItem !== "Images");
  }

  return (
    <Tab
      panes={panes}
      menu={{ secondary: true, pointing: true }}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
};

export default ProfileContent;
