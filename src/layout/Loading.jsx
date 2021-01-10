import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Dimmer, Loader } from "semantic-ui-react";
import { openModal } from "../redux/actions/modalActions";

const Loading = ({ content = "Loading..." }) => {
  const dispatch = useDispatch();

  if (content === "You are signed out!") {
    return (
      <Dimmer active>
        <p>{content}</p>
        <Button
          basic
          inverted
          color="teal"
          onClick={() => dispatch(openModal({ modalType: "LoginForm" }))}
        >
          Sign in
        </Button>
        <Button
          basic
          inverted
          color="teal"
          style={{ marginLeft: "0.5em" }}
          onClick={() => dispatch(openModal({ modalType: "SignUpForm" }))}
        >
          Sign Up
        </Button>
        <div>
          <Button
            basic
            inverted
            color="olive"
            as={Link}
            to="/items"
            style={{ marginTop: "2.5em" }}
          >
            Home
          </Button>
        </div>
      </Dimmer>
    );
  }

  if (content === "forbidden") {
    return (
      <Dimmer active>
        <p>You do not have rights to perform this action!</p>
        <p>Please log in.</p>
        <Button
          basic
          inverted
          color="teal"
          onClick={() => dispatch(openModal({ modalType: "LoginForm" }))}
        >
          Sign in
        </Button>
        <Button
          basic
          inverted
          color="teal"
          style={{ marginLeft: "0.5em" }}
          onClick={() => dispatch(openModal({ modalType: "SignUpForm" }))}
        >
          Sign Up
        </Button>
        <div>
          <Button
            basic
            inverted
            color="olive"
            as={Link}
            to="/items"
            style={{ marginTop: "2.5em" }}
          >
            Home
          </Button>
        </div>
      </Dimmer>
    );
  }

  return (
    <Dimmer active>
      <Loader>{content}</Loader>
    </Dimmer>
  );
};

export default Loading;
