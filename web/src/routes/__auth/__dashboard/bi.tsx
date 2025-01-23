import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/__dashboard/bi")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex items-center justify-center min-h-full">
      <Link to="/bi2" className="underline hover:no-underline">
        业务数据监控每日情况
      </Link>
    </div>
  );
}
