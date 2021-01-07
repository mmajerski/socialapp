import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { signOutUser } from "../../firebase/authService";

import userImg from "../../images/user.png";
import { notification } from "../../utils/notification";

const SignedInMenu = () => {
  const history = useHistory();

  const { currentUser } = useSelector((state) => state.auth);

  const logOutHandler = async () => {
    try {
      await signOutUser();
      history.push("/");
      notification("Successfully signed out!");
    } catch (error) {
      notification(error.message, "error");
    }
  };

  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={currentUser.ownerPhoto || userImg} />
      <Dropdown pointing="top left" text={currentUser.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createItem"
            text="Create Item"
            icon="plus circle"
          />
          <Dropdown.Item text="Profile" icon="user circle" />
          <Dropdown.Item
            text="Account"
            icon="setting"
            as={Link}
            to="/account"
          />
          <Dropdown.Item
            text="Sign Out"
            icon="log out"
            onClick={() => logOutHandler()}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
