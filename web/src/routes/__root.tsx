import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { RelayEnvironment } from "~/lib/relay";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

type RouteContext = {
  RelayEnvironment: typeof RelayEnvironment;
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  );
}
