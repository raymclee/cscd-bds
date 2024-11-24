import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { TenderForm } from "~/components/tender-form";
import { CreateTenderInput } from "~/graphql/graphql";

export const Route = createLazyFileRoute("/__auth/__portal/portal/tenders/new")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return (
    <>
      <div className="my-4 min-h-80 rounded-lg bg-white p-6">
        <TenderForm<CreateTenderInput> />
      </div>
    </>
  );
}
