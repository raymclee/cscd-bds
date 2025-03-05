import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/__auth/__dashboard/map")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <header className="flex items-center px-4 py-4">
        <div className="text-3xl font-bold">遠東香港</div>
        <div className="flex"></div>
      </header>
    </>
  );
}
