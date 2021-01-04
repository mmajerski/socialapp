import React from "react";
import { Item, Segment, Icon, List, Button } from "semantic-ui-react";

import ListMember from "./ListMember";

const ListItem = ({ item }) => {
  return (
    <Segment.Group>
      <Segment textAlign="center">
        <Item>
          <Item.Image size="tiny" circular src={item.ownerPhoto} />
          <Item.Content>
            <Item.Header>{item.title}</Item.Header>
            <Item.Description>{item.owner}</Item.Description>
          </Item.Content>
        </Item>
      </Segment>
      <Segment textAlign="center">
        <div>
          <Icon name="calendar alternate" /> {item.date}
        </div>
        <div>
          <Icon name="location arrow" /> {item.city}, {item.street}
        </div>
      </Segment>
      <Segment color="teal" secondary>
        <List horizontal>
          {item.members.map((member) => {
            return <ListMember key={member.id} member={member} />;
          })}
        </List>
      </Segment>
      <Segment clearing color="teal">
        <div>{item.description}</div>
        <Button color="blue" floated="right">
          Check Out More
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default ListItem;
