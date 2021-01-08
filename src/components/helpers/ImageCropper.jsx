import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCropper = ({ setImage, imagePreview }) => {
  const cropperRef = useRef(null);

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.getCroppedCanvas().toBlob((blob) => {
      setImage(blob);
    }, "image/*");
  };

  return (
    <Cropper
      src={imagePreview}
      style={{ height: 400, width: "100%" }}
      // Cropper.js options
      initialAspectRatio={1}
      viewMode={1}
      dragMode="move"
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
      preview=".img-preview"
    />
  );
};

export default ImageCropper;
