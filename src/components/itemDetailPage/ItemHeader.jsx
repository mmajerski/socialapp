import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import {
  cancelUserMember,
  makeUserMember
} from "../../firebase/firebaseService";

import { notification } from "../../utils/notification";

const ItemHeader = ({ item, isOwner, isMember, currentUser }) => {
  const [loading, setLoading] = useState(false);

  const makeUserMemberHandler = async () => {
    setLoading(true);
    try {
      await makeUserMember(item);
      setLoading(false);
      notification("You joined in!");
    } catch (error) {
      setLoading(false);
      notification(error.message, "error");
    }
  };

  const cancelUserMemberHandler = async () => {
    setLoading(true);
    try {
      await cancelUserMember(item);
      setLoading(false);
      notification("You left this!");
    } catch (error) {
      setLoading(false);
      notification(error.message, "error");
    }
  };

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={item.imageURL} fluid />

        <Segment basic textAlign="center">
          <Item>
            <Item.Content>
              <Header size="huge">{item.title}</Header>
              <p>{item.date}</p>
              <p>
                Owner{" "}
                <strong>
                  <Link to={`/profile/${item.ownerUid}`}>{item.owner}</Link>
                </strong>
              </p>
            </Item.Content>
          </Item>
        </Segment>
      </Segment>

      {currentUser && (
        <Segment attached="bottom" textAlign="center">
          {isOwner && (
            <Button
              inverted
              color="brown"
              as={Link}
              to={`/settings/${item.id}`}
            >
              Settings
            </Button>
          )}
          {!isOwner && !item.isCancelled && (
            <>
              {isMember ? (
                <Button
                  loading={loading}
                  disabled={loading}
                  onClick={cancelUserMemberHandler}
                  inverted
                  color="red"
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  loading={loading}
                  disabled={loading}
                  onClick={makeUserMemberHandler}
                  inverted
                  color="violet"
                >
                  JOIN
                </Button>
              )}
            </>
          )}
        </Segment>
      )}
    </Segment.Group>
  );
};

export default ItemHeader;
