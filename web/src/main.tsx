import {
  RouterProvider,
  createRouteMask,
  createRouter,
} from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { RelayEnvironment } from "~/lib/relay";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");
dayjs.extend(LocalizedFormat);

import { routeTree } from "./routeTree.gen";

import "@amap/amap-jsapi-types";
import "./main.css";

const tenderResultModalToTenderMask = createRouteMask({
  routeTree,
  from: "/portal/tenders/$id/result",
  to: "/portal/tenders",
  params: true,
});

// Set up a Router instance
const router = createRouter({
  routeTree,
  routeMasks: [tenderResultModalToTenderMask],
  defaultPreload: "intent",
  context: {
    RelayEnvironment,
  },
  defaultPreloadStaleTime: 0,
  // defaultPendingMs: 5000,
  // defaultPendingMinMs: 5000,
  defaultErrorComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-2">
      <div className="text-2xl font-bold">500</div>
      <div className="text-lg">服务器错误</div>
    </div>
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
