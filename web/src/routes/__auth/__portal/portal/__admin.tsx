import * as React from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/__portal/portal/__admin")({
  beforeLoad(ctx) {
    if (!ctx.context.session.isAdmin) {
      throw redirect({ to: "/access-denied" });
    }
  },
});
