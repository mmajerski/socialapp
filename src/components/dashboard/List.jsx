import React from "react";

import ListItem from "./ListItem";

const ListComponent = ({ data }) => {
  return data.map((item) => {
    return <ListItem key={item.id} item={item} />;
  });
};

export default ListComponent;
