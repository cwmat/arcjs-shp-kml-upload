import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js';
import TileLayer from '@arcgis/core/layers/TileLayer';
import { LayerTypes } from '../util/layerTypes';
import { Layers } from '../util/layers';

/**
 * Class to load map layers based on the config passed in.
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-Layer.html
 */
export class LayerService {
  /**
   * Loads a layer based on the config passed in.
   */
  loadLayer(layer) {
    switch (layer?.type) {
      case LayerTypes.FEATURE:
        return this.loadFeatureLayer(layer);
      case LayerTypes.VECTOR_TILE:
        return this.loadVectorTileLayer(layer);
      case LayerTypes.TILE:
        return this.loadTileLayer(layer);
      case LayerTypes.GEO_JSON:
        return this.loadGeoJsonLayer(layer);
      case LayerTypes.MAP_IMAGE:
        return this.loadMapImageLayer(layer);
      default:
        return null;
    }
  }

  /**
   * Loads a feature layer based on the config passed in.
   */
  loadFeatureLayer(config) {
    const layer = new FeatureLayer({
      id: config.id,
      url: config.url,
      outFields: config.outFields ?? ['*'],
      visible: config.visible ?? true,
      opacity: config.opacity ?? 1,
      refreshInterval: config.refreshInterval ?? 0,
      maxScale: config.maxScale ?? 0,
      minScale: config.minScale ?? 0,
      legendEnabled: config.legendEnabled ?? false,
      labelingInfo: config.label ? [config.label] : [],
    });

    if (config?.renderer) {
      layer.renderer = config.renderer;
    }
    return layer;
  }

  /**
   * Loads a vector tile layer based on the config passed in.
   */
  loadVectorTileLayer(config) {
    const layer = new VectorTileLayer({
      id: config.id,
      url: config.url,
      visible: config.visible ?? true,
      maxScale: config.maxScale ?? 0,
      minScale: config.minScale ?? 0,
      // legendEnabled: config.legendEnabled ?? false,
    });

    return layer;
  }

  /**
   * Loads a tile layer based on the config passed in.
   */
  loadTileLayer(config) {
    const layer = new TileLayer({
      id: config.id,
      url: config.url,
      visible: config.visible ?? true,
      maxScale: config.maxScale ?? 0,
      minScale: config.minScale ?? 0,
      legendEnabled: config.legendEnabled ?? false,
    });

    return layer;
  }

  /**
   * Loads a geo json layer based on the config passed in.
   */
  loadGeoJsonLayer(config) {
    const layer = new GeoJSONLayer({
      id: config.id,
      url: config.url,
      outFields: config.outFields ?? ['*'],
      objectIdField: config.objectIdField ?? undefined,
      refreshInterval: config.refreshInterval ?? 0,
      visible: config.visible ?? true,
      opacity: config.opacity ?? 1,
      maxScale: config.maxScale ?? 0,
      minScale: config.minScale ?? 0,
      legendEnabled: config.legendEnabled ?? false,
    });

    return layer;
  }

  /**
   * Loads a map image layer based on the config passed in.
   */
  loadMapImageLayer(config) {
    const layer = new MapImageLayer({
      id: config.id,
      title: config.title ?? undefined,
      url: config.url,
      refreshInterval: config.refreshInterval ?? 0,
      sublayers: config.sublayers ?? [],
      visible: config.visible ?? true,
      opacity: config.opacity ?? 1,
      legendEnabled: config.legendEnabled ?? false,
    });

    // only override the min/max scale if they are set
    if (config.maxScale) {
      layer.minScale = config.maxScale;
    }

    if (config.minScale) {
      layer.maxScale = config.minScale;
    }

    return layer;
  }

  /**
   * Loads an empty graphics layer to add graphics to throughout the lifetime of the map
   */
  loadEmptyGraphicLayer() {
    const layer = new GraphicsLayer({
      id: Layers.GRAPHICS,
      graphics: [],
      visible: true,
    });
    return layer;
  }

  loadCoreLayer(config) {
    const layer = this.loadLayer(config);
    if (!layer) return null;

    const renderer = {
      type: 'simple',
      field: 'mag',
      symbol: {
        type: 'simple-marker',
        color: 'green',
        outline: {
          color: 'white',
        },
      },
    };
    // Set the renderer and definition expression
    layer.renderer = renderer;

    return layer;
  }
}
