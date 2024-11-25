import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Table, TableProps, Typography } from "antd";
import { graphql } from "relay-runtime";
import { usePreloadedQuery } from "react-relay";
import { customersPageQuery } from "__generated__/customersPageQuery.graphql";
import { Customer } from "~/graphql/graphql";

export const Route = createLazyFileRoute("/__auth/__portal/portal/customers")({
  component: RouteComponent,
});

const query = graphql`
  query customersPageQuery($userId: ID!) {
    node(id: $userId) {
      ... on User {
        areas {
          edges {
            node {
              customers {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function RouteComponent() {
  const data = usePreloadedQuery<customersPageQuery>(
    query,
    Route.useLoaderData(),
  );

  const dataSource =
    data.node?.areas?.edges?.flatMap((a) =>
      a?.node?.customers?.edges?.map((c) => c?.node),
    ) ?? [];

  const columns: TableProps<Partial<Customer>>["columns"] = [
    { dataIndex: "name", title: "名称" },
  ];

  return (
    <div className="my-4 min-h-80 rounded-lg bg-white p-6">
      <Table
        pagination={{}}
        dataSource={dataSource}
        // @ts-ignore
        columns={columns}
        rowKey={"id"}
      />
    </div>
  );
}
