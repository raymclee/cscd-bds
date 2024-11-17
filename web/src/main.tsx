import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironment } from "~/lib/relay";

import { routeTree } from "./routeTree.gen";

import "@amap/amap-jsapi-types";
import "./main.css";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    RelayEnvironment,
  },
  Wrap: ({ children }) => (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      {children}
    </RelayEnvironmentProvider>
  ),
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
