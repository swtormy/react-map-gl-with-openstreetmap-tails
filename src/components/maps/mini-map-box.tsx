import { useRef } from "react";
import Map, { MapRef, Source, Layer } from "react-map-gl";
import mapStyle from "./map-style.json";
import { MAPBOX_TOKEN } from "./maps-container";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./mini-map-box.module.css";

type Props = {
  divProps?: { [key: string]: any };
  mapProps?: { [key: string]: any };
  view?: {
    cUL: number[];
    cUR: number[];
    cLR: number[];
    cLL: number[];
  };
};

type PolygonData =
  | {
      type: "Feature";
      properties: {};
      geometry: {
        type: "Polygon";
        coordinates: number[][][];
      };
    }
  | undefined;

const MiniMapBox = (props: Props) => {
  const { view, mapProps, divProps } = props;
  const mapRef = useRef<MapRef>(null);
  const polygonData: PolygonData = view
    ? {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [[view.cUL, view.cUR, view.cLR, view.cLL, view.cUL]],
        },
      }
    : undefined;
  return (
    <div {...divProps} className={styles.map}>
      <Map
        {...mapProps}
        ref={mapRef}
        initialViewState={
          mapProps?.initialState
            ? {
                ...mapProps.initialState,
                zoom: mapProps.initialState - 4,
              }
            : {
                longitude: 37.37,
                latitude: 55.55,
                zoom: 1,
              }
        }
        mapStyle={mapStyle as any}
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
        interactive={true}
      >
        {polygonData && (
          <Source id="polygon" type="geojson" data={polygonData}>
            <Layer
              id="polygon"
              type="fill"
              source="polygon"
              layout={{}}
              paint={{
                "fill-color": "#088",
                "fill-opacity": 0.8,
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
};

export default MiniMapBox;
