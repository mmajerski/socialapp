import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { setCategoryRedux } from "../../redux/actions/categoryActions";
import Filters from "./Filters";

import List from "./List";

const Dashboard = () => {
  const { items } = useSelector((state) => state.item);
  const { category } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  let itemsToRender;
  if (category) {
    itemsToRender = items.filter((item) => item.category === category);
  } else {
    itemsToRender = items;
  }

  useEffect(() => {
    return () => {
      dispatch(setCategoryRedux(""));
    };
  }, [dispatch]);

  return (
    <Grid>
      <Grid.Column floated="left" width={10}>
        {itemsToRender.length > 0 ? (
          <List data={itemsToRender} />
        ) : (
          <p>There is not item to display.</p>
        )}
      </Grid.Column>
      <Grid.Column floated="right" width={6}>
        <Filters />
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
