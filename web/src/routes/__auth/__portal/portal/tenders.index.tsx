import { createFileRoute } from "@tanstack/react-router";
import { loadQuery } from "react-relay";
import * as v from "valibot";
import node, { tendersPageQuery } from "__generated__/tendersPageQuery.graphql";

const tenderSearchSchema = v.object({
  page: v.optional(v.fallback(v.number(), 1), 1),
});

export const Route = createFileRoute("/__auth/__portal/portal/tenders/")({
  loaderDeps: ({ search }) => ({ ...search }),
  async loader({ context: { RelayEnvironment, session }, deps: { page } }) {
    // const first = 10;
    return loadQuery<tendersPageQuery>(RelayEnvironment, node, {
      userId: session?.userId,
      orderBy: { field: "CREATED_AT", direction: "DESC" },
      // first,
    });
  },
  validateSearch: tenderSearchSchema,
});
