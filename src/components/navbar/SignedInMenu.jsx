import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { signOutUser } from "../../firebase/authService";

import userImg from "../../images/user.png";
import { CLEAR_FOLLOWINGS_ON_LEAVE } from "../../redux/types";
import { notification } from "../../utils/notification";

const SignedInMenu = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOutHandler = async () => {
    try {
      await signOutUser();
      dispatch({ type: CLEAR_FOLLOWINGS_ON_LEAVE });
      notification("Successfully signed out!");
    } catch (error) {
      notification(error.message, "error");
    }
  };

  if (!currentUser) {
    return <></>;
  }

  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={currentUser?.ownerPhoto || userImg} />
      <Dropdown pointing="top left" text={currentUser?.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createItem"
            text="Create Item"
            icon="plus circle"
          />
          <Dropdown.Item
            text="Profile"
            icon="user circle"
            as={Link}
            to={`/profile/${currentUser?.uid}`}
          />
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
