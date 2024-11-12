import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMapStore } from "~/store/map";
import { useShallow } from "zustand/shallow";

export const Route = createLazyFileRoute("/__map/2")({
  component: RouteComponent,
});

function RouteComponent() {
  const [map, initMap] = useMapStore(
    useShallow((state) => [state.map, state.initMap])
  );

  React.useEffect(() => {
    initMap("map", {
      zoom: 4,
      center: [116.397428, 39.90923],
    });
  }, []);

  React.useEffect(() => {
    map?.on("complete", () => {
      map?.setZoomAndCenter(8, [116.397428, 39.90923]);
      // AMap.Util.requestAnimFrame(map);
    });
  }, [map]);

  return (
    <>
      <div id="map" className="absolute inset-0"></div>1
    </>
  );
}
