import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ProjectHeader } from "~/components/dashboard/svg/project-header";
import PH from "~/assets/svg/header1.svg";
import b1 from "~/assets/svg/box1.svg";

export const Route = createLazyFileRoute("/_auth/_dashboard/project")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <ProjectHeader />
      <div className="grid grid-cols-3 p-6">
        <div>
          <div>
            <img src={PH} />
          </div>
        </div>
        <div>
          <img src={b1} />
        </div>
        <div></div>
      </div>
    </>
  );
}
