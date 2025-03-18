import { MessageOutlined } from "@ant-design/icons";
import { LikeOutlined } from "@ant-design/icons";
import { StarOutlined } from "@ant-design/icons";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { potentialTendersQuery } from "__generated__/potentialTendersQuery.graphql";
import { Button, List, Space, Table, TableProps } from "antd";
import { createElement } from "react";
import { graphql, useLazyLoadQuery, usePreloadedQuery } from "react-relay";
import { PotentialTender } from "~/graphql/graphql";

export const Route = createLazyFileRoute(
  "/__auth/__portal/portal/potential-tenders",
)({
  component: RouteComponent,
});

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);

function RouteComponent() {
  const data = usePreloadedQuery<potentialTendersQuery>(
    graphql`
      query potentialTendersQuery {
        potentialTenders(where: { dateGTE: "2025-01-01" }) {
          edges {
            node {
              id
              refURL
              title
              description
              requirement
              date
              type
              status
              amount
              size
              location
              contact
              contactPhone
              contactEmail
            }
          }
        }
      }
    `,
    Route.useLoaderData(),
  );
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();

  const columns: TableProps<Partial<PotentialTender>>["columns"] = [
    {
      title: "序号",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      dataIndex: "title",
      title: "标题",
      width: 300,
      ellipsis: true,
    },
    {
      dataIndex: "description",
      title: "描述",
      width: 300,
      ellipsis: true,
    },
    {
      dataIndex: "contact",
      title: "联系人",
    },
    {
      dataIndex: "contactPhone",
      title: "联系电话",
    },
    {
      dataIndex: "contactEmail",
      title: "联系邮箱",
    },
    {
      dataIndex: "requirement",
      title: "需求",
      ellipsis: true,
    },
    {
      dataIndex: "date",
      title: "日期",
    },
    {
      dataIndex: "type",
      title: "类型",
    },
    {
      dataIndex: "status",
      title: "状态",
    },
    {
      dataIndex: "amount",
      title: "金额",
    },
    {
      dataIndex: "size",
      title: "规模",
      ellipsis: true,
    },
    {
      dataIndex: "location",
      title: "位置",
      ellipsis: true,
    },
    {
      dataIndex: "actions",
      render: (_, record) => (
        <div className="flex items-center gap-2 pl-0">
          <a href={record.refURL} target="_blank">
            <Button type="link" size="small">
              查看原文
            </Button>
          </a>
          <Button type="link" size="small">
            录入
          </Button>
          <Button type="link" size="small" danger>
            删除
          </Button>
        </div>
      ),
      fixed: "right",
    },
  ];

  return (
    <Table
      sticky
      dataSource={data.potentialTenders.edges?.map((e) => e?.node)}
      // @ts-ignore
      columns={columns}
      rowKey={"id"}
      scroll={{ x: 3000 }}
      pagination={{
        current: searchParams.page,
        // pageSize: 20,
        onChange(page, pageSize) {
          navigate({
            to: ".",
            search: (prev) => ({ ...prev, page }),
          });
        },
        showTotal: (total) => `共 ${total} 条`,
      }}
    />
  );
}
