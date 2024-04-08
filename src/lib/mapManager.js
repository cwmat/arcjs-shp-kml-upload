import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import _ from 'lodash';
import { Widgets } from '../util/widgets';
import { LayerService } from './layerService';
import { setupMapWidgets } from './widgets';
import Graphic from '@arcgis/core/Graphic';


export class MapManager {
  webmap = null;
  view = null;
  layerService = new LayerService();
  coreLayer = null;
  graphicsLayer = null;
  coreLayerView = null;
  config = null;

  constructor(mapConfig) {
    this.config = mapConfig;

    this.webmap = new ArcGISMap({
      basemap: Widgets.STREETS_BASEMAP,
    });

    this.view = new MapView({
      map: this.webmap,
      center: this.config?.defaultCenter ?? [0, 0],
      extent: {
        xmin: this.config?.defaultBounds?.[0] ?? 0,
        ymin: this.config?.defaultBounds?.[1] ?? 0,
        xmax: this.config?.defaultBounds?.[2] ?? 0,
        ymax: this.config?.defaultBounds?.[3] ?? 0,
      },
      ui: {
        components: [],
      },
    });
  }

  toggleCoreLayer(visible) {
    if (this.coreLayer) this.coreLayer.visible = visible;
  }

  /**
   * Wrapper around addMany with some safety.
   */
  addLayers(layers) {
    if (this.webmap) {
      this.webmap.addMany(layers);
    }
  }

  /**
   * Loads the widgets for the map.  This is called after the map is initialized
   * and the view is ready.
   */
  loadWidgets() {
    if (!this.view) return;
    setupMapWidgets(this.view, this.config, this.layerService);
  }

  /**
   * Loads the layers for the map.  This is called after the map is initialized
   * and the view is ready.
   * @param {function} onLayerViewReady - callback function to call when the layer view is ready
   * @param {function} onLayerViewUpdated - callback function to call when the layer view is updated
   */
  loadLayers(onLayerViewReady = null, onLayerViewUpdated = null) {
    const _this = this;

    if (!this.view) return;

    this.view.when(async () => {
      // Create layers
      this.graphicsLayer = this.layerService.loadEmptyGraphicLayer();
      this.coreLayer = this.layerService.loadCoreLayer(
        this.config.layers.earthquakes
      );
      // const referenceLayers = this.layerService.loadReferenceLayers(this.config.layers.references);

      // Add layers to map
      this.addLayers([
        // ...referenceLayers,
        this.graphicsLayer,
        this.coreLayer,
      ]);
    });
  }

  /**
   * Sets the container for the map view
   * @param {HTMLElement} container - the container element
   */
  initialize(container) {
    if (this.view && container) this.view.container = container;
  }

  /**
   * Sets the container for the map legend
   * @param {HTMLElement} container - the container element
   */
  initializeLegend(container) {
    if (this.view && container) {
      setupLegendWidget(this.view, this.config, container);
    }
  }

  /**
   * Sets the container for the map legend
   * @param {HTMLElement} container - the container element
   */
  initializeLayerList(container) {
    if (this.view && container) {
      setupLayerListWidget(this.view, this.config, container);
    }
  }

  /**
   * Register event view updated handler
   * @param {function} onViewUpdatedHandler
   */
  onViewUpdated(onViewUpdatedHandler) {
    if (!this.view) return;
    this.view.watch('updating', (val) => {
      if (!val) {
        if (onViewUpdatedHandler) onViewUpdatedHandler(this.coreLayerView);
      }
    });
  }

  /**
   * Register event click handler
   * @param {function} onClickHandler
   */
  onViewClick(onClickHandler) {
    if (!this.view) return;
    this.view.on('click', (event) => {
      if (!onClickHandler) return;

      this.view?.hitTest(event).then(async (response) => {
        const { graphic, layer } = response?.results?.[0] || {};
        onClickHandler(graphic, layer);
      });
    });
  }

  updateGraphicsLayer(graphics) {
    // Remove all existing graphics from the layer
    this.graphicsLayer.removeAll();

    // Convert each custom graphic object into an ArcGIS Graphic
    const arcgisGraphics = graphics.graphics.map(g => new Graphic(g));

    // Add the converted graphics to the layer
    this.graphicsLayer.addMany(arcgisGraphics);
  }

  clearGraphicsLayer() {
    this.graphicsLayer.removeAll();
  }
}
