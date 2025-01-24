import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { domAnimation, LazyMotion } from "motion/react";
import { useLayoutEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";
import { Switcher } from "~/components/switcher";

export const Route = createLazyFileRoute("/__auth/__dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const windowSize = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  const { session } = Route.useRouteContext();

  useLayoutEffect(() => {
    const { width, height } = window.screen;
    if (ref.current) {
      const scale =
        width >= 1920 ? document.body.clientWidth / width : width / 1920;

      Object.assign(ref.current.style, {
        width: `${width > 1920 ? width : 1920}px`,
        height: `${height > 1080 ? height : 1080}px`,
        // width: "100vw",
        // height: "100vh",
        transform: `scale(${scale})`,
      });
    }
  }, [windowSize]);

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={ref}
        className="fixed inset-0 min-h-screen origin-top-left overflow-hidden bg-slate-900"
      >
        {(session.isSuperAdmin || session.isCeo) && <Switcher />}
        {/* <div className="relative max-h-screen min-h-screen overflow-hidden max-w-screen bg-slate-900"> */}
        <Outlet />
      </div>
    </LazyMotion>
  );
}
