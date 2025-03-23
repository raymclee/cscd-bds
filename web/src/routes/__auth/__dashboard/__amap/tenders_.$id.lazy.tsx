import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createLazyFileRoute(
  "/__auth/__dashboard/__amap/tenders_/$id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = new AMap.Map(mapRef.current, {
      features: ["road", "point"],
    });

    return () => {
      map?.destroy();
    };
  }, []);

  return (
    <>
      <div ref={mapRef} className="aspect-video"></div>
    </>
  );
}
