import React from "react";
import { Segment, Item } from "semantic-ui-react";

const AdditionalSideInfo = ({ members }) => {
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
            <Item
              key={member.id}
              style={{ position: "relative", marginBottom: "1rem" }}
            >
              <Item.Image circular size="tiny" src={member.photoURL} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <p>{member.name}</p>
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
