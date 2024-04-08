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
  defaultBounds: [-128.232422, 33.422272, -107.325439, 41.360319],
  defaultCenter: [-117.7, 37.4],
  locateZoomScale: 72223,
};

export default mapConfig;
