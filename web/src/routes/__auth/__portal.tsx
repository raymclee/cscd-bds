import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/__portal")({
  async beforeLoad(ctx) {
    ctx.context.session;
  },
});
