import { createFileRoute } from "@tanstack/react-router";
import { loadQuery } from "react-relay";
import node, {
  customersDetailPageQuery,
} from "__generated__/customersDetailPageQuery.graphql";

export const Route = createFileRoute("/_auth/_portal/portal/customers_/$id")({
  loader({ context: { RelayEnvironment }, params: { id } }) {
    return loadQuery<customersDetailPageQuery>(RelayEnvironment, node, {
      id,
      orderBy: { field: "DATE", direction: "DESC" },
    });
  },
});
