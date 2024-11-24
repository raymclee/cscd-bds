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
          customers {
            id
            name
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

  const dataSource = data.node?.areas?.flatMap((a) => a.customers);

  const columns: TableProps<Partial<Customer>>["columns"] = [
    { dataIndex: "name", title: "名称" },
  ];

  return (
    <div className="my-4 min-h-80 rounded-lg bg-white p-6">
      {/*
      @ts-ignore */}
      <Table pagination={{}} dataSource={dataSource} columns={columns} />
    </div>
  );
}
