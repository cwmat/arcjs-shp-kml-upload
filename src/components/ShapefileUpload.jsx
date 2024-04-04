// Assuming ShapefileUpload.js is in the same directory as your hooks folder
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import useShapefileToGeoJSON from '../hooks/useShapefileToGeoJSON';
import { CircularProgress } from '@mui/material';

const ShapefileUpload = ({ onClose }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { convertToGeoJSON, loading, error, geoJson } = useShapefileToGeoJSON();

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const handleSubmit = async () => {
    console.log('test');
    if (uploadedFiles.length > 0) {
      console.log('sending job');
      await convertToGeoJSON(uploadedFiles[0]);
      console.log('completed job');
      console.log(geoJson);
      // onClose or any additional logic after conversion
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
      <button onClick={handleSubmit} disabled={loading}>
        Validate SHP
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ShapefileUpload;
