import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { domAnimation, LazyMotion } from "motion/react";
import { Switcher } from "~/components/switcher";

export const Route = createLazyFileRoute("/__auth/__dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { session } = Route.useRouteContext();

  return (
    <LazyMotion features={domAnimation}>
      {(session.isSuperAdmin || session.isCeo) && <Switcher />}
      {/* <div className="relative max-h-screen min-h-screen overflow-hidden max-w-screen bg-slate-900"> */}
      <Outlet />
    </LazyMotion>
  );
}
