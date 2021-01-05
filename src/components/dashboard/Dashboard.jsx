import React, { useState } from "react";
import { Grid } from "semantic-ui-react";

import List from "./List";
import { dummyData } from "../../utils/dummyData";

const Dashboard = () => {
  const [items, setItems] = useState(dummyData);

  // const handleAddItem = (item) => {
  //   setItems([...items, item]);
  // };

  // const handleUpdateItem = (updatedItem) => {
  //   setItems(
  //     items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
  //   );
  //   selectItem(null);
  //   setFormState(false);
  //   clearForm();
  // };

  const handleDelete = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  return (
    <Grid>
      <Grid.Column floated="left" width={10}>
        <List data={items} deleteItem={handleDelete} />
      </Grid.Column>
      <Grid.Column floated="right" width={6}>
        <h2>FIlters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
