import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useMapV2Store } from "~/store";

export const Route = createLazyFileRoute(
  "/__auth/__dashboard/__amap/v2/areas/$id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const renderArea = useMapV2Store.use.renderArea();
  const resetMap = useMapV2Store.use.resetMap();
  const { id } = Route.useParams();
  const areas = useMapV2Store.use.areas();
  const selectedArea = areas?.edges?.find(
    (area) => area?.node?.id === id,
  )?.node;

  useEffect(() => {
    if (!selectedArea) {
      return;
    }
    useMapV2Store.setState({ selectedArea });

    renderArea(selectedArea as any);
  }, [renderArea, selectedArea]);

  useEffect(() => {
    return () => {
      resetMap();
    };
  }, []);

  return <></>;
}
