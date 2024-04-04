// hooks/useShapefileToGeoJSON.js
import { useState } from 'react';
import shp from 'shpjs';

const useShapefileToGeoJSON = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [geoJson, setGeoJson] = useState(null);

  const convertToGeoJSON = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const buffer = await file.arrayBuffer();
      const geojsonData = await shp(buffer);
      setGeoJson(geojsonData);
    } catch (err) {
      setError(err.message);
      setGeoJson(null);
    } finally {
      setLoading(false);
    }
  };

  return { convertToGeoJSON, loading, error, geoJson };
};

export default useShapefileToGeoJSON;
