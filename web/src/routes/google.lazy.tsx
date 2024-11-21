import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

export const Route = createLazyFileRoute("/google")({
  component: RouteComponent,
});

function RouteComponent() {
  const position = { lat: 22.5351077, lng: 114.0569007 };

  return (
    <APIProvider apiKey={"AIzaSyBVxBtveOhCdXeCAGwFZkde26E4iwaCdIU"}>
      <Map
        defaultCenter={position}
        defaultZoom={10}
        mapId="DEMO_MAP_ID"
        style={{ width: "100vw", height: "100vh" }}
      >
        <AdvancedMarker position={position} />
      </Map>
    </APIProvider>
  );
}
