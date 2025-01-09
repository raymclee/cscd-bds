import { InfoCircleOutlined } from "@ant-design/icons";
import { createLazyFileRoute } from "@tanstack/react-router";
import { usersPageQuery } from "__generated__/usersPageQuery.graphql";
import {
  App,
  Button,
  Drawer,
  Popconfirm,
  Switch,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import { Plus } from "lucide-react";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { ListFilter } from "~/components/portal/list-filter";
import { UserForm } from "~/components/portal/user-form";
import { AreaConnection, User } from "~/graphql/graphql";
import { useDeleteUser } from "~/hooks/use-delete-user";
import { useUpdateUser } from "~/hooks/use-update-user";

export const Route = createLazyFileRoute(
  "/__auth/__portal/portal/_admin/users",
)({
  component: RouteComponent,
});

const query = graphql`
  query usersPageQuery($userId: ID!, $first: Int, $last: Int) {
    node(id: $userId) {
      ... on User {
        areas {
          edges {
            node {
              id
              name
              code
              users(
                first: $first
                last: $last
                where: { isCeo: false, isSuperAdmin: false }
              ) @connection(key: "usersPageQuery_users") {
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
                          code
                        }
                      }
                    }
                    isAdmin
                    hasMapAccess
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
  const data = usePreloadedQuery<usersPageQuery>(query, Route.useLoaderData());
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [commitDeleteUser, isDeleteUserInFlight] = useDeleteUser();
  const [commitUpdateUser, isUpdateUserInFlight] = useUpdateUser();
  const { message } = App.useApp();
  const { session } = Route.useRouteContext();
  const searchText = searchParams.q || "";
  const area = searchParams.area;

  const users: User[] = [];
  for (const area of data.node?.areas?.edges ?? []) {
    for (const user of area?.node?.users.edges ?? []) {
      if (!user?.node) {
        continue;
      }
      if (users.map((u) => u.id).includes(user.node.id)) {
        continue;
      }
      users.push(user.node as User);
    }
  }

  const dataSource =
    users
      .filter((n) => n?.name?.toLowerCase().includes(searchText.toLowerCase()))
      .filter(
        (n) =>
          area === undefined ||
          n?.areas?.edges?.some((a) => a?.node?.code === area),
      ) ?? [];

  const connectionIDs =
    data.node?.areas?.edges
      ?.flatMap((e) => e?.node?.users.__id)
      .filter((id) => id !== undefined) ?? [];

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
          ? record.areas?.edges
              ?.filter((e) =>
                data.node?.areas?.edges
                  ?.map((a) => a?.node?.id)
                  .includes(e?.node?.id),
              )
              .map((a) => a?.node?.name)
              .join(", ")
          : "无",
    },
    {
      dataIndex: "hasMapAccess",
      title: "大地图",
      render: (hasMapAccess, record) => (
        <UserToggle user={record} field="hasMapAccess" value={hasMapAccess} />
      ),
    },
    {
      dataIndex: "isAdmin",
      title: "管理员",
      render: (isAdmin, record) => (
        <UserToggle user={record} field="isAdmin" value={isAdmin} />
      ),
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
                variables: { id: record.id, connections: connectionIDs },
                onCompleted() {
                  message.success("删除成功");
                },
                onError(error) {
                  console.error(error);
                  let msg = "删除失败";
                  if (
                    error.message.includes("cannot delete super admin or ceo")
                  ) {
                    msg = "不能删除超级管理员或CEO";
                  } else if (error.message.includes("cannot delete self")) {
                    msg = "不能删除自己";
                  }
                  message.error(msg);
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
      <ListFilter
        areas={data.node?.areas?.edges?.map((a) => ({
          label: a?.node?.name ?? "",
          value: a?.node?.code ?? "",
        }))}
      >
        <UserFormDrawer
          connectionIDs={connectionIDs.length > 0 ? [connectionIDs.at(0)!] : []}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          avaliableAreas={data.node?.areas as AreaConnection}
        />
      </ListFilter>

      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={"id"}
        scroll={{ x: 1000 }}
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

function UserFormDrawer({
  connectionIDs,
  selectedUser,
  setSelectedUser,
  avaliableAreas,
}: {
  connectionIDs: string[];
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  avaliableAreas: AreaConnection;
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
        className="w-full md:w-auto"
      >
        添加用户
      </Button>
      <Drawer
        title={selectedUser ? "编辑用户" : "添加用户"}
        open={open || !!selectedUser}
        onClose={onClose}
        width={480}
        destroyOnClose
        maskClosable={!!selectedUser}
      >
        <UserForm
          onClose={onClose}
          connectionIDs={connectionIDs}
          selectedUser={selectedUser}
          avaliableAreas={avaliableAreas}
        />
      </Drawer>
    </>
  );
}

function UserToggle({
  user,
  field,
  value,
}: {
  user: User;
  field:
    | "isSales"
    | "isAdmin"
    | "isSuperAdmin"
    | "hasMapAccess"
    | "hasEditAccess";
  value: boolean;
}) {
  const [commitUpdateUser, isUpdateUserInFlight] = useUpdateUser();
  const { message } = App.useApp();

  const title = value ? "停用" : "启用";

  return (
    <Switch
      value={value}
      checked={value}
      disabled={isUpdateUserInFlight}
      onChange={() => {
        commitUpdateUser({
          variables: {
            id: user.id,
            input: { [field]: !value },
          },
          onCompleted() {
            message.destroy();
            message.success(`${title}成功`);
          },
          onError(error) {
            console.error(error);
            message.destroy();
            message.error(`${title}失败`);
          },
        });
      }}
    />
  );
}
