import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import useKmlToGeoJSON from "../hooks/useKmlToGeoJSON";
import { CircularProgress } from "@mui/material";

const KmlUpload = ({ onValidGeoJson }) => {
  const { convertToGeoJSON, loading, error, geoJson } = useKmlToGeoJSON();
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        convertToGeoJSON(file);
      }
    },
    [convertToGeoJSON]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      "application/vnd.google-earth.kml+xml,application/vnd.google-earth.kmz",
    multiple: false,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #eeeeee",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag and drop your KML/KMZ file here, or click to select files</p>
        {loading && <CircularProgress size={20} />}
      </div>
      {uploadedFile && <p>Uploaded file: {uploadedFile.name}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {geoJson && (
        <>
          <p>GeoJSON conversion successful!</p>
          {onValidGeoJson(geoJson)}
        </>
      )}
    </div>
  );
};

export default KmlUpload;
