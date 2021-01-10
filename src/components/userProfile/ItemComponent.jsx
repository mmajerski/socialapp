import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "semantic-ui-react";
import { getItemsListener } from "../../firebase/firebaseService";
import { getItems } from "../../redux/actions/itemActions";
import { useFirebaseCollection } from "../../utils/useFirebaseCollection";

import ListComponent from "../dashboard/List";

const ItemComponent = ({ match }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.item);

  useFirebaseCollection({
    firestoreQuery: () => getItemsListener(),
    onDataReceived: (items) => dispatch(getItems(items)),
    dependencies: [dispatch]
  });

  const filteredItems = items.filter(
    (item) => item.ownerUid === match.params.id
  );

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
