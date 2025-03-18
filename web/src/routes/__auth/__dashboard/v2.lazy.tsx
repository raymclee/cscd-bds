import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/__auth/__dashboard/v2")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = Route.useLoaderData();

  return (
    <div>
      <header className="flex items-center px-4 py-4">
        <div className="text-3xl font-bold">遠東香港1</div>
        <div className="flex"></div>
      </header>
    </div>
  );
}
