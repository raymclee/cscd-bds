import { createFileRoute } from "@tanstack/react-router";
import { loadQuery } from "react-relay";
import * as v from "valibot";
import node, { tendersPageQuery } from "__generated__/tendersPageQuery.graphql";

const tenderSearchSchema = v.object({
  page: v.optional(v.fallback(v.number(), 1), 1),
  area: v.optional(v.string()),
  status: v.optional(
    v.pipe(
      v.number(),
      v.transform((value) => Number(value)),
    ),
  ),
  q: v.optional(v.string()),
  closing_date: v.optional(v.string()),
  classify: v.optional(v.number()),
  create: v.optional(v.boolean()),
});

export const Route = createFileRoute("/__auth/__portal/portal/tenders")({
  async loader({ context: { RelayEnvironment, session } }) {
    return loadQuery<tendersPageQuery>(RelayEnvironment, node, {
      userId: session?.userId,
      orderBy: [{ field: "CREATED_AT", direction: "DESC" }],
    });
  },
  validateSearch: tenderSearchSchema,
});
