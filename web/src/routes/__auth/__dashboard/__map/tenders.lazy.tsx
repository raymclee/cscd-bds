import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { cn } from "~/lib/utils";

export const Route = createLazyFileRoute("/__auth/__dashboard/__map/tenders")({
  component: RouteComponent,
});

function RouteComponent() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // setMounted(true);
    // setTimeout(() => {
    //   setMounted(true);
    // }, 400);
  }, []);

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div
          className={cn(
            "relative h-40 w-40 bg-white animate-in slide-in-from-top-0",
            // !mounted && "-translate-y-full",
          )}
        >
          123
        </div>
      </div>
    </>
  );
}
