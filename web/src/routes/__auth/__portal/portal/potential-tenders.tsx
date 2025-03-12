import { createFileRoute } from "@tanstack/react-router";
import node from "__generated__/potentialTendersQuery.graphql";
import { loadQuery } from "react-relay";
import * as v from "valibot";

const validateSearch = v.object({
  page: v.optional(v.number()),
});

export const Route = createFileRoute(
  "/__auth/__portal/portal/potential-tenders",
)({
  loader: async ({ context: { RelayEnvironment } }) => {
    return loadQuery(RelayEnvironment, node, {});
  },
  validateSearch,
});
