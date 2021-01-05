import React from "react";
import { Grid } from "semantic-ui-react";

import ItemHeader from "./ItemHeader";
import ItemInfo from "./ItemInfo";
import ItemComment from "./ItemComment";
import AdditionalSideInfo from "./AdditionalSideInfo";
import { useSelector } from "react-redux";

const ItemDetail = ({ match }) => {
  const item = useSelector((state) =>
    state.item.items.find((item) => item.id === match.params.id)
  );

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
