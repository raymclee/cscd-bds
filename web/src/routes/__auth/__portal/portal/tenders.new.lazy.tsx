import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/__auth/__portal/portal/tenders/new")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return <></>;
}
