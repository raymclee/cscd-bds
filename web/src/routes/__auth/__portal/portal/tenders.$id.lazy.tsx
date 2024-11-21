import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { graphql } from "relay-runtime";
import { usePreloadedQuery } from "react-relay";
import { Input } from "antd";
import { tendersDetailPageQuery } from "__generated__/tendersDetailPageQuery.graphql";

export const Route = createLazyFileRoute("/__auth/__portal/portal/tenders/$id")(
  {
    component: RouteComponent,
  },
);

const query = graphql`
  query tendersDetailPageQuery($id: ID!) {
    node(id: $id) {
      ... on Tender {
        name
      }
    }
  }
`;

function RouteComponent() {
  const data = usePreloadedQuery<tendersDetailPageQuery>(
    query,
    Route.useLoaderData(),
  );

  console.log(data);
  return (
    <>
      <Input value={data?.node?.name} />
    </>
  );
}
