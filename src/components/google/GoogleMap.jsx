import React from "react";
import GoogleMapReact from "google-map-react";

import Marker from "./Marker";

const GoogleMap = ({ lat, lng, zoom, streetInfo }) => {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "450px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDrF9_XUoZ1cNEk8xwd5f4bKXaneOCjbMg" }}
        center={{ lat, lng }}
        zoom={zoom}
      >
        <Marker lat={lat} lng={lng} street={streetInfo} color="#ba2b2b" />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
