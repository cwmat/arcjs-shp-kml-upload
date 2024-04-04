/**
 * Class to hold references to the different types of ArcGIS JS widgets
 * the app leverages.  Their names closely align to their corresponding
 * ArcGIS JS API classes.
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Widget.html
 */
export class Widgets {
  static LOCATE = 'locate-widget';
  static ZOOM = 'zoom-widget';
  static HOME = 'home-widget';
  static LEGEND = 'legend-widget';
  static BASEMAP_EXPAND = 'basemap-expand-widget';
  static CUSTOM_BASEMAP = 'custom-basemap';
  static TOPO_BASEMAP = 'topo-vector';
  static STREETS_BASEMAP = 'streets-vector';
  static IMAGERY_BASEMAP = 'hybrid';
}
