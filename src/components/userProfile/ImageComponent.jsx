import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Segment, Tab } from "semantic-ui-react";
import {
  deleteImageFromProfile,
  getPhotosListener,
  setImageAsMain
} from "../../firebase/firebaseService";
import { notification } from "../../utils/notification";
import { useFirebaseCollection } from "../../utils/useFirebaseCollection";
import { updateProfileImage } from "../../redux/actions/authActions";

import ImageUploadWidget from "../helpers/ImageUploadWidget";
import ImageItem from "./ImageItem";

const ImageComponent = ({ isCurrentUser }) => {
  const [addMode, setAddMode] = useState(false);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);

  useFirebaseCollection({
    firestoreQuery: () => getPhotosListener(currentUser.uid),
    onDataReceived: (items) => setImages(items),
    dependencies: [setImages]
  });

  const handleDelete = async (image) => {
    setIsLoading(true);
    try {
      await deleteImageFromProfile(image);
      dispatch(updateProfileImage(null));
      setIsLoading(false);
      notification("Image deleted successfully!");
    } catch (error) {
      notification(error.error, "error");
      setIsLoading(false);
    }
  };

  const handleSetMain = async (image) => {
    setIsLoading(true);
    try {
      await setImageAsMain(image);
      dispatch(updateProfileImage(image.url));
      setIsLoading(false);
      notification("Image changed as main!");
    } catch (error) {
      notification(error.error, "error");
      setIsLoading(false);
    }
  };

  return (
    <Tab.Pane>
      <Segment textAlign="center">
        <h1>Image</h1>
        {isCurrentUser && (
          <Button onClick={() => setAddMode(!addMode)}>
            {addMode ? "Cancel" : "Add"}
          </Button>
        )}
      </Segment>
      <div>
        {addMode ? (
          <ImageUploadWidget setAddMode={setAddMode} />
        ) : (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {images.length > 0 &&
              images.map((image) => (
                <ImageItem
                  key={image.name}
                  image={image}
                  handleDelete={handleDelete}
                  handleSetMain={handleSetMain}
                  isLoading={isLoading}
                />
              ))}
          </div>
        )}
      </div>
    </Tab.Pane>
  );
};

export default ImageComponent;
