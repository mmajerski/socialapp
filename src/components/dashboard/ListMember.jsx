import React from "react";
import { List, Image } from "semantic-ui-react";

import userImg from "../../images/user.png";

const ListMember = ({ member }) => {
  return (
    <List.Item>
      <Image size="mini" circular src={member.photoURL} />
      <p>{member.name}</p>
    </List.Item>
  );
};

export default ListMember;
