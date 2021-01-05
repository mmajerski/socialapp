import React from "react";
import { useDispatch } from "react-redux";
import { Menu, Button } from "semantic-ui-react";
import { openModal } from "../../redux/actions/modalActions";

const SignedOutMenu = ({ setAuthenticate }) => {
  const dispatch = useDispatch();

  return (
    <Menu.Item position="right">
      <Button
        basic
        inverted
        color="teal"
        onClick={() => dispatch(openModal({ modalType: "LoginForm" }))}
      >
        Log in
      </Button>
      <Button basic inverted color="teal" style={{ marginLeft: "0.5em" }}>
        Sign Up
      </Button>
    </Menu.Item>
  );
};

export default SignedOutMenu;
