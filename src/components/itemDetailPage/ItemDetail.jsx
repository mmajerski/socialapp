import React from "react";
import { Grid } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import ItemHeader from "./ItemHeader";
import ItemInfo from "./ItemInfo";
import ItemComment from "./ItemComment";
import AdditionalSideInfo from "./AdditionalSideInfo";
import Loading from "../../layout/Loading";

import { useFirebaseDocument } from "../../utils/useFirebaseDocument";
import { getItemListener } from "../../firebase/firebaseService";
import { getItems } from "../../redux/actions/itemActions";

const ItemDetail = ({ match }) => {
  const item = useSelector((state) =>
    state.item.items.find((item) => item.id === match.params.id)
  );
  const { message: errorMessage } = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useFirebaseDocument({
    firestoreQuery: () => getItemListener(match.params.id),
    onDataReceived: (item) => dispatch(getItems([item])),
    dependencies: [match.params.id],
    shouldExecute: true
  });

  if (!item && !errorMessage) {
    return <Loading />;
  }

  if (errorMessage) {
    return <Redirect to="/error" />;
  }

  return (
    <Grid>
      <Grid.Column width={12}>
        <ItemHeader item={item} />
        <ItemInfo item={item} />
        <ItemComment />
      </Grid.Column>
      <Grid.Column width={4}>
        <AdditionalSideInfo members={item.members} />
      </Grid.Column>
    </Grid>
  );
};

export default ItemDetail;
