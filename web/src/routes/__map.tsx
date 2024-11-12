import { createFileRoute } from "@tanstack/react-router";
import AMapLoader from "@amap/amap-jsapi-loader";

export const Route = createFileRoute("/__map")({
  loader: async () => {
    // await AMapLoader.load({
    //   key: "28982eb1a6a3cd956e0e0614c2fb131b",
    //   version: "2.0",
    //   plugins: ["AMap.DistrictSearch"],
    // });
    await AMapLoader.load({
      key: "2fe0b3e2e45dce4b4180ec0f5683cc24",
      version: "2.0",
      // plugins: ["AMap.PolygonEditor", "AMap.ToolBar", "AMap.Scale"],
    });
  },
});
