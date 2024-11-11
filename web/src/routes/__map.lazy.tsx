import * as React from "react";
import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { useAreaMapStore } from "~/store/area-map";

export const Route = createLazyFileRoute("/__map")({
  component: RouteComponent,
});

function RouteComponent() {
  // const initMap = useAreaMapStore((state) => state.initAreaMap);

  // React.useEffect(() => {
  //   initMap();
  // }, []);

  return <Outlet />;
}
