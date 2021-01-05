import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Image } from "semantic-ui-react";

import userImg from "../../images/user.png";

const SignedInMenu = ({ signOut, setShowNav }) => {
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={userImg} />
      <Dropdown pointing="top left" text="Mike">
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createItem"
            text="Create Item"
            icon="plus circle"
          />
          <Dropdown.Item text="Profile" icon="user circle" />
          <Dropdown.Item
            text="Sign Out"
            icon="log out"
            onClick={() => {
              setShowNav(false);
              signOut();
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
