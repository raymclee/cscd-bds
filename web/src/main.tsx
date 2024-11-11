import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ConfigProvider } from "@arco-design/web-react";

import "@amap/amap-jsapi-types";
import "./main.css";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  Wrap: ({ children }) => (
    <ConfigProvider
    // componentConfig={{
    //   Menu: { color: "rgb(0, 21, 41)" },
    // }}
    >
      {children}
    </ConfigProvider>
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
