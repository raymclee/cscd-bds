import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/__auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
