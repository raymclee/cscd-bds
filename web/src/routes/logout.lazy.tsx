import { createLazyFileRoute } from "@tanstack/react-router";
import { CircleCheck } from "lucide-react";

export const Route = createLazyFileRoute("/logout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-4">
      <CircleCheck size={80} className="text-green-500" />
      <div className="text-2xl text-white">登出成功</div>
    </div>
  );
}
