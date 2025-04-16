import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/__dashboard/om")({
  component: RouteComponent,
});

function RouteComponent() {
  const url = import.meta.env.PROD
    ? "https://om.fefacade.com"
    : "http://localhost:3000";
  return <iframe className="min-h-screen w-full" src={url} />;
}
