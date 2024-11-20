import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import "../antd.css";

export const Route = createLazyFileRoute("/__antd")({
  component: Outlet,
});
