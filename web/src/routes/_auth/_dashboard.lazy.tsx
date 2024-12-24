import { LazyMotion, domAnimation } from "motion/react";
import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/_dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="max-w-screen relative max-h-screen min-h-screen overflow-hidden bg-slate-900">
        <Outlet />
      </div>
    </LazyMotion>
  );
}
