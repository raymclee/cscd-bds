import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { loadQuery } from "react-relay";
import node, {
  tendersNewTenderPageQuery,
} from "__generated__/tendersNewTenderPageQuery.graphql";

export const Route = createFileRoute("/__auth/__portal/portal/tenders/new")({
  loader({ context: { RelayEnvironment, session } }) {
    return loadQuery<tendersNewTenderPageQuery>(RelayEnvironment, node, {
      userId: session.userId,
    });
  },
});
