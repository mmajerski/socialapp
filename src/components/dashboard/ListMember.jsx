import React from "react";
import { Link } from "react-router-dom";
import { List, Image } from "semantic-ui-react";

import userImg from "../../images/user.png";

const ListMember = ({ member }) => {
  return (
    <List.Item>
      <Image size="mini" circular src={member.photoURL || userImg} />
      <p>
        <Link to={`/profile/${member.id}`}>{member.name}</Link>
      </p>
    </List.Item>
  );
};

export default ListMember;
