import { createFileRoute, redirect } from "@tanstack/react-router";
import node, {
  tendersEditPageQuery,
} from "__generated__/tendersEditPageQuery.graphql";
import { loadQuery } from "react-relay";
import { canEdit } from "~/lib/permission";
import AMapLoader from "@amap/amap-jsapi-loader";

// window._AMapSecurityConfig = {
//   securityJsCode: "462956f38d2d32df99c7b863dc9c1bb6",
// };

// @ts-expect-error
window._AMapSecurityConfig = {
  securityJsCode: "462956f38d2d32df99c7b863dc9c1bb6",
  // serviceHost: "/_AMapService",
};

export const Route = createFileRoute(
  "/__auth/__portal/portal/tenders_/$id_/edit",
)({
  beforeLoad({ context: { session } }) {
    if (!canEdit(session)) {
      throw redirect({ to: "/access-denied" });
    }
    return { userId: session.userId };
  },
  async loader({ context: { RelayEnvironment, userId }, params: { id } }) {
    await AMapLoader.load({
      key: "2fe0b3e2e45dce4b4180ec0f5683cc24",
      version: "2.0",
      plugins: ["AMap.Geolocation", "AMap.Geocoder"],
      // plugins: ["ui/geo/DistrictCluster"],
      // plugins: ["AMap.PolygonEditor", "AMap.ToolBar", "AMap.Scale"],
    });

    return loadQuery<tendersEditPageQuery>(RelayEnvironment, node, {
      id,
      userId,
    });
  },
});
