import * as React from "react";
import { createLazyFileRoute, notFound } from "@tanstack/react-router";
import { TenderForm } from "~/components/tender-form";
import { CreateTenderInput } from "~/graphql/graphql";
import { usePreloadedQuery, graphql } from "react-relay";
import {
  tendersNewTenderPageQuery,
  tendersNewTenderPageQuery$data,
} from "__generated__/tendersNewTenderPageQuery.graphql";

export const Route = createLazyFileRoute("/__auth/__portal/portal/tenders/new")(
  {
    component: RouteComponent,
  },
);

const TendersNewTenderPageQuery = graphql`
  query tendersNewTenderPageQuery($userId: ID!) {
    node(id: $userId) {
      ...tenderFormFragment
    }
  }
`;

function RouteComponent() {
  const preload = Route.useLoaderData();
  const data = usePreloadedQuery<tendersNewTenderPageQuery>(
    TendersNewTenderPageQuery,
    preload,
  );

  if (!data.node) throw notFound();

  return (
    <>
      <div className="min-h-80">
        <TenderForm queryRef={data?.node} />
      </div>
    </>
  );
}
