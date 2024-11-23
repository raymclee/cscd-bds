import * as React from "react";
import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { useMapStore } from "~/store/map";

export const Route = createLazyFileRoute("/__auth/__dashboard/__map")({
  component: RouteComponent,
});

function RouteComponent() {
  const map = useMapStore((s) => s.map);
  const initMap = useMapStore((s) => s.initMap);

  React.useEffect(() => {
    initMap("map", {
      zoom: 4,
      // mapStyle: "amap://styles/grey",
      mapStyle: "amap://styles/darkblue",
      // viewMode: "3D",
      // pitch: 30,
    });
  }, []);

  React.useEffect(() => {
    return () => {
      map?.destroy();
      useMapStore.setState({
        selectedArea: null,
        currentAreaNode: null,
        navigations: [],
        selectedTender: null,
        tenderListVisible: false,
        tenderViewTender: null,
        selectedTenderStatus: null,
      });
    };
  }, [map]);

  return (
    <>
      <div className="relative min-h-dvh w-full overflow-hidden">
        <div id="map" className="absolute inset-0"></div>

        <div className="absolute flex h-[96px] w-full items-center justify-center bg-dashboard-head bg-cover bg-center text-white">
          <div className="select-none text-ellipsis whitespace-nowrap text-3xl font-bold">
            远东幕墙市场拓展地图
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
