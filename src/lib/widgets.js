import Zoom from '@arcgis/core/widgets/Zoom';
import Home from '@arcgis/core/widgets/Home';
import Locate from '@arcgis/core/widgets/Locate';
import Extent from '@arcgis/core/geometry/Extent';
import Legend from '@arcgis/core/widgets/Legend';
import LayerList from '@arcgis/core/widgets/LayerList';
import Expand from '@arcgis/core/widgets/Expand';
import Print from '@arcgis/core/widgets/Print';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import { Widgets } from '../util/widgets';

const createZoomWidget = (view) => {
  return new Zoom({
    id: Widgets.ZOOM,
    view: view,
  });
};

const createHomeWidget = (view, bounds) => {
  if (!bounds) return null;
  const extent = new Extent(
    ...bounds,
    view.spatialReference || new SpatialReference({ wkid: 4326 })
  );

  return new Home({
    id: Widgets.HOME,
    view: view,
    viewpoint: {
      targetGeometry: extent,
    },
  });
};

const createLocateWidget = (view, locateZoomScale) => {
  const locateWidget = new Locate({
    id: Widgets.LOCATE,
    view: view,
    scale: locateZoomScale,
    useHeadingEnabled: false,
  });

  locateWidget.on('locate-error', (event) => {
    if (event.error) {
      console.error('Issue with locate widget');
    }
  });

  return locateWidget;
};

const createPrintWidget = (view) => {
  const printWidget = new Print({
    view: view,
    printServiceUrl:
      'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
  });

  const expandWidget = new Expand({
    view: view,
    content: printWidget,
  });

  return expandWidget;
};

export const setupMapWidgets = (view, config, layerService) => {
  // Zoom
  view.ui.add(createZoomWidget(view), 'top-right');

  // Home
  view.ui.add(createHomeWidget(view, config.defaultBounds), 'top-right');

  // Locate
  view.ui.add(createLocateWidget(view, config.locateZoomScale), 'top-right');

  // Print
  view.ui.add(createPrintWidget(view), 'top-right');
};

export const setupLegendWidget = (view, config, container) => {
  return new Legend({
    view: view,
    container: container,
  });
};

export const setupLayerListWidget = (view, config, container) => {
  return new LayerList({
    view: view,
    container: container,
  });
};
