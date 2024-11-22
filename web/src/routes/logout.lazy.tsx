import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Result } from "antd";

export const Route = createLazyFileRoute("/logout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Result status="success" title="登出成功" />
    </div>
  );
}
