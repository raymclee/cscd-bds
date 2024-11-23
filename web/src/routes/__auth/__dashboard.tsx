import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/__dashboard")({
  beforeLoad(ctx) {
    if (!ctx.context.session.isAdmin && !ctx.context.session.isLeader) {
      throw redirect({ to: "/portal/tenders" });
    }
  },
});
