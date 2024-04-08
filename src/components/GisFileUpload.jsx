import React, { useState } from "react";
import { Typography, Tabs, Tab, Box, Button } from "@mui/material";
import ShapefileUpload from "./ShapefileUpload";
import useMapStore from "../stores/mapStore";
import KmlUpload from "./KmlUpload";

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

function geoJsonToGraphicsLayerObject(geoJson) {
  // Simple renderer structure
  const renderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: [227, 139, 79, 0.8], // RGBA color for the fill
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 1,
      },
    },
  };

  // Convert GeoJSON features to graphics
  const graphics = geoJson.features
    .map((feature) => {
      if (["Polygon", "MultiPolygon"].includes(feature.geometry.type)) {
        // Convert GeoJSON geometry to the structure expected for an ArcGIS Polygon
        return {
          geometry: {
            type: "polygon", // Autocasts to Polygon
            rings: feature.geometry.coordinates,
            spatialReference: { wkid: 4326 }, // Assuming WGS84 for simplicity; adjust as needed
          },
          symbol: {
            type: "simple-fill", // Autocasts as new SimpleFillSymbol()
            color: [227, 139, 79, 0.8], // RGBA color for the fill, optional here if using a renderer
            outline: {
              // autocasts as new SimpleLineSymbol(), optional here if using a renderer
              color: [255, 255, 255],
              width: 1,
            },
          },
          attributes: feature.properties,
        };
      }
      return null;
    })
    .filter((graphic) => graphic !== null);

  // Create a structure that matches a GraphicsLayer for autocasting
  const graphicsLayerObject = {
    type: "graphics", // Autocasts to GraphicsLayer
    graphics: graphics,
    renderer: renderer,
  };

  return graphicsLayerObject;
}

export default function GisFileUpload({ handleClose }) {
  const [value, setValue] = useState(0);
  const [currentGeoJson, setGeoJson] = useState(null);
  const [validationText, setValidationText] = useState("Validation goes here");
  const updateGraphics = useMapStore((state) => state.updateGraphics);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Placeholder for submit handler
  const handleSubmit = () => {
    handleClose();
  };

  const handleValidGeoJson = (geoJson) => {
    console.log("got it");
    console.log(geoJson);
    setGeoJson(geoJson);
    const graphics = geoJsonToGraphicsLayerObject(geoJson);
    updateGraphics(graphics);
  };

  return (
    <Box sx={{ width: "100%" }}>
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
        <ShapefileUpload onValidGeoJson={handleValidGeoJson} />
      </TabPanel>

      {/* KML Tab Content */}
      <TabPanel value={value} index={1}>
        <KmlUpload onValidGeoJson={handleValidGeoJson} />
      </TabPanel>

      {/* Add Generic Helper Text Here */}
      <Typography variant="body1" sx={{ mt: 2 }}>
        General Text Section
      </Typography>

      {/* Conditional validation text */}
      {validationText && (
        <Typography variant="body2" sx={{ color: "red" }}>
          {validationText}
        </Typography>
      )}

      {/* Button Row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
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
