import { React, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMapStore from '../stores/mapStore';
import mapConfig from '../util/constants';

/**
 * Primary map component.  This component is responsible for creating the map
 * and leverages the mapStore to store the map instance.  ArcGIS JS
 * requires a native DOM element to create the map, so this component
 * uses a ref to store the DOM element and then passes it to the mapStore.
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html
 * @component
 */
const Map = ({ children }) => {
  const setContainer = useMapStore((state) => state.setContainer);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapConfig && mapRef.current) {
      setContainer(mapConfig, mapRef.current);
    }
  }, [setContainer, mapConfig]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
      }}
      ref={mapRef}
    >
      {children}
    </div>
  );
};

Map.propTypes = {
  children: PropTypes.node,
};

export default Map;
