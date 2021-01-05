import React from "react";
import { Segment, Container, Button, Icon } from "semantic-ui-react";

const StartPage = ({ history }) => {
  return (
    <Segment inverted textAlign="center" vertical className="no-head">
      <Container>
        <Button
          size="huge"
          basic
          inverted
          onClick={() => {
            history.push("/items");
          }}
        >
          Start now
          <Icon name="chevron right" inverted />
        </Button>
      </Container>
    </Segment>
  );
};

export default StartPage;
