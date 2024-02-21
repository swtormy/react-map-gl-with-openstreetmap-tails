import { useEffect, useRef } from "react";
import { MAPBOX_TOKEN } from "./maps-container";
import Map, {
  MapRef,
  ViewStateChangeEvent,
  useMap,
  MapboxMap,
} from "react-map-gl";
import mapStyle from "./map-style.json";
import "mapbox-gl/dist/mapbox-gl.css";

type Props = { [key: string]: any };

const MapBox = (props: Props) => {
  const { initialState, setView } = props;
  const mapRef = useRef<MapRef>(null);
  const { mainMap, miniMap } = useMap();

  const buildViewBoundsGeoJSON = (map: MapboxMap) => {
    const canvas = map.getCanvas();
    let { width, height } = canvas;
    const cUL = map.unproject([0, 0]).toArray();
    const cUR = map.unproject([width, 0]).toArray();
    const cLR = map.unproject([width, height]).toArray();
    const cLL = map.unproject([0, height]).toArray();
    return { cUL, cUR, cLR, cLL };
  };

  const handleMapMove = (event: ViewStateChangeEvent) => {
    if (miniMap) {
      const mainCenter = mainMap?.getCenter();
      const mainZoom = mainMap?.getZoom();
      console.log("mainCenter", mainCenter);
      console.log("mainZoom", mainZoom);

      if (mainZoom) {
        miniMap.flyTo({ center: mainCenter, zoom: mainZoom - 4 });
      }
    }
    if (mapRef.current) {
      const new_view = buildViewBoundsGeoJSON(mapRef.current.getMap());
      new_view && setView(new_view);
    }
  };

  useEffect(() => {
    if (miniMap && mapRef.current) {
      const new_view = buildViewBoundsGeoJSON(mapRef.current.getMap());
      new_view && setView(new_view);
    }
  }, [miniMap]);
  return (
    <Map
      ref={mapRef}
      initialViewState={
        initialState
          ? initialState
          : {
              longitude: 37.37,
              latitude: 55.55,
              zoom: 4,
              pitch: 0,
              bearing: 0,
            }
      }
      style={{ width: "100%", height: "100vh" }}
      mapStyle={mapStyle as any}
      mapboxAccessToken={MAPBOX_TOKEN}
      maxPitch={40}
      onMove={handleMapMove}
      {...props}
    ></Map>
  );
};

export default MapBox;
