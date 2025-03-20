import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import headSvg from "~/assets/dashboard/svg/head.svg";
import { useMapV2Store } from "~/store";

export const Route = createLazyFileRoute("/__auth/__dashboard/__amap")({
  component: RouteComponent,
});

function RouteComponent() {
  const container = useRef<HTMLDivElement>(null);
  const initMap = useMapV2Store.use.initMap();
  const map = useMapV2Store.use.map();

  useEffect(() => {
    if (!container.current) {
      return;
    }
    initMap(container.current);
  }, []);

  useEffect(() => {
    return () => {
      map?.destroy();
    };
  }, [map]);

  return (
    <>
      <div className="relative">
        <nav className="sticky top-0 z-20 h-16 bg-slate-950/30 backdrop-blur-3xl">
          <img
            src={headSvg}
            alt="head"
            className="mx-auto h-[80%] w-full object-cover lg:w-[70%]"
          />
        </nav>
        <Outlet />
      </div>
      <div ref={container} id="map" className="fixed inset-0"></div>
    </>
  );
}
