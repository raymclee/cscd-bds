import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { customersPageQuery } from "__generated__/customersPageQuery.graphql";
import { Button, Table, TableProps, Typography } from "antd";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import { usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { ListFilter } from "~/components/portal/list-filter";
import { Customer } from "~/graphql/graphql";
import { customerSizeText, industryText, ownerTypeText } from "~/lib/helper";
import { canEdit } from "~/lib/permission";
import { usePortalStore } from "~/store/portal";

export const Route = createLazyFileRoute("/__auth/__portal/portal/customers")({
  component: RouteComponent,
});

const query = graphql`
  query customersPageQuery($userId: ID!, $first: Int, $last: Int) {
    node(id: $userId) {
      ... on User {
        areas {
          edges {
            node {
              name
              code
              customers(first: $first, last: $last)
                @connection(key: "customersPageQuery_customers") {
                edges {
                  node {
                    id
                    name
                    updatedAt
                    ownerType
                    industry
                    size
                    area {
                      id
                      code
                      name
                    }
                    tenders {
                      edges {
                        node {
                          id
                        }
                      }
                    }
                    visitRecords {
                      edges {
                        node {
                          id
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
    }
  }
`;

function RouteComponent() {
  const data = usePreloadedQuery<customersPageQuery>(
    query,
    Route.useLoaderData(),
  );
  const searchParams = Route.useSearch();
  const searchText = searchParams.q || "";
  const navigate = Route.useNavigate();
  const { session } = Route.useRouteContext();
  const area = searchParams.area;

  const areas = data?.node?.areas?.edges?.map((a) => ({
    label: a?.node?.name ?? "",
    value: a?.node?.code ?? "",
  }));

  const dataSource =
    data.node?.areas?.edges?.flatMap((a) =>
      a?.node?.customers?.edges
        ?.map((c) => c?.node)
        .filter((n) =>
          n?.name?.toLowerCase().includes(searchText?.toLowerCase()),
        )
        .filter((n) => area === undefined || n?.area?.code === area),
    ) ?? [];

  const columns: TableProps<Customer>["columns"] = [
    {
      title: "序号",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      dataIndex: "name",
      title: "名称",
      ellipsis: true,
      width: 400,
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
      title: "业主类型",
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
      width: 100,
      dataIndex: "tenders",
      title: "商机数",
      render: (value, record) => record.tenders?.edges?.length,
    },
    {
      width: 100,
      dataIndex: "visitRecords",
      title: "拜访数",
      render: (value, record) => record.visitRecords?.edges?.length,
    },
    {
      dataIndex: "updatedAt",
      title: "更新时间",
      width: 300,
      render: (value) => (
        <Typography.Text>{dayjs(value).format("LLL")}</Typography.Text>
      ),
    },
  ];

  // if (canEdit(session)) {
  //   columns.push({
  //     dataIndex: "actions",
  //     title: "操作",
  //     render: (_, record) => (
  //       <Button
  //         className="-ml-2"
  //         type="link"
  //         size="small"
  //         onClick={() => {
  //           usePortalStore.setState({
  //             customerFormOpen: true,
  //             customerFormCustomer: record as any,
  //           });
  //         }}
  //       >
  //         编辑
  //       </Button>
  //     ),
  //   });
  // }

  return (
    <>
      <ListFilter areas={areas}>
        {canEdit(session) && (
          <Button
            type="primary"
            icon={<Plus size={16} />}
            onClick={() => {
              usePortalStore.setState({ customerFormOpen: true });
            }}
            className="w-full md:w-auto"
          >
            {"添加客户"}
          </Button>
        )}
      </ListFilter>
      <Table
        sticky
        className="rounded-lg"
        pagination={{
          current: searchParams.page,
          onChange(page, pageSize) {
            navigate({
              to: ".",
              search: (prev) => ({ ...prev, page }),
            });
          },
          showTotal: (total) => `共 ${total} 条`,
        }}
        dataSource={dataSource}
        // @ts-ignore
        columns={columns}
        rowKey={"id"}
        scroll={{ x: "max-content" }}
      />
    </>
  );
}
