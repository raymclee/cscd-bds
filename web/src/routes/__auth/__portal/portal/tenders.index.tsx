import { createFileRoute } from "@tanstack/react-router";
import { loadQuery } from "react-relay";

import node, { tendersPageQuery } from "__generated__/tendersPageQuery.graphql";

export const Route = createFileRoute("/__auth/__portal/portal/tenders/")({
  async loader({ context: { RelayEnvironment, session } }) {
    return loadQuery<tendersPageQuery>(RelayEnvironment, node, {
      userId: session?.userId,
    });
  },
});
