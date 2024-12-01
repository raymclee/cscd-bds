import * as React from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Button, Form, Input, Table, TableProps, Typography } from "antd";
import { graphql } from "relay-runtime";
import { usePreloadedQuery } from "react-relay";
import { customersPageQuery } from "__generated__/customersPageQuery.graphql";
import { Customer } from "~/graphql/graphql";
import dayjs from "dayjs";
import { industryText, ownerTypeText, customerSizeText } from "~/lib/helper";
import { Plus } from "lucide-react";
import { canEdit } from "~/lib/permission";

export const Route = createLazyFileRoute("/__auth/__portal/portal/customers/")({
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
                    updatedAt
                    ownerType
                    industry
                    size
                    area {
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
  }
`;

function RouteComponent() {
  const [searchText, setSearchText] = React.useState("");
  const data = usePreloadedQuery<customersPageQuery>(
    query,
    Route.useLoaderData(),
  );
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { session } = Route.useRouteContext();

  const dataSource =
    data.node?.areas?.edges?.flatMap((a) =>
      a?.node?.customers?.edges
        ?.map((c) => c?.node)
        .filter((n) =>
          n?.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
    ) ?? [];

  const columns: TableProps<Partial<Customer>>["columns"] = [
    {
      dataIndex: "name",
      title: "名称",
      render: (_, record) =>
        record.id ? (
          <Link to={`/portal/customers/$id`} params={{ id: record.id }}>
            <Button size="small" type="link">
              {record?.name}
            </Button>
          </Link>
        ) : (
          record?.name
        ),
    },
    { dataIndex: ["area", "name"], title: "区域" },
    {
      dataIndex: "ownerType",
      title: "所有者类型",
      render: (value) => ownerTypeText(value),
    },
    {
      dataIndex: "industry",
      title: "行业",
      render: (value) => industryText(value),
    },
    {
      dataIndex: "size",
      title: "规模",
      render: (value) => customerSizeText(value),
    },
    {
      dataIndex: "updatedAt",
      title: "更新时间",
      render: (value) => (
        <Typography.Text>{dayjs(value).format("LLL")}</Typography.Text>
      ),
    },
  ];

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Form.Item label="搜索" className="mb-0">
            <Input.Search
              placeholder="搜索"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              type="search"
            />
          </Form.Item>
        </div>

        {canEdit(session) && (
          <Button type="primary" icon={<Plus size={16} />}>
            添加客户
          </Button>
        )}
      </div>
      <Table
        className="rounded-lg"
        pagination={{
          current: searchParams.page,
          onChange(page, pageSize) {
            navigate({
              to: ".",
              search: { page },
            });
          },
        }}
        dataSource={dataSource}
        // @ts-ignore
        columns={columns}
        rowKey={"id"}
      />
    </>
  );
}
