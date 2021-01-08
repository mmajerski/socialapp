import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

import ImageCropper from "./ImageCropper";
import ImageDropzone from "./ImageDropzone";
import { extractExtension } from "../../utils/extractExtension";
import {
  updateUserProfileWithImage,
  uploadImage
} from "../../firebase/firebaseService";
import { notification } from "../../utils/notification";

const ImageUploadWidget = ({ setAddMode }) => {
  const [file, setFile] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUploadImage = () => {
    setLoading(true);
    const filename = uuidv4() + "." + extractExtension(file[0].name);
    const uploadTask = uploadImage(image, filename);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress + "%");
      },
      (error) => {
        notification(error.message, "error");
      },
      () =>
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUserProfileWithImage(downloadURL, filename)
            .then(() => {
              setLoading(false);
              handleCancelCrop();
              setAddMode(false);
              notification("Image added successfully!");
            })
            .catch((error) => {
              notification(error.message, "error");
              setLoading(false);
            });
        })
    );
  };

  const handleCancelCrop = () => {
    setFile([]);
    setImage(null);
  };

  return (
    <>
      <Segment>
        <h1>Step 1 - Add Image</h1>
        <ImageDropzone setFile={setFile} />
      </Segment>
      <Segment>
        <h1>Step 2 - Adjust</h1>
        {file.length > 0 && (
          <ImageCropper setImage={setImage} imagePreview={file[0].preview} />
        )}
      </Segment>
      <Segment>
        <h1>Step 3 - Confirm and upload</h1>
        {file.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{
                minHeight: 200,
                minWidth: 200,
                overflow: "hidden",
                margin: "0 auto"
              }}
            ></div>
            <Button
              inverted
              color="red"
              onClick={handleCancelCrop}
              loading={loading}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              inverted
              color="green"
              onClick={handleUploadImage}
              loading={loading}
            >
              Accept
            </Button>
          </>
        )}
      </Segment>
    </>
  );
};

export default ImageUploadWidget;
