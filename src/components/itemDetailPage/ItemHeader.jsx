import React from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";

const ItemHeader = () => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src="https://source.unsplash.com/random/640x480" fluid />

        <Segment basic textAlign="center">
          <Item>
            <Item.Content>
              <Header size="huge">Title</Header>
              <p>Date</p>
              <p>
                Owner <strong>Mike</strong>
              </p>
            </Item.Content>
          </Item>
        </Segment>
      </Segment>

      <Segment
        attached="bottom"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button inverted color="brown" as={Link} to={`/settings/`}>
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
