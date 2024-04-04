# React Map Example with Zustand

## 📚 Overview

This repo shows a simplified example of using ArcGIS JS and React using a state management pattern with Zustand 🐻.

It simply:

- provides an example `map config` object
- renders a map (zoomed to a target map scale pulled from `map config`)
- adds a couple widgets to demonstrate a pattern
- loads a layer
- shows a pattern for dispatching events between map and UI with the layer toggle button

This is the pattern discussed at the [Esri Dev Summit 2024](https://registration.esri.com/flow/esri/24epcdev/deveventportal/page/detailed-agenda/session/1697755214701001XzGy) on Revolutionizing Flood Alert Systems in NCEM: [Slide Deck](https://drive.google.com/file/d/1NqP79cqwkom05pEu78hTUk-6Guj1L_BK/view?usp=sharing)

## 📂 Core Files

- `src/components/Map.jsx` - the core map component

- `src/lib/*` - folder that encapsulates any ArcGIS JS logic. `mapManager.js` is the "brains" and it passes off relevant work to `layerService.js` and `widgets.js` accordingly. This pattern can be extended for more advanced mapping functionality.

- `src/stores/mapStore.js` - a Zustand store that UI components can use to interact with the map without having to 'know' anyhting about ArcGIS JS.

## 🏃‍♀️ How to Run

Load the project on [StackBlitz](https://stackblitz.com/edit/vitejs-vite-zrswhk). Be patient the first load can take a while.

If you have [cloned the project](https://github.com/cwmat/arcgis-js-react-with-zustand) locally then:

- Install [Node JS LTS](https://nodejs.org/en/download)

```sh
npm i
npm run dev
```
