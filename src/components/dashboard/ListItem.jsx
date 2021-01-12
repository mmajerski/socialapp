import React from "react";
import { Link } from "react-router-dom";
import { Item, Segment, Icon, List, Button, Label } from "semantic-ui-react";

import { deleteItemFromFirebase } from "../../firebase/firebaseService";
import ListMember from "./ListMember";
import userImg from "../../images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "../../utils/notification";
import { DELETE_ITEM, RETAIN_STATE_CLEAR } from "../../redux/types";
import Loading from "../../layout/Loading";

const ListItem = ({ item }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!item) {
    return <Loading />;
  }

  return (
    <Segment.Group>
      <Segment textAlign="center">
        <Item>
          <Item.Image
            as={Link}
            to={`/profile/${item.ownerUid}`}
            size="tiny"
            circular
            src={item.ownerPhoto || userImg}
          />
          <Item.Content>
            <Item.Header>{item.title}</Item.Header>
            <Item.Description>{item.owner}</Item.Description>
            {item.isCancelled && (
              <Label floating style={{ top: "10px", left: "90%" }} color="grey">
                Inactive
              </Label>
            )}
          </Item.Content>
        </Item>
      </Segment>
      <Segment textAlign="center">
        <div>
          <Icon name="calendar alternate" /> {item.date}
        </div>
        <div>
          <Icon name="location arrow" />
          <p>{item.city.address}</p>
          <p>{item.street.address}</p>
        </div>
      </Segment>
      <Segment color="teal" secondary>
        <List horizontal>
          {item?.members?.length > 0 ? (
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
      </Segment>
      <Segment style={{ display: "flex", justifyContent: "space-between" }}>
        {currentUser?.uid === item.ownerUid && (
          <Button
            color="red"
            onClick={() =>
              deleteItemFromFirebase(item.id).then(() => {
                // dispatch({ type: DELETE_ITEM, payload: item.id });
                notification("Item has been deleted!");
              })
            }
          >
            Delete
          </Button>
        )}
        <Button color="blue" as={Link} to={`/items/${item.id}`}>
          Check Out More
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default ListItem;
