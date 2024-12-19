import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { graphql, usePreloadedQuery } from "react-relay";
import { competitorsQuery } from "__generated__/competitorsQuery.graphql";
import { Table } from "antd";

export const Route = createLazyFileRoute(
  "/_auth/_portal/portal/_super-admin/sa/competitors",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const data = usePreloadedQuery<competitorsQuery>(
    graphql`
      query competitorsQuery {
        competitors {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
    Route.useLoaderData(),
  );

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
  ];

  const tableData =
    data.competitors?.edges?.map((edge) => ({
      key: edge?.node?.id,
      name: edge?.node?.name,
      id: edge?.node?.id,
    })) || [];

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />
    </>
  );
}
