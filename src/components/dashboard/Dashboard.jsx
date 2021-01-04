import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import RightForm from "../rightSectionForm/RightForm";

import List from "./List";
import { dummyData } from "../../utils/dummyData";

const Dashboard = ({
  formState,
  setFormState,
  selectItem,
  selectedItem,
  clearForm
}) => {
  const [items, setItems] = useState(dummyData);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleUpdateItem = (updatedItem) => {
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    selectItem(null);
    setFormState(false);
    clearForm();
  };

  const handleDelete = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  return (
    <Grid>
      <Grid.Column floated="left" width={formState ? 10 : 16}>
        <List data={items} selectItem={selectItem} deleteItem={handleDelete} />
      </Grid.Column>
      <Grid.Column floated="right" width={6}>
        {formState && (
          <RightForm
            setFormState={setFormState}
            addItem={handleAddItem}
            selectedItem={selectedItem}
            clearForm={clearForm}
            updateItem={handleUpdateItem}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
