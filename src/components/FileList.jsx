import React from "react";

function FileList({ selectedFiles, fileType }) {
  return (
    <>
      {selectedFiles.length > 0 ? (
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      ) : (
        "None"
      )}
      {fileType && (
        <>
          <strong>Type:</strong> {fileType}
        </>
      )}
    </>
  );
}

export default FileList;
