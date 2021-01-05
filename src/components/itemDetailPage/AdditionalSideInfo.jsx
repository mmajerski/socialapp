import React from "react";
import { Segment, Item } from "semantic-ui-react";

import userImg from "../../images/user.png";

const AdditionalSideInfo = () => {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="brown"
      >
        2 People Currently
      </Segment>
      <Segment attached textAlign="center">
        <Item style={{ position: "relative", marginBottom: "1rem" }}>
          <Item.Image size="tiny" src={userImg} />
          <Item.Content verticalAlign="middle">
            <Item.Header as="h3">
              <p>Mike</p>
            </Item.Header>
          </Item.Content>
        </Item>
        <Item style={{ position: "relative", marginBottom: "1rem" }}>
          <Item.Image size="tiny" src={userImg} />
          <Item.Content verticalAlign="middle">
            <Item.Header as="h3">
              <p>Mike</p>
            </Item.Header>
          </Item.Content>
        </Item>
      </Segment>
    </>
  );
};

export default AdditionalSideInfo;
