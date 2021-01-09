import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";

import { getItems } from "../../redux/actions/itemActions";
import { getItemsListener } from "../../firebase/firebaseService";
import { setCategoryRedux } from "../../redux/actions/categoryActions";

import Filters from "./Filters";
import ListComponent from "./List";
import { useFirebaseCollection } from "../../utils/useFirebaseCollection";
import Loading from "../../layout/Loading";

const Dashboard = () => {
  const { items } = useSelector((state) => state.item);
  const { category } = useSelector((state) => state.category);
  const { loading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();

  let itemsToRender;
  if (category) {
    itemsToRender = items.filter((item) => item.category === category);
  } else {
    itemsToRender = items;
  }

  useFirebaseCollection({
    firestoreQuery: () => getItemsListener(),
    onDataReceived: (items) => dispatch(getItems(items)),
    dependencies: [dispatch]
  });

  useEffect(() => {
    return () => {
      dispatch(setCategoryRedux(""));
    };
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid>
      <Grid.Column floated="left" width={10}>
        {itemsToRender.length > 0 ? (
          <ListComponent data={itemsToRender} />
        ) : (
          <p>There is no item to display.</p>
        )}
      </Grid.Column>
      <Grid.Column floated="right" width={6}>
        <Filters />
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
