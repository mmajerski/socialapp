import React from "react";
import GoogleMapReact from "google-map-react";

const SimpleMap = () => {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDrF9_XUoZ1cNEk8xwd5f4bKXaneOCjbMg" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      ></GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
