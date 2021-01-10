import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Loader } from "semantic-ui-react";

import { getItems } from "../../redux/actions/itemActions";
import { setCategoryRedux } from "../../redux/actions/categoryActions";

import Filters from "./Filters";
import ListComponent from "./List";
import Loading from "../../layout/Loading";
import { CLEAR_ITEMS } from "../../redux/types";

const Dashboard = () => {
  const limit = 2;
  const { items, moreItems } = useSelector((state) => state.item);
  const { category } = useSelector((state) => state.category);
  const { loading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  let itemsToRender;
  if (category) {
    itemsToRender = items.filter((item) => item.category === category);
  } else {
    itemsToRender = items;
  }

  useEffect(() => {
    setLoadingInitial(true);
    setLocalLoading(true);
    dispatch(getItems(limit)).then((lastVisible) => {
      setLastDocSnapshot(lastVisible);
      setLoadingInitial(false);
      setLocalLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setCategoryRedux(""));
      dispatch({ type: CLEAR_ITEMS });
    };
  }, [dispatch]);

  const handleGetNextItems = () => {
    setLocalLoading(true);
    dispatch(getItems(limit, lastDocSnapshot)).then((lastVisible) => {
      setLastDocSnapshot(lastVisible);
      setLocalLoading(false);
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid>
      <Grid.Column floated="left" width={10}>
        {!loadingInitial && itemsToRender.length > 0 ? (
          <ListComponent
            data={itemsToRender}
            getNextItems={handleGetNextItems}
            loading={localLoading}
            moreItems={moreItems}
          />
        ) : (
          <p>There is no item to display.</p>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}></div>
      </Grid.Column>
      <Grid.Column floated="right" width={6}>
        <Filters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={localLoading} />
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
