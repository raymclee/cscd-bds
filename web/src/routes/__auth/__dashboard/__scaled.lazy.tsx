import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { useAutoScale } from "~/hooks/use-auto-scale";

export const Route = createLazyFileRoute("/__auth/__dashboard/__scaled")({
  component: RouteComponent,
});

function RouteComponent() {
  const ref = useAutoScale();

  return (
    <div
      ref={ref}
      className="fixed inset-0 min-h-screen origin-top-left overflow-hidden bg-slate-900"
    >
      <Outlet />
    </div>
  );
}
