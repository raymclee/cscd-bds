import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import node, {
  tendersDetailPageQuery,
} from "__generated__/tendersDetailPageQuery.graphql";
import { loadQuery } from "react-relay";

export const Route = createFileRoute("/__auth/__portal/portal/tenders/$id/")({
  loader({ context: { RelayEnvironment, session }, params: { id } }) {
    return loadQuery<tendersDetailPageQuery>(RelayEnvironment, node, {
      id,
      userId: session.userId,
    });
  },
});
