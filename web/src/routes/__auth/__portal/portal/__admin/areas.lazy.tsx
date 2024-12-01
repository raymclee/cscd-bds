import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { graphql, usePreloadedQuery } from "react-relay";
import { Button, Form, Input, Table } from "antd";
import { areasRouteQuery } from "__generated__/areasRouteQuery.graphql";
import { Plus } from "lucide-react";

export const Route = createLazyFileRoute(
  "/__auth/__portal/portal/__admin/areas",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const data = usePreloadedQuery<areasRouteQuery>(
    graphql`
      query areasRouteQuery {
        areas {
          edges {
            node {
              id
              name
              code
            }
          }
        }
      }
    `,
    Route.useLoaderData(),
  );
  const searchParams = Route.useSearch();
  const [searchText, setSearchText] = React.useState("");
  const navigate = Route.useNavigate();

  const dataSource = data.areas.edges?.map((edge) => edge?.node);

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "编码",
      dataIndex: "code",
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

        <Button type="primary" icon={<Plus size={16} />}>
          添加地区
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        // @ts-ignore
        columns={columns}
        rowKey={"id"}
        pagination={{
          current: searchParams.page,
          onChange(page) {
            navigate({ to: ".", search: { page } });
          },
        }}
      />
    </>
  );
}
