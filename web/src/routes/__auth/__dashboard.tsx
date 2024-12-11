import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/__dashboard")({
  beforeLoad(ctx) {
    if (
      !ctx.context.session.isLeader &&
      !ctx.context.session.isAdmin &&
      !ctx.context.session.hasMapAccess
    ) {
      throw redirect({ to: "/portal/tenders" });
    }
  },
});
