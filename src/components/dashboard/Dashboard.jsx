import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Loader } from "semantic-ui-react";

import { getAllItemsAction, getItems } from "../../redux/actions/itemActions";
import { setCategoryRedux } from "../../redux/actions/categoryActions";

import Filters from "./Filters";
import ListComponent from "./List";
import Loading from "../../layout/Loading";
import { RETAIN_STATE } from "../../redux/types";
import {
  extractDataFromDoc,
  getAllItems
} from "../../firebase/firebaseService";
import { useFirebaseCollection } from "../../utils/useFirebaseCollection";

const Dashboard = () => {
  const limit = 2;
  const { items, moreItems, lastVisible, retainState } = useSelector(
    (state) => state.item
  );
  // const [items, setItems] = useState(null);
  const [category, setCategory] = useState("");
  const { loading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  let itemsToRender;
  if (category && items) {
    itemsToRender = items.filter((item) => item.category === category);
  } else {
    itemsToRender = items;
  }

  // useEffect(() => {
  //   if (retainState) {
  //     return;
  //   }

  //   setLoadingInitial(true);
  //   setLocalLoading(true);
  //   dispatch(getItems(limit)).then(() => {
  //     setLoadingInitial(false);
  //     setLocalLoading(false);
  //   });

  //   return () => {
  //     dispatch(setCategoryRedux(""));
  //     dispatch({ type: RETAIN_STATE });
  //   };
  // }, [dispatch, retainState]);

  // const handleGetNextItems = () => {
  //   setLocalLoading(true);
  //   dispatch(getItems(limit, lastVisible)).then(() => {
  //     setLocalLoading(false);
  //   });
  // };

  // useEffect(() => {
  //   getAllItems().then((items) => {
  //     let newItems = [];
  //     items.docs.map((item) => {
  //       newItems.push(extractDataFromDoc(item));
  //     });
  //     setItems(newItems);
  //   });

  //   return () => {
  //     setCategory("");
  //   };
  // }, [setItems]);

  useFirebaseCollection({
    firestoreQuery: () => getAllItems(),
    onDataReceived: (items) => dispatch(getAllItemsAction(items)),
    dependencies: [dispatch]
  });

  if (loading || !items) {
    return <Loading />;
  }

  return (
    <Grid>
      <Grid.Column floated="left" width={10}>
        {!loadingInitial && itemsToRender.length > 0 ? (
          <ListComponent
            data={itemsToRender}
            // getNextItems={handleGetNextItems}
            // loading={localLoading}
            // moreItems={moreItems}
            // infiniteScrol
          />
        ) : (
          <p>There is no item to display.</p>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}></div>
      </Grid.Column>
      <Grid.Column floated="right" width={6}>
        <Filters category={category} setCategory={setCategory} />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={localLoading} />
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
