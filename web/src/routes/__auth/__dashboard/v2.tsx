import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/__dashboard/v2")({
  loader: async ({ context }) => {
    return {
      data: "Hello",
    };
  },
});

function RouteComponent() {
  return (
    <div>
      Hello "/__auth/__dashboard/map"!!!!
      <Outlet />
    </div>
  );
}
