import {
  createLazyFileRoute,
  Link,
  Outlet,
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
  Result,
  Typography,
} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import {
  Building2,
  ContactRound,
  Map,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import * as React from "react";
import logoImg from "~/assets/logo.jpg";
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
        "tenders",
        <Building2 size={16} />,
      ),
      getItem(
        <Link to="/portal/plots">区域地块</Link>,
        "plots",
        <Map size={16} />,
      ),
      getItem(
        <Link to="/portal/customers">客户</Link>,
        "customers",
        <ContactRound size={16} />,
      ),
    ],
    [],
  );

  if (session.isAdmin) {
    items.push(
      getItem("管理员", "admins", <SlidersHorizontal size={16} />, [
        getItem(
          <Link to="/portal/users">用户</Link>,
          "users",
          <Users size={16} />,
        ),
      ]),
    );
  }

  return (
    <ConfigProvider
      locale={zhCN}
      input={{ variant: "filled" }}
      treeSelect={{ variant: "filled" }}
      select={{ variant: "filled" }}
      datePicker={{ variant: "filled" }}
      textArea={{ variant: "filled" }}
      // componentSize="large"
    >
      <App>
        <Layout hasSider style={{ minHeight: "100vh" }}>
          <Sider
            className="fixed bottom-0 start-0 top-0 h-screen"
            breakpoint="lg"
            collapsible
            collapsed={sidebarCollapsed}
            onCollapse={(collapsed) =>
              usePortalStore.setState({ sidebarCollapsed: collapsed })
            }
          >
            <div className="m-4 flex h-10 items-center justify-center gap-2">
              <img src={logoImg} alt="logo" className="h-full" />
              {/* <span className="text-lg font-bold text-white">远东幕墙</span> */}
            </div>
            <Menu
              theme="dark"
              defaultSelectedKeys={[pathname.split("/")[2]]}
              defaultOpenKeys={["admins"]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout
            className={cn(
              "transition-all",
              sidebarCollapsed ? "ms-20" : "ms-[200px]",
            )}
          >
            <Header className="flex items-center justify-between bg-white px-4">
              <Typography.Title className="!mb-0" level={3}>
                {pageTitle(pathname)}
              </Typography.Title>
              <div className="flex items-center gap-4">
                <Button
                  danger
                  type="link"
                  size="small"
                  onClick={(e) => {
                    fetch("/api/v1/logout").then((res) => {
                      if (res.redirected) {
                        navigate({ to: "/logout" });
                      }
                    });
                  }}
                >
                  登出
                </Button>
                <Avatar src={session.avatarUrl} />
              </div>
            </Header>
            <Content className="relative mx-4">
              {/* <Breadcrumb className="my-4" items={[]} /> */}
              {/* <div className="my-4 min-h-80 rounded-lg bg-white p-6"> */}
              <Outlet />
              {/* </div> */}
            </Content>
          </Layout>
        </Layout>
      </App>
    </ConfigProvider>
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
    case "customers":
      return "客户";
    case "visit-records":
      return "拜访记录";
    default:
      return "";
  }
}
