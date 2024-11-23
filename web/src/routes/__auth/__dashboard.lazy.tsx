import { LazyMotion, domAnimation } from "motion/react";
import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/__auth/__dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <LazyMotion features={domAnimation}>
      <Outlet />
    </LazyMotion>
  );
}
