import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Loading = ({ content = "Loading..." }) => {
  return (
    <Dimmer active>
      <Loader>{content}</Loader>
    </Dimmer>
  );
};

export default Loading;
