import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Menu, Dropdown, Image } from "semantic-ui-react";

import userImg from "../../images/user.png";
import { signOut } from "../../redux/actions/authActions";

const SignedInMenu = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={currentUser.ownerPhoto || userImg} />
      <Dropdown pointing="top left" text={currentUser.email}>
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
              dispatch(signOut());
              history.push("/");
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
