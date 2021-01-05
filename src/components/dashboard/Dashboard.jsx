import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";

import List from "./List";

const Dashboard = () => {
  const { items } = useSelector((state) => state.item);

  return (
    <Grid>
      <Grid.Column floated="left" width={10}>
        <List data={items} />
      </Grid.Column>
      <Grid.Column floated="right" width={6}>
        <h2>FIlters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
