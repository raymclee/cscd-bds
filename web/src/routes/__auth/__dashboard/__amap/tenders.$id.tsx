import { createFileRoute } from "@tanstack/react-router";
import node from "__generated__/tendersDashboardDetailPageQuery.graphql";
import { loadQuery } from "react-relay";
import { tendersDashboardDetailPageQuery } from "__generated__/tendersDashboardDetailPageQuery.graphql";

export const Route = createFileRoute("/__auth/__dashboard/__amap/tenders/$id")({
  async loader(ctx) {
    return loadQuery<tendersDashboardDetailPageQuery>(
      ctx.context.RelayEnvironment,
      node,
      {
        id: ctx.params.id,
      },
    );
  },
});
