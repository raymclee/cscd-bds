import { createFileRoute } from "@tanstack/react-router";
import node from "__generated__/operationsPageQuery.graphql";
import { loadQuery } from "react-relay";

export const Route = createFileRoute("/__auth/__dashboard/operations")({
  loader({ context: { RelayEnvironment } }) {
    return loadQuery(RelayEnvironment, node, {});
  },
});
