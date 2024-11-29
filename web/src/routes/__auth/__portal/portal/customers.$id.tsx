import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { loadQuery } from "react-relay";
import node, {
  customersDetailPageQuery,
} from "__generated__/customersDetailPageQuery.graphql";

export const Route = createFileRoute("/__auth/__portal/portal/customers/$id")({
  loader({ context: { RelayEnvironment, session }, params: { id } }) {
    return loadQuery<customersDetailPageQuery>(RelayEnvironment, node, {
      id,
      userId: session.userId,
      orderBy: { field: "DATE", direction: "DESC" },
    });
  },
});
