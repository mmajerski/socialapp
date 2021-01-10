import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container, Button } from "semantic-ui-react";
import { useSelector } from "react-redux";

import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

const Navbar = () => {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <Menu color="grey" fixed="top" inverted pointing secondary>
      <Container>
        <Menu.Item as={NavLink} exact to="/">
          Home
        </Menu.Item>
        <Menu.Item as={NavLink} to="/items">
          View
        </Menu.Item>
        {authenticated && (
          <Menu.Item as={NavLink} to="/createItem">
            <Button basic inverted color="yellow">
              Create
            </Button>
          </Menu.Item>
        )}

        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
};

export default Navbar;
