import React from "react";
import { Segment, Icon, Button } from "semantic-ui-react";

const ItemInfo = ({ item }) => {
  return (
    <>
      <Segment attached textAlign="center">
        <Icon size="large" name="info circle" />
        <p>{item.description}</p>
      </Segment>
      <Segment attached textAlign="center">
        <Icon name="clock outline" size="large" />
        <p>{item.date}</p>
      </Segment>
      <Segment attached textAlign="center">
        <Icon name="location arrow" size="large" />
        <p>
          {item.city}, {item.street}
        </p>
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
