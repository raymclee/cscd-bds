import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Result } from "antd";

export const Route = createFileRoute("/__auth/__dashboard")({
  beforeLoad(ctx) {
    if (!ctx.context.session.isAdmin && !ctx.context.session.isLeader) {
      throw new Error("沒有權限");
    }
  },
  errorComponent: (err) => (
    <div className="flex min-h-screen items-center justify-center">
      <Result status="403" title="403" subTitle="抱歉，您无权访问此页面。" />
    </div>
  ),
});
