import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Typography } from "antd";

export const Route = createLazyFileRoute(
  "/__auth/__portal/portal/visit-records",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="my-4 min-h-80 rounded-lg bg-white p-6">
      <Typography.Title level={2}>拜訪記錄</Typography.Title>
    </div>
  );
}
