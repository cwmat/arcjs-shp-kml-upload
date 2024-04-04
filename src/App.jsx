import './App.css';
import Map from './components/Map';
import useMapStore from './stores/mapStore';
import '@arcgis/core/assets/esri/themes/dark/main.css';
import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import GisFileUpload from './components/GisFileUpload';

// Style for the modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const toggleLayer = useMapStore((state) => state.toggleLayer);
  const showLayer = useMapStore((state) => state.showLayer);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Main Header */}
      <h1>Map Example with Upload</h1>

      {/* Map Div */}
      <Map></Map>

      {/* Below the map content */}
      <div className="card">
        <Button variant="contained" onClick={handleOpen}>
          Open Modal
        </Button>
        <p>Click to Open a modal for uploading GIS data</p>
        <p>
          See <code>README.md</code> for Details, be patient on first StackBlitz
          load 🙏
        </p>
      </div>

      {/* Modal Content */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <GisFileUpload handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
}

export default App;
