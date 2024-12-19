import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { loadQuery } from "react-relay";
import node, { competitorsQuery } from "__generated__/competitorsQuery.graphql";

export const Route = createFileRoute(
  "/_auth/_portal/portal/_super-admin/sa/competitors",
)({
  loader({ context: { RelayEnvironment } }) {
    return loadQuery<competitorsQuery>(RelayEnvironment, node, {});
  },
});
