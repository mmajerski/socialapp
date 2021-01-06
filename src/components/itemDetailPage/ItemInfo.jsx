import React, { useState } from "react";
import { Segment, Icon, Button } from "semantic-ui-react";

import GoogleMap from "../google/GoogleMap";

const ItemInfo = ({ item }) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <Segment attached textAlign="center">
        <Icon size="large" name="info circle" />
        <p>{item.description}</p>
      </Segment>
      <Segment attached textAlign="center">
        <Icon name="clock outline" size="large" />
        <p>{item.date}</p>
      </Segment>
      <Segment attached textAlign="center">
        <Icon name="location arrow" size="large" />
        <p>{item.city.address}</p>
        <p>{item.street.address}</p>
      </Segment>
      <Segment attached textAlign="center">
        <Button basic color="teal" onClick={() => setShowMap(!showMap)}>
          Show More
        </Button>
      </Segment>
      <Segment attached style={{ display: `${showMap ? "block" : "none"}` }}>
        <GoogleMap
          lat={item.street.latLng.lat}
          lng={item.street.latLng.lng}
          streetInfo={item.street.address}
          zoom={12}
        />
      </Segment>
    </>
  );
};

export default ItemInfo;
