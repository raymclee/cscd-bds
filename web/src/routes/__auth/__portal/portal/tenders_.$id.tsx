import { createFileRoute } from "@tanstack/react-router";
import node, {
  tendersDetailPageQuery,
} from "__generated__/tendersDetailPageQuery.graphql";
import { loadQuery } from "react-relay";
import * as v from "valibot";

export const Route = createFileRoute("/__auth/__portal/portal/tenders_/$id")({
  loader({ context: { RelayEnvironment, session }, params: { id } }) {
    return loadQuery<tendersDetailPageQuery>(RelayEnvironment, node, {
      id,
      userId: session?.userId,
    });
  },
  validateSearch: v.object({
    p: v.optional(v.string()),
  }),
});
