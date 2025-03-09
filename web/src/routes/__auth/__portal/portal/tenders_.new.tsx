import { createFileRoute, redirect } from "@tanstack/react-router";
import node, {
  tendersNewTenderPageQuery,
} from "__generated__/tendersNewTenderPageQuery.graphql";
import { loadQuery } from "react-relay";
import { canEdit } from "~/lib/permission";

export const Route = createFileRoute("/__auth/__portal/portal/tenders_/new")({
  async loader({ context: { RelayEnvironment, session } }) {
    if (!canEdit(session)) {
      throw redirect({ to: "/access-denied" });
    }

    // await AMapLoader.load({
    //   key: "2fe0b3e2e45dce4b4180ec0f5683cc24",
    //   version: "2.0",
    //   plugins: ["AMap.Geolocation", "AMap.Geocoder"],
    //   // plugins: ["ui/geo/DistrictCluster"],
    //   // plugins: ["AMap.PolygonEditor", "AMap.ToolBar", "AMap.Scale"],
    // });

    return loadQuery<tendersNewTenderPageQuery>(RelayEnvironment, node, {
      userId: session.userId,
    });
  },
});
