import React from "react";
import InfiniteScrol from "react-infinite-scroller";

import ListItem from "./ListItem";

const ListComponent = ({ data, getNextItems, loading, moreItems }) => {
  return (
    <>
      {data.length !== 0 && (
        <InfiniteScrol
          pageStart={0}
          loadMore={getNextItems}
          hasMore={!loading && moreItems}
          initialLoad={false}
        >
          {data.map((item) => {
            return <ListItem key={item.id} item={item} />;
          })}
        </InfiniteScrol>
      )}
    </>
  );
};

export default ListComponent;
