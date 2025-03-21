import { createFileRoute } from "@tanstack/react-router";
import AMapLoader from "@amap/amap-jsapi-loader";
import { loadQuery } from "react-relay";
import node, { AmapPageQuery } from "__generated__/AmapPageQuery.graphql";
import * as v from "valibot";
export const Route = createFileRoute("/__auth/__dashboard/__amap")({
  async beforeLoad({ context }) {
    await AMapLoader.load({
      key: "2fe0b3e2e45dce4b4180ec0f5683cc24",
      version: "2.0",
      AMapUI: {
        version: "1.1",
        plugins: ["geo/DistrictExplorer", "overlay/SimpleMarker"],
      },
      // plugins: [
      //   "AMap.ToolBar",
      //   "AMap.Scale",
      //   "AMap.HawkEye",
      //   "AMap.ControlBar",
      // ],
      // plugins: ["ui/geo/DistrictCluster"],
      // plugins: ["AMap.PolygonEditor", "AMap.ToolBar", "AMap.Scale"],
    });
  },
  loader(ctx) {
    return loadQuery<AmapPageQuery>(ctx.context.RelayEnvironment, node, {
      userId: ctx.context.session.userId,
    });
  },
  validateSearch: v.object({
    p: v.optional(
      v.pipe(
        v.number(),
        v.transform((value) => Number(value)),
      ),
    ),
    d: v.optional(
      v.pipe(
        v.number(),
        v.transform((value) => Number(value)),
      ),
    ),
    c: v.optional(
      v.pipe(
        v.number(),
        v.transform((value) => Number(value)),
      ),
    ),
    a: v.optional(v.string()),
  }),
});
