import React, { useState } from 'react';
import { Typography, Tabs, Tab, Box, Button } from '@mui/material';
import ShapefileUpload from './ShapefileUpload';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function GisFileUpload({ handleClose }) {
  const [value, setValue] = useState(0);
  const [validationText, setValidationText] = useState('Validation goes here');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Placeholder for submit handler
  const handleSubmit = () => {
    setValidationText('Submit not implemented yet.');
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Typography variant="h6" component="div">
        GIS File Upload
      </Typography>

      {/* Tabber */}
      <Tabs value={value} onChange={handleChange} aria-label="file type tabs">
        <Tab label="Shapefile" />
        <Tab label="KML" />
      </Tabs>

      {/* Shapefile Tab Content */}
      <TabPanel value={value} index={0}>
        <ShapefileUpload />
      </TabPanel>

      {/* KML Tab Content */}
      <TabPanel value={value} index={1}>
        Hello World KML
      </TabPanel>

      {/* Add Generic Helper Text Here */}
      <Typography variant="body1" sx={{ mt: 2 }}>
        General Text Section
      </Typography>

      {/* Conditional validation text */}
      {validationText && (
        <Typography variant="body2" sx={{ color: 'red' }}>
          {validationText}
        </Typography>
      )}

      {/* Button Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
