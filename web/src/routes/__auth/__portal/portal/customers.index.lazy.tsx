import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { customerFormFragment$key } from "__generated__/customerFormFragment.graphql";
import { customersPageQuery } from "__generated__/customersPageQuery.graphql";
import { Button, Drawer, Table, TableProps, Typography } from "antd";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import { useState } from "react";
import { usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { CustomerForm } from "~/components/portal/customer-form";
import { ListFilter } from "~/components/portal/list-filter";
import { Customer } from "~/graphql/graphql";
import { customerSizeText, industryText, ownerTypeText } from "~/lib/helper";
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
              name
              code
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
                      code
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
      ...customerFormFragment @alias(as: "form")
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
          n?.name.toLowerCase().includes(searchText?.toLowerCase()),
        )
        .filter((n) => area === undefined || n?.area?.code === area),
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

  if (!data.node?.form) return null;

  return (
    <>
      <ListFilter areas={areas}>
        {canEdit(session) && <CustomerFormDrawer queryRef={data.node?.form} />}
      </ListFilter>
      <Table
        className="rounded-lg"
        pagination={{
          current: searchParams.page,
          onChange(page, pageSize) {
            navigate({
              to: ".",
              search: (prev) => ({ ...prev, page }),
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

type CustomerFormDrawerProps = {
  queryRef: customerFormFragment$key;
};

function CustomerFormDrawer({ queryRef }: CustomerFormDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="primary"
        icon={<Plus size={16} />}
        onClick={() => setOpen(true)}
        className="w-full md:w-auto"
      >
        添加客户
      </Button>
      <Drawer
        title="添加客户"
        open={open}
        onClose={() => setOpen(false)}
        width={480}
      >
        <CustomerForm queryRef={queryRef} onClose={() => setOpen(false)} />
      </Drawer>
    </>
  );
}
