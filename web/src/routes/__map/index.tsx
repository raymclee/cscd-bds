import { createFileRoute } from "@tanstack/react-router";
import { loadQuery } from "react-relay";
import node, { MapPageQuery } from "__generated__/MapPageQuery.graphql";

export const Route = createFileRoute("/__map/")({
  loader: async ({ context: { RelayEnvironment } }) => {
    // return loadQuery<MapPageQuery>(RelayEnvironment, node, {});
  },
});
