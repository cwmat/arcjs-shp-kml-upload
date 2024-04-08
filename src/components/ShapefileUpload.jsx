// Assuming ShapefileUpload.js is in the same directory as your hooks folder
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import useShapefileToGeoJSON from '../hooks/useShapefileToGeoJSON';
import validateGeoJson from '../helpers/validateGeoJson';
import { CircularProgress } from '@mui/material';

const ShapefileUpload = ({ onClose, onValidGeoJson }) => {
  const [geoJsonIsValid, setGeoJsonIsValid] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { convertToGeoJSON, loading, error, geoJson } = useShapefileToGeoJSON();

  useEffect(() => {
    if (geoJson) {
      console.log('GeoJSON data:', geoJson);
      const { isValid, errors } = validateGeoJson(geoJson, 50000, ['GUID']);
      console.log(isValid, errors) // TODO: need to put these errors somewhere in UI
      if (isValid) {
        setGeoJsonIsValid(true);
        onValidGeoJson(geoJson);
      } else {
        setGeoJsonIsValid(false);
      }
    }
  }, [geoJson]);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const handleValidateRequest = async () => {
    if (uploadedFiles.length > 0) {
      await convertToGeoJSON(uploadedFiles[0]);
    }
  };

  const removeFile = (file) => () => {
    const newFiles = uploadedFiles.filter((f) => f.name !== file.name);
    setUploadedFiles(newFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/zip': ['.zip'],
    },
    multiple: false,
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Hello World - Upload your Shapefile in .zip format</p>
        {loading && <CircularProgress size={20} />}
        {loading && <span>loading</span>}
      </div>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #eeeeee',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop your shapefile here, or click to select files</p>
      </div>
      <aside>
        <h4>Uploaded File</h4>
        <ul>
          {uploadedFiles.map((file) => (
            <li key={file.path}>
              {file.path} - {file.size} bytes
              <button onClick={removeFile(file)}>Remove File</button>
            </li>
          ))}
        </ul>
      </aside>
      <button onClick={handleValidateRequest} disabled={loading}>
        Validate SHP
      </button>
      {geoJson && <p>GeoJSON is valid: {JSON.stringify(geoJsonIsValid)}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ShapefileUpload;
