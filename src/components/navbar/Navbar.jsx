import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

const Navbar = ({ setFormState }) => {
  return (
    <Menu color="purple" fixed="top" inverted pointing secondary>
      <Container>
        <Menu.Item as="a" active>
          Home
        </Menu.Item>
        <Menu.Item as="a">View</Menu.Item>
        <Menu.Item as="a">
          <Button
            basic
            inverted
            color="yellow"
            onClick={() => setFormState(true)}
          >
            Create
          </Button>
        </Menu.Item>
        <Menu.Item position="right">
          <Button basic inverted color="teal">
            Log in
          </Button>
          <Button basic inverted color="teal" style={{ marginLeft: "0.5em" }}>
            Sign Up
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
