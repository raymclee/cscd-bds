import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/__auth/__portal/portal/potential-tenders",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>建设中</div>;
}
