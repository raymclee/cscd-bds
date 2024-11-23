import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Typography } from "antd";

export const Route = createLazyFileRoute("/__auth/__portal/portal/customers")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="my-4 min-h-80 rounded-lg bg-white p-6"></div>;
}
