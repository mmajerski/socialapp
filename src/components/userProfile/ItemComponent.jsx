import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "semantic-ui-react";
import { getItemsListener } from "../../firebase/firebaseService";
import Loading from "../../layout/Loading";
import { getAllItemsAction, getItems } from "../../redux/actions/itemActions";
import { useFirebaseCollection } from "../../utils/useFirebaseCollection";

import {
  getAllItems,
  extractDataFromDoc
} from "../../firebase/firebaseService";

import ListComponent from "../dashboard/List";

const ItemComponent = ({ match }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.item);
  // const [items, setItems] = useState(null);

  useFirebaseCollection({
    firestoreQuery: () => getAllItems(),
    onDataReceived: (items) => dispatch(getAllItemsAction(items)),
    dependencies: [dispatch]
  });

  // useEffect(() => {
  //   getAllItems().then((items) => {
  //     let newItems = [];
  //     items.docs.map((item) => {
  //       newItems.push(extractDataFromDoc(item));
  //     });
  //     setItems(newItems);
  //   });
  // }, [match.params.id]);

  if (!items) {
    return <Loading />;
  }

  let filteredItems = [];
  if (items) {
    filteredItems = items.filter((item) => item.ownerUid === match.params.id);
  }

  return (
    <Tab.Pane>
      {filteredItems.length > 0 ? (
        <ListComponent data={filteredItems} />
      ) : (
        <p>There is no item to display.</p>
      )}
    </Tab.Pane>
  );
};

export default ItemComponent;
