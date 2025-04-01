import { InfoCircleOutlined } from "@ant-design/icons";
import { createLazyFileRoute } from "@tanstack/react-router";
import { usersPageQuery$data } from "__generated__/usersPageQuery.graphql";
import {
  usersSuperAdminUsersPageQuery,
  usersSuperAdminUsersPageQuery$data,
} from "__generated__/usersSuperAdminUsersPageQuery.graphql";
import {
  App,
  Button,
  Drawer,
  Form,
  Popconfirm,
  Select,
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
import {
  AreaConnection,
  ProjectConnection,
  User,
  UserConnection,
} from "~/graphql/graphql";
import { useDeleteUser } from "~/hooks/use-delete-user";
import { useUpdateUser } from "~/hooks/use-update-user";

export const Route = createLazyFileRoute(
  "/__auth/__portal/portal/_super-admin/sa/users",
)({
  component: RouteComponent,
});

const query = graphql`
  query usersSuperAdminUsersPageQuery($first: Int, $last: Int) {
    areas {
      edges {
        node {
          id
          name
          code
        }
      }
    }
    projects(where: { isFinishedNEQ: true }, orderBy: { field: CODE }) {
      edges {
        node {
          id
          code
        }
      }
    }
    users(first: $first, last: $last)
      @connection(key: "usersSuperAdminUsersPageQuery_users") {
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
          isCeo
          isAdmin
          isSuperAdmin
          hasMapAccess
          hasEditAccess
          leader {
            id
            name
          }
          teamMembers {
            id
            name
          }
          projects(where: { isFinishedNEQ: true }, orderBy: { field: CODE }) {
            edges {
              node {
                id
                code
                isFinished
              }
            }
          }
        }
      }
    }
  }
`;

function RouteComponent() {
  const data = usePreloadedQuery<usersSuperAdminUsersPageQuery>(
    query,
    Route.useLoaderData(),
  );
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [commitDeleteUser, isDeleteUserInFlight] = useDeleteUser();
  const [commitUpdateUser, isUpdateUserInFlight] = useUpdateUser();
  const { message } = App.useApp();
  const { session } = Route.useRouteContext();
  const searchText = Route.useSearch({ select: (s) => s.q || "" });
  const area = Route.useSearch({ select: (s) => s.area });
  const leader = Route.useSearch({ select: (s) => s.leader });

  const leaders = [
    ...new Map(
      data.users.edges?.map((e) => [e?.node?.leader?.id, e?.node?.leader]),
    ).values(),
  ].filter((l) => !!l);

  const dataSource =
    data.users.edges
      ?.map((e) => e?.node)
      .filter((n) => n?.name?.toLowerCase().includes(searchText.toLowerCase()))
      .filter(
        (n) =>
          area === undefined ||
          n?.areas?.edges?.some((a) => a?.node?.code === area),
      )
      .filter((n) => leader === undefined || n?.leader?.id === leader) ?? [];

  const columns: TableProps<User>["columns"] = [
    {
      title: "序号",
      width: 60,
      render: (_, __, index) => index + 1,
    },
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
        record.areas.edges && record.areas.edges?.length > 0 ? (
          <Tooltip
            title={record.areas.edges?.map((a) => a?.node?.name).join(", ")}
          >
            {record.areas.edges?.map((a) => a?.node?.name).join(", ")}
          </Tooltip>
        ) : (
          "无"
        ),
      width: 260,
      ellipsis: true,
    },
    {
      dataIndex: "leader",
      title: "团队",
      render(value) {
        return value?.name ?? "无";
      },
    },
    {
      dataIndex: "projects",
      title: "项目",
      render: (_, record) => {
        if (!record?.projects?.edges?.length) return "无";
        const text =
          data.projects.edges?.length === record.projects.edges?.length
            ? "全部"
            : record.projects.edges
                ?.map((p) => p?.node?.code)
                // .sort((a, b) => (a ?? "").localeCompare(b ?? ""))
                .join(", ");
        return (
          <Tooltip placement="rightTop" title={text}>
            {text}
          </Tooltip>
        );
      },
      width: 260,
      ellipsis: true,
    },
    {
      dataIndex: "hasMapAccess",
      title: "大地图",
      render: (hasMapAccess, record) => (
        <UserToggle user={record} field="hasMapAccess" value={hasMapAccess} />
      ),
    },
    {
      dataIndex: "hasEditAccess",
      title: "编辑",
      render: (hasEditAccess, record) => (
        <UserToggle user={record} field="hasEditAccess" value={hasEditAccess} />
      ),
    },
    {
      dataIndex: "isCeo",
      title: "领导",
      render: (isCeo, record) => (
        <UserToggle user={record} field="isCeo" value={isCeo} />
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
      dataIndex: "isSuperAdmin",
      title: "超级管理员",
      render: (isSuperAdmin, record) => (
        <UserToggle user={record} field="isSuperAdmin" value={isSuperAdmin} />
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
                variables: { id: record.id, connections: [data.users.__id] },
                onCompleted() {
                  message.destroy();
                  message.success("删除成功");
                },
                onError(error) {
                  console.error(error);
                  message.destroy();
                  message.error(`删除失败`);
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
        areas={data.areas.edges?.map((a) => ({
          label: a?.node?.name ?? "",
          value: a?.node?.code ?? "",
        }))}
        left={
          <Form.Item label="团队" className="!mb-0">
            <Select
              placeholder="团队"
              className="w-full md:!w-24"
              value={leader}
              onSelect={(leader) => {
                navigate({
                  to: ".",
                  search: (prev) => ({ ...prev, leader }),
                  replace: true,
                });
              }}
              allowClear
              onClear={() => {
                navigate({
                  to: ".",
                  replace: true,
                  search: (prev) => ({ ...prev, leader: undefined }),
                });
              }}
              options={leaders.map((l) => ({
                label: l?.name ?? "",
                value: l?.id ?? "",
              }))}
            />
          </Form.Item>
        }
      >
        <UserFormDrawer
          connectionID={data.users.__id}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          avaliableAreas={data.areas as AreaConnection}
          avaliableProjects={data.projects as ProjectConnection}
          avaliableUsers={data.users.edges?.map((e) => e?.node) as User[]}
        />
      </ListFilter>

      <Table
        sticky
        dataSource={dataSource}
        // @ts-ignore
        columns={columns}
        rowKey={"id"}
        scroll={{ x: 1600 }}
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
  avaliableAreas,
  connectionID,
  selectedUser,
  setSelectedUser,
  avaliableProjects,
  avaliableUsers,
}: {
  avaliableAreas: AreaConnection;
  avaliableProjects: ProjectConnection;
  avaliableUsers: User[];
  connectionID: string;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  const [open, setOpen] = React.useState(false);

  const onClose = React.useCallback(() => {
    setOpen(false);
    setSelectedUser(null);
  }, [setSelectedUser]);

  const connectionIDs = [connectionID];

  const plusIcon = React.useMemo(() => <Plus size={16} />, []);

  const handleClick = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const memoizedDrawer = React.useMemo(
    () => (
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
          isSuperAdmin
          avaliableAreas={avaliableAreas}
          avaliableProjects={avaliableProjects}
          avaliableUsers={avaliableUsers}
        />
      </Drawer>
    ),
    [
      open,
      selectedUser,
      onClose,
      connectionIDs,
      avaliableAreas,
      avaliableProjects,
      avaliableUsers,
    ],
  );

  return (
    <>
      {React.useMemo(
        () => (
          <Button
            type="primary"
            icon={plusIcon}
            onClick={handleClick}
            className="w-full md:w-auto"
          >
            添加用户
          </Button>
        ),
        [plusIcon, handleClick],
      )}
      {memoizedDrawer}
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
    | "isCeo"
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
