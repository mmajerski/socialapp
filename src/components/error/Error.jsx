import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import { clearError } from "../../redux/actions/errorActions";

const Error = () => {
  const { message } = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <Segment textAlign="center">
      {message ? <h1>{message}</h1> : <h1>An error occurred!</h1>}
      <Button color="grey" as={Link} to="/items">
        Return to main page.
      </Button>
    </Segment>
  );
};

export default Error;
