import React from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";

const ItemHeader = ({ item }) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={item.categoryImg} fluid />

        <Segment basic textAlign="center">
          <Item>
            <Item.Content>
              <Header size="huge">{item.title}</Header>
              <p>{item.date}</p>
              <p>
                Owner <strong>{item.owner}</strong>
              </p>
            </Item.Content>
          </Item>
        </Segment>
      </Segment>

      <Segment
        attached="bottom"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button inverted color="brown" as={Link} to={`/settings/${item.id}`}>
          Settings
        </Button>
        <Button inverted color="violet">
          JOIN
        </Button>

        <Button inverted color="red">
          Cancel
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default ItemHeader;
