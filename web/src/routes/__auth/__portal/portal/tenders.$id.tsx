import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { loadQuery } from "react-relay";
import node, {
  tendersDetailPageQuery,
} from "__generated__/tendersDetailPageQuery.graphql";
import AMapLoader from "@amap/amap-jsapi-loader";

export const Route = createFileRoute("/__auth/__portal/portal/tenders/$id")({
  async loader(ctx) {
    await AMapLoader.load({
      key: "2fe0b3e2e45dce4b4180ec0f5683cc24",
      version: "2.0",
      plugins: ["AMap.PolygonEditor"],
      AMapUI: {
        version: "1.1",
        plugins: ["geo/DistrictExplorer", "overlay/SimpleMarker"],
      },
      // plugins: ["ui/geo/DistrictCluster"],
      // plugins: ["AMap.PolygonEditor", "AMap.ToolBar", "AMap.Scale"],
    });
    return loadQuery<tendersDetailPageQuery>(
      ctx.context.RelayEnvironment,
      node,
      { id: ctx.params.id },
    );
  },
});
