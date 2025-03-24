import { createFileRoute } from "@tanstack/react-router";
import node from "__generated__/tendersIdPageQuery.graphql";
import { loadQuery } from "react-relay";
import { tendersIdPageQuery } from "__generated__/tendersIdPageQuery.graphql";
export const Route = createFileRoute("/__auth/__dashboard/__amap/tenders/$id")({
  async loader(ctx) {
    return loadQuery<tendersIdPageQuery>(ctx.context.RelayEnvironment, node, {
      id: ctx.params.id,
    });
  },
});
