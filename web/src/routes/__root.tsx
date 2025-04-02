import { createRootRouteWithContext } from "@tanstack/react-router";
import { RelayEnvironment } from "~/lib/relay";

type RouteContext = {
  RelayEnvironment: typeof RelayEnvironment;
  renderTime: string;
};

export const Route = createRootRouteWithContext<RouteContext>()({});
