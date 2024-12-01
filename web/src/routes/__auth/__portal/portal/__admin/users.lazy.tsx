import { createLazyFileRoute } from "@tanstack/react-router";
import { userFormFragment$key } from "__generated__/userFormFragment.graphql";
import { usersPageQuery } from "__generated__/usersPageQuery.graphql";
import {
  App,
  Button,
  Drawer,
  Form,
  Input,
  Popconfirm,
  Table,
  TableProps,
} from "antd";
import { Plus } from "lucide-react";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import { ConnectionHandler, graphql } from "relay-runtime";
import { UserForm } from "~/components/portal/user-form";
import { User } from "~/graphql/graphql";
import { useDeleteUser } from "~/hooks/use-delete-user";
import { useUpdateUser } from "~/hooks/use-update-user";

export const Route = createLazyFileRoute(
  "/__auth/__portal/portal/__admin/users",
)({
  component: RouteComponent,
});

const query = graphql`
  query usersPageQuery($first: Int, $last: Int) {
    users(first: $first, last: $last) @connection(key: "usersPageQuery_users") {
      __id
      edges {
        node {
          id
          name
          email
          username
          openID
          avatarURL
          disabled
          areas {
            edges {
              node {
                id
                name
              }
            }
          }
          isAdmin
          hasMapAccess
          hasEditAccess
        }
      }
    }

    ...userFormFragment
  }
`;

function RouteComponent() {
  const data = usePreloadedQuery<usersPageQuery>(query, Route.useLoaderData());
  const [searchText, setSearchText] = React.useState("");
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [commitDeleteUser, isDeleteUserInFlight] = useDeleteUser();
  const [commitUpdateUser, isUpdateUserInFlight] = useUpdateUser();
  const { message } = App.useApp();
  const { session } = Route.useRouteContext();

  const dataSource =
    data.users.edges
      ?.map((e) => e?.node)
      .filter((n) =>
        n?.name?.toLowerCase().includes(searchText.toLowerCase()),
      ) ?? [];

  const columns: TableProps<User>["columns"] = [
    {
      dataIndex: "name",
      title: "名称",
      render: (value, record) => (
        <Button
          type="link"
          size="small"
          onClick={() => setSelectedUser(record)}
        >
          {value}
        </Button>
      ),
    },
    {
      title: "区域",
      render: (_, record) =>
        record.areas.edges && record.areas.edges?.length > 0
          ? record.areas?.edges?.map((a) => a?.node?.name).join(", ")
          : "无",
    },
    {
      dataIndex: "hasMapAccess",
      title: "大地图",
      render: (hasMapAccess, record) =>
        record.isAdmin || hasMapAccess ? "是" : "否",
    },
    {
      dataIndex: "hasEditAccess",
      title: "编辑",
      render: (hasEditAccess, record) =>
        record.isAdmin || hasEditAccess ? "是" : "否",
    },
    {
      dataIndex: "isAdmin",
      title: "管理员",
      render: (isAdmin) => (isAdmin ? "是" : "否"),
    },
    {
      title: "操作",
      render: (_, record) => (
        <div className="-ml-2 flex items-center gap-2">
          <Button
            type="link"
            size="small"
            loading={isUpdateUserInFlight}
            disabled={session?.userId === record.id}
            onClick={() =>
              commitUpdateUser({
                variables: {
                  id: record.id,
                  input: { disabled: !record.disabled },
                },
                onCompleted() {
                  message.destroy();
                  message.success(record.disabled ? "启用成功" : "停用成功");
                },
                onError(error) {
                  console.error(error);
                  message.destroy();
                  message.error(record.disabled ? "启用失败" : "停用失败");
                },
              })
            }
          >
            {record.disabled ? "启用" : "停用"}
          </Button>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => {
              commitDeleteUser({
                variables: { id: record.id },
                onCompleted() {
                  message.success("删除成功");
                },
                onError(error) {
                  console.error(error);
                  message.error(`删除失败`);
                },
                updater(store) {
                  const userRecord = store.getRoot();
                  const connectionRecord = ConnectionHandler.getConnection(
                    userRecord,
                    "usersPageQuery_users",
                  );
                  ConnectionHandler.deleteNode(connectionRecord!, record.id);
                },
              });
            }}
          >
            <Button
              type="link"
              size="small"
              danger
              disabled={session?.userId === record.id}
              loading={isDeleteUserInFlight}
            >
              删除
            </Button>
          </Popconfirm>
        </div>
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

        {/* <Link to="/portal/tenders/new"> */}
        {/* <Button type="primary" icon={<Plus size={16} />}>
          添加商机
        </Button> */}
        {/* </Link> */}
        <UserFormDrawer
          queryRef={data}
          connectionID={data.users.__id}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
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

function UserFormDrawer({
  queryRef,
  connectionID,
  selectedUser,
  setSelectedUser,
}: {
  queryRef: userFormFragment$key;
  connectionID: string;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  const [open, setOpen] = React.useState(false);

  const onClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<Plus size={16} />}
        onClick={() => setOpen(true)}
      >
        添加用户
      </Button>
      <Drawer
        title={selectedUser ? "编辑用户" : "添加用户"}
        open={open || !!selectedUser}
        onClose={onClose}
        width={480}
        destroyOnClose
        maskClosable={false}
      >
        <UserForm
          queryRef={queryRef}
          onClose={onClose}
          connectionID={connectionID}
          selectedUser={selectedUser}
        />
      </Drawer>
    </>
  );
}
