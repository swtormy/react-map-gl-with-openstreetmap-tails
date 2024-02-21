import { useState } from "react";
import { MapProvider, useMap } from "react-map-gl";
import MapBox from "./map-box";
import MiniMapBox from "./mini-map-box";

type Props = {};

type VisibleArea = {
  cUL: number[];
  cUR: number[];
  cLR: number[];
  cLL: number[];
};

export const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic3d0b3JteSIsImEiOiJjbG51b3l2bDcwY3lyMm1wMnozcWUyZnV3In0.Yh_1Be2DuBcE7aa1pIRAmA";

const MapsContainer = (props: Props) => {
  const [viewState, setViewState] = useState({
    longitude: 37.37,
    latitude: 55.55,
    zoom: 5,
  });
  const [view, setView] = useState<VisibleArea | undefined>();

  return (
    <MapProvider>
      <MapBox id="mainMap" initialState={viewState} setView={setView} />
      <MiniMapBox
        divProps={{
          style: {
            position: "absolute",
            bottom: 10,
            right: 10,
            width: 250,
            height: 150,
            zIndex: 1,
            border: "1px solid #000"
          },
        }}
        mapProps={{ id: "miniMap", initialState: viewState }}
        view={view}
      />
    </MapProvider>
  );
};

export default MapsContainer;
