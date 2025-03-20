import { createFileRoute } from "@tanstack/react-router";
import node, { v2PageQuery } from "__generated__/v2PageQuery.graphql";
import { loadQuery } from "react-relay";
import * as v from "valibot";

export const Route = createFileRoute("/__auth/__dashboard/__amap/v2")({
  async loader(ctx) {
    return loadQuery<v2PageQuery>(ctx.context.RelayEnvironment, node, {
      userId: ctx.context.session.userId,
      orderBy: [
        { field: "TENDER_DATE", direction: "ASC" },
        { field: "CLOSING_DATE", direction: "ASC" },
        { field: "CREATED_AT", direction: "ASC" },
      ],
    });
  },
  validateSearch: v.object({
    tenderDate: v.optional(v.string()),
    area: v.optional(v.string()),
    sort: v.optional(v.string()),
  }),
});
