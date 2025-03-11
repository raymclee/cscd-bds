import {
  createLazyFileRoute,
  Link,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "@tanstack/react-router";
import type { MenuProps } from "antd";
import {
  App,
  Avatar,
  Button,
  ConfigProvider,
  Layout,
  Menu,
  Popconfirm,
  Result,
  Tooltip,
  Typography,
} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import {
  Angry,
  Bot,
  Building2,
  ContactRound,
  LogOut,
  Map,
  Monitor,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import * as React from "react";
import logoImg from "~/assets/logo.jpg";
import { Loading } from "~/components/loading";
import { CustomerFormDrawer } from "~/components/portal/customer-form-drawer";
import { canEdit } from "~/lib/permission";
import { cn } from "~/lib/utils";
import { usePortalStore } from "~/store/portal";

export const Route = createLazyFileRoute("/__auth/__portal")({
  component: RouteComponent,
  errorComponent: ({ error }) => {
    console.error(error);
    return (
      <Result status="500" title="500" subTitle={"手有点抖，等等再试试吧"} />
    );
  },
  pendingComponent: () => <Loading />,
});

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { pathname } = useLocation();
  const { session } = Route.useRouteContext();
  const sidebarCollapsed = usePortalStore((s) => s.sidebarCollapsed);

  const items: MenuItem[] = React.useMemo(
    () => [
      getItem(
        <Link to="/portal/tenders">商机</Link>,
        "/portal/tenders",
        <Building2 size={16} />,
      ),
      getItem(
        <Link to="/portal/customers">客户</Link>,
        "/portal/customers",
        <ContactRound size={16} />,
      ),
      getItem(
        <Link to="/portal/potential-tenders" disabled={!session.isSuperAdmin}>
          潜在商机
        </Link>,
        "/portal/potential-tenders",
        <Bot size={16} />,
      ),
    ],
    [],
  );

  if (canEdit(session)) {
    items.push(
      getItem(
        <Link to="/portal/plots">区域地块</Link>,
        "/portal/plots",
        <Map size={16} />,
      ),
    );
  }

  if (session.isSuperAdmin) {
    items.push(
      getItem("管理员", "admins", <SlidersHorizontal size={16} />, [
        getItem(
          <Link to="/portal/sa/users">用户</Link>,
          "/portal/sa/users",
          <Users size={16} />,
        ),
        getItem(
          <Link to="/portal/sa/areas">区域</Link>,
          "/portal/sa/areas",
          <Map size={16} />,
        ),
        getItem(
          <Link to="/portal/competitors">竞争对手</Link>,
          "/portal/sa/competitors",
          <Angry size={16} />,
        ),
      ]),
    );
  } else if (session.isAdmin) {
    items.push(
      getItem("管理员", "admins", <SlidersHorizontal size={16} />, [
        getItem(
          <Link to="/portal/users">用户</Link>,
          "/portal/users",
          <Users size={16} />,
        ),
        getItem(
          <Link to="/portal/competitors">竞争对手</Link>,
          "/portal/sa/competitors",
          <Angry size={16} />,
        ),
      ]),
    );
  }

  // console.log(`/${pathname.split("/")?.at(1)}/${pathname.split("/")?.at(2)}`);

  return (
    <>
      <ConfigProvider
        locale={zhCN}
        input={{ variant: "filled" }}
        treeSelect={{ variant: "filled" }}
        select={{ variant: "filled" }}
        datePicker={{ variant: "filled" }}
        textArea={{ variant: "filled" }}
        inputNumber={{ variant: "filled" }}
        // componentSize="large"
      >
        <App>
          <Layout hasSider className="relative">
            <Sider
              className="!fixed start-0 top-0 bottom-8"
              breakpoint="lg"
              collapsedWidth={70}
              collapsible
              collapsed={sidebarCollapsed}
              onCollapse={(collapsed) =>
                usePortalStore.setState({ sidebarCollapsed: collapsed })
              }
            >
              <div className="flex items-center justify-center h-10 gap-2 m-4">
                <img src={logoImg} alt="logo" className="h-full" />
                {/* <span className="text-lg font-bold text-white">远东幕墙</span> */}
              </div>
              <Menu
                theme="dark"
                defaultSelectedKeys={[
                  `/${pathname.split("/")?.at(1)}/${pathname.split("/")?.at(2)}`,
                ]}
                defaultOpenKeys={["admins"]}
                mode="inline"
                items={items}
              />
            </Sider>
            <Layout
              className={cn(
                "transition-all",
                sidebarCollapsed ? "ms-[70px]" : "ms-[200px]",
              )}
            >
              <Header className="flex items-center justify-between !bg-white !px-4">
                <Typography.Title className="!mb-0" level={3}>
                  {pageTitle(pathname)}
                </Typography.Title>
                <div className="flex items-center gap-x-2">
                  {session.hasMapAccess && (
                    <Tooltip title="大屏">
                      <Link to="/" className="flex items-center justify-center">
                        <Button
                          shape="circle"
                          icon={<Monitor size={16} />}
                        ></Button>
                      </Link>
                    </Tooltip>
                  )}
                  <Tooltip title="退出">
                    <Popconfirm
                      title="确定退出吗？"
                      onConfirm={() => {
                        fetch("/api/v1/logout").then((res) => {
                          if (res.redirected) {
                            navigate({ to: "/logout" });
                          }
                        });
                      }}
                    >
                      <Button
                        shape="circle"
                        icon={<LogOut size={16} />}
                      ></Button>
                    </Popconfirm>
                  </Tooltip>
                  <Avatar src={session.avatarUrl} />
                </div>
              </Header>
              <Content className="relative m-4 !min-h-[calc(100vh-96px)]">
                {/* <Breadcrumb className="my-4" items={[]} /> */}
                {/* <div className="p-6 my-4 bg-white rounded-lg min-h-80"> */}
                <ScrollRestoration />
                <Outlet />
                {/* <TenderResultModal /> */}
                <CustomerFormDrawer />
                {/* </div> */}
              </Content>
            </Layout>
          </Layout>
        </App>
      </ConfigProvider>
    </>
  );
}

function pageTitle(pathname: string) {
  switch (pathname.split("/")[2]) {
    case "tenders":
      if (pathname.split("/")?.[3] === "new") {
        return "新建商机";
      }
      return "商机";
    case "plots":
      return "区域地块";
    case "potential-tenders":
      return "潜在商机";
    case "customers":
      return "客户";
    case "visit-records":
      return "拜访记录";
    case "sa":
      if (pathname.split("/")?.[3] === "users") {
        return "用户";
      } else if (pathname.split("/")?.[3] === "areas") {
        return "区域";
      }
    case "users":
      return "用户";
    case "areas":
      return "区域";
    case "competitors":
      return "竞争对手";
    default:
      return "";
  }
}
