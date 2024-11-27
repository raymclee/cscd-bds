import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { graphql } from "relay-runtime";
import { usePreloadedQuery } from "react-relay";
import { usersPageQuery } from "__generated__/usersPageQuery.graphql";
import { Table, TableProps } from "antd";
import { User } from "~/graphql/graphql";

export const Route = createLazyFileRoute(
  "/__auth/__portal/portal/__admin/users",
)({
  component: RouteComponent,
});

const query = graphql`
  query usersPageQuery {
    users {
      edges {
        node {
          id
          name
          areas {
            edges {
              node {
                name
              }
            }
          }
          isAdmin
          isLeader
        }
      }
    }
  }
`;

function RouteComponent() {
  const data = usePreloadedQuery<usersPageQuery>(query, Route.useLoaderData());

  const dataSource = data.users.edges?.map((e) => e?.node);
  const columns: TableProps<User>["columns"] = [
    {
      dataIndex: "name",
      title: "名称",
    },
    {
      title: "区域",
      render: (_, record) =>
        record.areas.edges && record.areas.edges?.length > 0
          ? record.areas?.edges?.map((a) => a?.node?.name).join(", ")
          : "无",
    },
    {
      dataIndex: "isLeader",
      title: "大地图权限",
      render: (isLeader, record) => (record.isAdmin || isLeader ? "是" : "否"),
    },
    {
      dataIndex: "isAdmin",
      title: "管理员",
      render: (isAdmin) => (isAdmin ? "是" : "否"),
    },
  ];

  return (
    <div className="min-h-80 rounded-lg bg-white">
      {/* 
      // @ts-ignore */}
      <Table dataSource={dataSource} columns={columns} rowKey={"id"} />
    </div>
  );
}
