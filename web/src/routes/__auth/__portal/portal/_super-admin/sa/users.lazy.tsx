import { InfoCircleOutlined } from "@ant-design/icons";
import { createLazyFileRoute } from "@tanstack/react-router";
import { usersSuperAdminUsersPageQuery } from "__generated__/usersSuperAdminUsersPageQuery.graphql";
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
import { AreaConnection, ProjectConnection, User } from "~/graphql/graphql";
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
    projects(where: { isFinishedNEQ: true }) {
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
          projects {
            edges {
              node {
                id
                code
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
  const searchText = searchParams.q || "";
  const area = searchParams.area;

  const dataSource =
    data.users.edges
      ?.map((e) => e?.node)
      .filter((n) => n?.name?.toLowerCase().includes(searchText.toLowerCase()))
      .filter(
        (n) =>
          area === undefined ||
          n?.areas?.edges?.some((a) => a?.node?.code === area),
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
      dataIndex: "projects",
      title: "项目",
      render: (_, record) =>
        record.projects.edges && record.projects.edges?.length > 0 ? (
          <Tooltip
            placement="rightTop"
            title={`${record.projects.edges
              ?.map((p) => p?.node?.code)
              .join(", ")
              .substring(0, 500)}...`}
          >
            {record.projects.edges?.map((p) => p?.node?.code).join(", ")}
          </Tooltip>
        ) : (
          "无"
        ),
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
      >
        <UserFormDrawer
          connectionID={data.users.__id}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          avaliableAreas={data.areas as AreaConnection}
          avaliableProjects={data.projects as ProjectConnection}
        />
      </ListFilter>

      <Table
        dataSource={dataSource}
        // @ts-ignore
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
  avaliableAreas,
  connectionID,
  selectedUser,
  setSelectedUser,
  avaliableProjects,
}: {
  avaliableAreas: AreaConnection;
  avaliableProjects: ProjectConnection;
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
          connectionIDs={[connectionID]}
          selectedUser={selectedUser}
          isSuperAdmin
          avaliableAreas={avaliableAreas}
          avaliableProjects={avaliableProjects}
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
