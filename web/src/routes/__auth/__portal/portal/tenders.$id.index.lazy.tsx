import * as React from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { graphql, usePreloadedQuery } from "react-relay";
import { tendersDetailPageQuery } from "__generated__/tendersDetailPageQuery.graphql";
import { Result } from "antd";
import { TenderForm } from "~/components/portal/tender-form";
import { TenderDetail } from "~/components/portal/tender-detail";

export const Route = createLazyFileRoute(
  "/__auth/__portal/portal/tenders/$id/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const data = usePreloadedQuery<tendersDetailPageQuery>(
    graphql`
      query tendersDetailPageQuery($id: ID!, $userId: ID!) {
        node(id: $id) {
          ...tenderDetailFragment
        }

        user: node(id: $userId) {
          ...tenderFormFragment
        }
      }
    `,
    Route.useLoaderData(),
  );

  if (!data.node || !data.user) {
    return (
      <Result
        status="404"
        title="找不到该招标信息"
        subTitle="请检查链接是否正确"
      />
    );
  }

  return (
    <>
      {/* <TenderForm queryRef={data.user} tenderNode={data} /> */}
      <TenderDetail queryRef={data.node} />
    </>
  );
}
