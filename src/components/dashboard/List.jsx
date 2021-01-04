import React from "react";

import ListItem from "./ListItem";

const ListComponent = ({ data, selectItem, deleteItem }) => {
  return data.map((item) => {
    return (
      <ListItem
        key={item.id}
        item={item}
        selectItem={selectItem}
        deleteItem={deleteItem}
      />
    );
  });
};

export default ListComponent;
