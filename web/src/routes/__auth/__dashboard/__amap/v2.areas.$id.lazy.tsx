import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/__auth/__dashboard/__amap/v2/areas/$id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <></>;
}
