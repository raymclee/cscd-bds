import { createFileRoute, redirect } from "@tanstack/react-router";
import * as v from "valibot";

export const Route = createFileRoute("/__auth/__dashboard")({
  beforeLoad(ctx) {
    if (ctx.search.ceo == 1 && ctx.location.pathname == "/") {
      throw redirect({ to: "/om" });
    }
    if (
      ctx.search.portal == 1 &&
      !ctx.context.session.isCeo &&
      !ctx.context.session.isSuperAdmin
    ) {
      throw redirect({ to: "/portal/tenders" });
    }
  },
  validateSearch: v.object({
    ceo: v.optional(v.number()),
    portal: v.optional(v.number()),
  }),
});
