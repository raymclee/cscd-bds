import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMapV2Store } from "~/store";

export const Route = createFileRoute("/__auth/__dashboard/__amap/v2/areas/$id")(
  {
    beforeLoad(ctx) {
      const { selectedArea } = useMapV2Store.getState();
      if (!selectedArea) {
        throw redirect({ to: "/v2" });
      }
    },
  },
);
