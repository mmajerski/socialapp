import React from "react";
import { Item, Segment, Icon, List, Button } from "semantic-ui-react";

import ListMember from "./ListMember";

const ListItem = ({ item, selectItem, deleteItem }) => {
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
          {item.members.length > 0 ? (
            item.members.map((member) => {
              return <ListMember key={member.id} member={member} />;
            })
          ) : (
            <List.Item>
              <p>No members yet.</p>
            </List.Item>
          )}
        </List>
      </Segment>
      <Segment clearing color="teal">
        <div>{item.description}</div>
        <Button color="red" floated="right" onClick={() => deleteItem(item.id)}>
          Delete
        </Button>
        <Button color="blue" floated="right" onClick={() => selectItem(item)}>
          Check Out More
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default ListItem;
