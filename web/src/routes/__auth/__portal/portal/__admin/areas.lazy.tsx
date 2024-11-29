import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { graphql, usePreloadedQuery } from "react-relay";
import { Form, Input, Table } from "antd";
import { areasRouteQuery } from "__generated__/areasRouteQuery.graphql";

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
    <div className="min-h-80">
      <div className="mb-4 flex items-center justify-between">
        <Form.Item noStyle>
          <Input.Search
            className="w-72"
            placeholder="搜索"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            type="search"
          />
        </Form.Item>
        {/* <Link to="/portal/tenders/new"> */}
        {/* <Button type="primary" icon={<Plus size={16} />}>
      添加商机
    </Button> */}
        {/* </Link> */}
        {/* <UserFormDrawer
      queryRef={data}
      connectionID={data.users.__id}
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
    /> */}
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
    </div>
  );
}
