/**
 * Class to hold references to the different types of map layers the app
 * supports.  These are used in the map config and map manager.  Their
 * names closely align to their corresponding ArcGIS JS API classes.
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-Layer.html
 */
export class LayerTypes {
  static FEATURE = 'FeatureLayer';
  static MAP_TILE = 'MapTileLayer';
  static TILE = 'TileLayer';
  static VECTOR_TILE = 'VectorTileLayer';
  static WEB_TILE = 'WebTileLayer';
  static GEO_JSON = 'GeoJSONLayer';
  static MAP_IMAGE = 'MapImageLayer';
  static GROUP = 'GroupLayer';
}
