import React from "react";
import { Grid } from "semantic-ui-react";

import ItemHeader from "./ItemHeader";
import ItemInfo from "./ItemInfo";
import ItemChat from "./ItemComment";
import AdditionalSideInfo from "./AdditionalSideInfo";

const ItemDetailPage = () => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <ItemHeader />
        <ItemInfo />
        <ItemChat />
      </Grid.Column>
      <Grid.Column width={4}>
        <AdditionalSideInfo />
      </Grid.Column>
    </Grid>
  );
};

export default ItemDetailPage;
