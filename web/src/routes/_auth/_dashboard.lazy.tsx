import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { domAnimation, LazyMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";

export const Route = createLazyFileRoute("/_auth/_dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const windowSize = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { width, height } = window.screen;
    if (ref.current) {
      Object.assign(ref.current.style, {
        width: `${width}px`,
        height: `${height}px`,
        transform: `scale(${document.body.clientWidth / width})`,
      });
    }
  }, [windowSize]);

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={ref}
        className="fixed top-0 left-0 max-h-screen min-h-screen overflow-hidden origin-top-left max-w-screen min-w-screen bg-slate-900"
      >
        {/* <div className="relative max-h-screen min-h-screen overflow-hidden max-w-screen bg-slate-900"> */}
        <Outlet />
      </div>
    </LazyMotion>
  );
}
