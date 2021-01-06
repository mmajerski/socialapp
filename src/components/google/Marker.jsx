import React, { useState } from "react";
import { Label } from "semantic-ui-react";

import "./Marker.css";

const Marker = ({ color, street }) => {
  const [showStreetInfo, setShowStreetInfo] = useState(false);

  return (
    <>
      <div onClick={() => setShowStreetInfo(!showStreetInfo)}>
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: "pointer" }}
        />
        <div className="pulse" />
      </div>
      <Label
        style={{
          display: `${showStreetInfo ? "block" : "none"}`,
          backgroundColor: "#fff",
          width: "120px"
        }}
      >
        <p>{street}</p>
      </Label>
    </>
  );
};

export default Marker;
