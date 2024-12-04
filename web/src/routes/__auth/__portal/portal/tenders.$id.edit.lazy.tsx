import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { graphql, usePreloadedQuery } from "react-relay";
import { tendersEditPageQuery } from "__generated__/tendersEditPageQuery.graphql";
import { TenderForm } from "~/components/portal/tender-form";
import { Result } from "antd";
import { Tender } from "~/graphql/graphql";

export const Route = createLazyFileRoute(
  "/__auth/__portal/portal/tenders/$id/edit",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const data = usePreloadedQuery<tendersEditPageQuery>(
    graphql`
      query tendersEditPageQuery($id: ID!, $userId: ID!) {
        tender: node(id: $id) {
          ...tenderDetailFragment
        }

        user: node(id: $userId) {
          ...tenderFormFragment
        }
      }
    `,
    Route.useLoaderData(),
  );

  if (!data.tender || !data.user) {
    return (
      <Result
        status="404"
        title="找不到该招标信息"
        subTitle="请检查链接是否正确"
      />
    );
  }

  return <TenderForm queryRef={data.user} tenderRef={data.tender} />;
}
