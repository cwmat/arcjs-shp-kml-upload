import create from 'zustand';
import { MapManager } from '../lib/mapManager';
import _ from 'lodash';

const useMapStore = create((set, get) => ({
  showLayer: true,
  mapManager: null,

  setContainer: async (config, container) => {
    if (container) {
      // Create map manager if it doesn't exist
      if (!get().mapManager) {
        // Create map manager and initialize
        const manager = new MapManager(config);
        manager.loadWidgets();
        manager.loadLayers();

        // Set callbacks - essentially hooks into map events
        manager.onViewClick(get().onViewClick);
        manager.onViewUpdated(get().onMapViewUpdated);

        // Update state
        set({ mapManager: manager });
      }

      // Initialize map manager - creates the map view and mounts to DOM
      get().mapManager?.initialize(container);
    }
  },

  // layer actions
  toggleLayer: () => {
    const visibile = !get().showLayer;
    console.log(`Button pressed with value ${visibile}`);
    set({ showLayer: visibile });
    get().mapManager.toggleCoreLayer(get().showLayer);
  },

  updateGraphics: (graphics) => {
    get().mapManager.updateGraphicsLayer(graphics);
  },

  clearGraphics: () => {
    get().mapManager.clearGraphicsLayer();
  },
}));

export default useMapStore;
