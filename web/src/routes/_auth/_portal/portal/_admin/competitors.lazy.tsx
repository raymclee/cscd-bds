import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { graphql, usePreloadedQuery } from "react-relay";
import {
  competitorsQuery,
  competitorsQuery$data,
} from "__generated__/competitorsQuery.graphql";
import {
  Input,
  Form,
  message,
  Modal,
  Table,
  Radio,
  Button,
  App,
  Space,
  TableProps,
  Popconfirm,
} from "antd";
import { useState } from "react";
import { Competitor, CreateCityInput } from "~/graphql/graphql";
import { CreateCompetitorInput } from "__generated__/useCreateCompetitorMutation.graphql";
import { useCreateCompetitor } from "~/hooks/use-create-competitor";
import { ListFilter } from "~/components/portal/list-filter";
import { Plus } from "lucide-react";
import { usePortalStore } from "~/store/portal";
import { useUpdateCompetitor } from "~/hooks/use-update-competitor";
import { useDeleteCompetitor } from "~/hooks/use-delete-competitor";

export const Route = createLazyFileRoute(
  "/_auth/_portal/portal/_admin/competitors",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const data = usePreloadedQuery<competitorsQuery>(
    graphql`
      query competitorsQuery {
        competitors {
          __id
          edges {
            node {
              id
              name
              shortName
            }
          }
        }
      }
    `,
    Route.useLoaderData(),
  );
  const navigate = Route.useNavigate();
  const searchParams = Route.useSearch();

  const columns: TableProps<Competitor>["columns"] = [
    {
      title: "简称",
      dataIndex: "shortName",
      key: "shortName",
      sorter: (a, b) => a.shortName.localeCompare(b.shortName),
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space className="-ml-2">
          <Button
            type="link"
            size="small"
            onClick={() => {
              usePortalStore.setState({
                competitorFormOpen: true,
                competitorFormCompetitor: record,
              });
            }}
          >
            编辑
          </Button>
          <DeleteCompetitorButton
            competitor={record}
            connectionID={data.competitors.__id}
          />
        </Space>
      ),
    },
  ];

  const tableData =
    data.competitors?.edges
      ?.map((edge) => ({
        key: edge?.node?.id,
        shortName: edge?.node?.shortName,
        name: edge?.node?.name,
        id: edge?.node?.id,
      }))
      .filter(
        (e) =>
          searchParams.q === undefined ||
          e.name?.toLowerCase().includes(searchParams.q.toLowerCase()) ||
          e.shortName?.toLowerCase().includes(searchParams.q.toLowerCase()),
      ) || [];

  return (
    <>
      <ListFilter>
        <CompetitorModal connectionID={data.competitors.__id} />
      </ListFilter>
      <Table
        // @ts-ignore
        columns={columns}
        dataSource={tableData}
        pagination={{
          current: searchParams.page,
          onChange(page) {
            navigate({
              to: ".",
              search: (prev) => ({ ...prev, page }),
            });
          },
          showTotal: (total) => `共 ${total} 条`,
        }}
      />
    </>
  );
}

type CompetitorModalProps = {
  connectionID: string;
};

function CompetitorModal({ connectionID }: CompetitorModalProps) {
  const open = usePortalStore((state) => state.competitorFormOpen);
  const competitorFormCompetitor = usePortalStore(
    (state) => state.competitorFormCompetitor,
  );
  const [form] = Form.useForm();
  const [commitCreateMutation, isCreateMutationInFlight] =
    useCreateCompetitor();
  const [commitUpdateMutation, isUpdateMutationInFlight] =
    useUpdateCompetitor();
  const { message } = App.useApp();

  const onClose = () => {
    usePortalStore.setState({
      competitorFormOpen: false,
      competitorFormCompetitor: null,
    });
  };

  React.useEffect(() => {
    form.setFieldsValue({
      shortName: competitorFormCompetitor?.shortName,
      name: competitorFormCompetitor?.name,
    });
  }, [competitorFormCompetitor]);

  return (
    <>
      <Button
        type="primary"
        icon={<Plus size={16} />}
        className="w-full md:w-auto"
        onClick={() => {
          usePortalStore.setState({
            competitorFormOpen: true,
          });
        }}
      >
        添加竞争对手
      </Button>
      <Modal
        open={open || !!competitorFormCompetitor}
        title="请输入竞争对手名称"
        okText="提交"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => {
          onClose();
        }}
        destroyOnClose
        modalRender={(dom) => (
          <Form<CreateCompetitorInput>
            disabled={isCreateMutationInFlight || isUpdateMutationInFlight}
            layout="vertical"
            form={form}
            clearOnDestroy
            onFinish={(values) => {
              if (competitorFormCompetitor) {
                commitUpdateMutation({
                  variables: {
                    id: competitorFormCompetitor.id,
                    input: values,
                  },
                  onCompleted: () => {
                    onClose();
                    form.resetFields();
                    message.destroy();
                    message.success("修改成功");
                  },
                  onError: (error) => {
                    message.destroy();
                    message.error(error.message);
                  },
                });
              } else {
                commitCreateMutation({
                  variables: {
                    input: values,
                    connections: [connectionID],
                  },
                  onCompleted: () => {
                    onClose();
                    form.resetFields();
                    message.destroy();
                    message.success("添加成功");
                  },
                  onError: (error) => {
                    message.destroy();
                    message.error(error.message);
                  },
                });
              }
            }}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          className="mt-6"
          name="shortName"
          label="简称"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="mt-6"
          name="name"
          label="名称"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
}

function DeleteCompetitorButton({
  competitor,
  connectionID,
}: {
  competitor: Competitor;
  connectionID: string;
}) {
  const [commitDeleteMutation, isDeleteMutationInFlight] =
    useDeleteCompetitor();
  const { message } = App.useApp();

  return (
    <Popconfirm
      title="确定要删除吗？"
      onConfirm={() => {
        commitDeleteMutation({
          variables: {
            id: competitor.id,
            connections: [connectionID],
          },
        });
      }}
    >
      <Button type="link" size="small" danger>
        删除
      </Button>
    </Popconfirm>
  );
}
