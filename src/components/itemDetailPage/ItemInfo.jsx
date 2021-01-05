import React from "react";
import { Segment, Icon, Button } from "semantic-ui-react";

const ItemInfo = () => {
  return (
    <>
      <Segment attached textAlign="center">
        <Icon size="large" name="info circle" />
        <p>Description</p>
      </Segment>
      <Segment attached textAlign="center">
        <Icon name="clock outline" size="large" />
        <p>Date</p>
      </Segment>
      <Segment attached textAlign="center">
        <Icon name="location arrow" size="large" />
        <p>Location</p>
      </Segment>
      <Segment attached textAlign="center">
        <Button basic color="teal">
          Show More
        </Button>
      </Segment>
    </>
  );
};

export default ItemInfo;
