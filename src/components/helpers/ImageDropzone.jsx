import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

function ImageDropzone({ setFile }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
    [setFile]
  );

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
    isDragActive
  } = useDropzone({ onDrop, accept: "image/*" });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(acceptedFiles.length > 0 && !isDragActive ? acceptStyle : {}),
      ...(fileRejections.length > 0 && !isDragActive ? rejectStyle : {})
    }),
    [isDragActive, fileRejections, acceptedFiles]
  );

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {acceptedFileItems.length > 0 && (
        <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
        </aside>
      )}
      {fileRejectionItems.length > 0 && (
        <aside>
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>
      )}
    </div>
  );
}

<ImageDropzone />;

export default ImageDropzone;
