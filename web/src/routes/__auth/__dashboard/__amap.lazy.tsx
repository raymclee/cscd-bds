import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useMapStore } from "~/store/map";
import headSvg from "~/assets/dashboard/svg/head.svg";
export const Route = createLazyFileRoute("/__auth/__dashboard/__amap")({
  component: RouteComponent,
});

function RouteComponent() {
  const initMap = useMapStore((state) => state.initMap);

  useEffect(() => {
    initMap("map", {
      mapStyle: "amap://styles/blue",
      center: [80.33, 39.91],
      zoom: 4,
      // zoomEnable: false,
      scrollWheel: false,
      // dragEnable: false,
    });
  }, [initMap]);

  return (
    <>
      <div className="relative">
        <nav className="sticky top-0 z-20 h-16">
          <img
            src={headSvg}
            alt="head"
            className="mx-auto h-[80%] w-full object-cover lg:w-[70%]"
          />
        </nav>
        <Outlet />
      </div>
      <div id="map" className="fixed inset-0"></div>
    </>
  );
}
