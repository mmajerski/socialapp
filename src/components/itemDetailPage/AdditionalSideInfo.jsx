import React from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Label } from "semantic-ui-react";

import userImg from "../../images/user.png";

const AdditionalSideInfo = ({ members, ownerUid }) => {
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
        {members.length} {members.length > 1 ? "People" : "Person"} Currently
      </Segment>
      <Segment attached textAlign="center">
        {members.map((member) => {
          return (
            <Item as={Link} to={`/profile/${member.id}`} key={member.id}>
              {ownerUid === member.id && (
                <Label
                  style={{ display: "block" }}
                  color="green"
                  content="owner"
                />
              )}
              <Item.Image
                circular
                size="tiny"
                src={member.photoURL || userImg}
              />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <p style={{ marginBottom: "1rem" }}>{member.name}</p>
                </Item.Header>
              </Item.Content>
            </Item>
          );
        })}
      </Segment>
    </>
  );
};

export default AdditionalSideInfo;
