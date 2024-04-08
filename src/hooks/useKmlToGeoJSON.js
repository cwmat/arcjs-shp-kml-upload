import { useState } from 'react';
import * as toGeoJSON from '@mapbox/togeojson';
import JSZip from 'jszip';

const useKmlToGeoJSON = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [geoJson, setGeoJson] = useState(null);

  const convertToGeoJSON = async (file) => {
    setLoading(true);
    setError(null);

    try {
      // Check if the file is a KMZ (application/vnd.google-earth.kmz) or KML (application/vnd.google-earth.kml+xml)
      if (file.type === 'application/vnd.google-earth.kmz') {
        const zip = new JSZip();
        const contents = await zip.loadAsync(file);
        const kmlFile = Object.keys(contents.files).find(filename => filename.endsWith('.kml'));
        if (!kmlFile) {
          throw new Error('KMZ does not contain a KML file.');
        }
        const kmlText = await contents.file(kmlFile).async('string');
        const kml = new DOMParser().parseFromString(kmlText, 'text/xml');
        setGeoJson(toGeoJSON.kml(kml));
      } else if (file.type === 'application/vnd.google-earth.kml+xml' || file.name.endsWith('.kml')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const kml = new DOMParser().parseFromString(e.target.result, 'text/xml');
          setGeoJson(toGeoJSON.kml(kml));
        };
        reader.onerror = () => setError('Failed to read the KML file.');
        reader.readAsText(file);
      } else {
        throw new Error('Unsupported file type. Please upload a KML or KMZ file.');
      }
    } catch (err) {
      setError(err.message);
      setGeoJson(null);
    } finally {
      setLoading(false);
    }
  };

  return { convertToGeoJSON, loading, error, geoJson };
};

export default useKmlToGeoJSON;
