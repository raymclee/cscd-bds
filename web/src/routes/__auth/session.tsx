import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/session")({
  component: RouteComponent,
});

function RouteComponent() {
  const { session } = Route.useRouteContext();
  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
