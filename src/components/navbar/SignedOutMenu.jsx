import React from "react";
import { Menu, Button } from "semantic-ui-react";

const SignedOutMenu = ({ setAuthenticate }) => {
  return (
    <Menu.Item position="right">
      <Button basic inverted color="teal" onClick={() => setAuthenticate(true)}>
        Log in
      </Button>
      <Button basic inverted color="teal" style={{ marginLeft: "0.5em" }}>
        Sign Up
      </Button>
    </Menu.Item>
  );
};

export default SignedOutMenu;
