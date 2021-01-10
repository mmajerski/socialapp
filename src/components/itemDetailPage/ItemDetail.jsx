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
import { selectedItemListener } from "../../redux/actions/itemActions";

const ItemDetail = ({ match }) => {
  const item = useSelector((state) => state.item.selectedItem);
  const { currentUser } = useSelector((state) => state.auth);
  const { message: errorMessage } = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useFirebaseDocument({
    firestoreQuery: () => getItemListener(match.params.id),
    onDataReceived: (item) => dispatch(selectedItemListener(item)),
    dependencies: [match.params.id],
    shouldExecute: true
  });

  if (!item && !errorMessage) {
    return <Loading />;
  }

  const isOwner = item?.ownerUid === currentUser?.uid;
  const isMember = item?.members?.some((m) => m.id === currentUser?.uid);

  if (errorMessage) {
    return <Redirect to="/error" />;
  }

  return (
    <Grid>
      <Grid.Column width={12}>
        <ItemHeader
          item={item}
          isOwner={isOwner}
          isMember={isMember}
          currentUser={currentUser}
        />
        <ItemInfo item={item} />
        <ItemComment
          isMember={isMember}
          currentUser={currentUser}
          itemId={item.id}
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <AdditionalSideInfo members={item.members} ownerUid={item.ownerUid} />
      </Grid.Column>
    </Grid>
  );
};

export default ItemDetail;
