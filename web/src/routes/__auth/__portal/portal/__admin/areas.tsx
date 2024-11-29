import { createFileRoute } from "@tanstack/react-router";
import { loadQuery } from "react-relay";
import node, { areasRouteQuery } from "__generated__/areasRouteQuery.graphql";
import * as v from "valibot";

const areaSearchParams = v.object({
  page: v.optional(v.number(), 1),
});

export const Route = createFileRoute("/__auth/__portal/portal/__admin/areas")({
  loader({ context: { RelayEnvironment } }) {
    return loadQuery<areasRouteQuery>(RelayEnvironment, node, {});
  },
  validateSearch: areaSearchParams,
});
