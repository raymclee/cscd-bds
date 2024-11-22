import * as React from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/__portal/portal/")({
  beforeLoad() {
    throw redirect({ to: "/portal/tenders" });
  },
});
