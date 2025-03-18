import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useMapStore } from "~/store/map";

export const Route = createLazyFileRoute("/__auth/__dashboard/__amap")({
  component: RouteComponent,
});

function RouteComponent() {
  const initMap = useMapStore((state) => state.initMap);

  useEffect(() => {
    initMap("map", {
      mapStyle: "amap://styles/darkblue",
      center: [114.33, 30.57],
      zoom: 4,
      zoomEnable: false,
      scrollWheel: false,
    });
  }, [initMap]);

  return (
    <>
      <div className="relative">
        <Outlet />
      </div>
      <div id="map" className="fixed inset-0"></div>
    </>
  );
}
