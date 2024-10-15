import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone({ onDropFiles }) {
  const onDrop = useCallback((acceptedFiles) => {
    onDropFiles(acceptedFiles);
  }, [onDropFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #cccccc",
        padding: "40px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p className="mt-3">Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default MyDropzone;