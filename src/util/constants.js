const mapConfig = {
  layers: {
    // earthquakes: {
    //   id: 'core',
    //   url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
    //   type: 'GeoJSONLayer',
    //   visible: true,
    //   outFields: ['*'],
    // },
    references: {},
  },
  basemapIds: ['streets-vector', 'topo-vector', 'hybrid'],
  proxyRules: [],
  references: {},
  maxZoomLevel: 20,
  minZoomLevel: 6,
  defaultBounds: [-84.5, 33.8, -75, 36.6],
  defaultCenter: [-79.54, 35.71],
  locateZoomScale: 72223,
};

export default mapConfig;
