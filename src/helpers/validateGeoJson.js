const validateGeoJson = (geoJson, maxVertices = 50000, requiredProps = ['GUID']) => {
    const errors = [];
    let isValid = true;
    let totalVertices = 0;
  
    if (!geoJson || geoJson.type !== 'FeatureCollection' || !Array.isArray(geoJson.features)) {
      errors.push({ type: 'InvalidFormat', message: 'The GeoJSON format is invalid or not a FeatureCollection.' });
      isValid = false;
      return { isValid, errors };
    }
  
    for (const feature of geoJson.features) {
      // Check if geometry type is MultiPolygon or Polygon
      if (!['MultiPolygon', 'Polygon'].includes(feature.geometry.type)) {
        errors.push({ type: 'InvalidGeometry', message: `Geometry type ${feature.geometry.type} is not allowed.` });
        isValid = false;
      }
  
      // Check for required properties
      for (const propName of requiredProps) {
        if (!(propName in feature.properties)) {
          errors.push({ type: 'MissingProperty', message: `Missing required property: ${propName}.` });
          isValid = false;
        }
      }
  
      // Count vertices and validate against maxVertices
      const countVertices = (coords) => {
        coords.forEach(coord => {
          if (Array.isArray(coord[0])) {
            countVertices(coord);
          } else {
            totalVertices += 1;
          }
        });
      };
  
      countVertices(feature.geometry.coordinates);
    }
  
    if (totalVertices > maxVertices) {
      errors.push({ type: 'VerticesExceeded', message: `The total number of vertices ${totalVertices} exceeds the maximum allowed (${maxVertices}).` });
      isValid = false;
    }
  
    return { isValid, errors };
  };
  
export default validateGeoJson;