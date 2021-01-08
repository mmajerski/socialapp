import React from "react";
import { useSelector } from "react-redux";
import { Button, Image } from "semantic-ui-react";

const ImageItem = ({ image, isLoading, handleDelete, handleSetMain }) => {
  const { selectedUserProfile } = useSelector((state) => state.profile);

  return (
    <div>
      <Image
        style={{ marginBottom: "25px", width: 300, height: 300 }}
        src={image.url}
      />
      <div style={{ marginLeft: "50px" }}>
        <Button
          loading={isLoading}
          disabled={isLoading || selectedUserProfile.photoURL === image.url}
          onClick={() => handleSetMain(image)}
        >
          Main
        </Button>
        <Button
          loading={isLoading}
          disabled={isLoading}
          onClick={() => handleDelete(image)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ImageItem;
