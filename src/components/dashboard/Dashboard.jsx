import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import RightForm from "../rightSectionForm/RightForm";

import List from "./List";
import { dummyData } from "../../utils/dummyData";

const Dashboard = ({ formState, setFormState }) => {
  const [items, setItems] = useState(dummyData);

  return (
    <Grid>
      <Grid.Column floated="left" width={10}>
        <List data={items} />
      </Grid.Column>
      <Grid.Column floated="right" width={6}>
        {formState && <RightForm setFormState={setFormState} />}
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
