import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Menu, Container, Button } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

const Navbar = ({ setFormState, setShowNav }) => {
  const history = useHistory();
  const [authenticated, setAuthenticate] = useState(false);

  function handleSignOut() {
    setAuthenticate(false);
    history.push("/");
  }

  return (
    <Menu color="purple" fixed="top" inverted pointing secondary>
      <Container>
        <Menu.Item as={NavLink} exact to="/" onClick={() => setShowNav(false)}>
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

        {authenticated ? (
          <SignedInMenu signOut={handleSignOut} setShowNav={setShowNav} />
        ) : (
          <SignedOutMenu setAuthenticate={setAuthenticate} />
        )}
      </Container>
    </Menu>
  );
};

export default Navbar;
