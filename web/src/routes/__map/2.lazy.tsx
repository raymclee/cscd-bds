import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMapStore } from "~/store/map";
import { useShallow } from "zustand/shallow";

export const Route = createLazyFileRoute("/__map/2")({
  component: RouteComponent,
});

function RouteComponent() {
  const [initMap] = useMapStore(useShallow((state) => [state.initMap]));

  React.useEffect(() => {
    initMap("map");
  }, []);

  return (
    <>
      <div id="map" className="absolute inset-0"></div>1
    </>
  );
}
