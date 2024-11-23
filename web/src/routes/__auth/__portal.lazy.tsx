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
  Typography,
} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import { Building2, ContactRound, FileClock, Map } from "lucide-react";
import * as React from "react";

export const Route = createLazyFileRoute("/__auth/__portal")({
  component: RouteComponent,
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

  const items: MenuItem[] = React.useMemo(
    () => [
      getItem(
        <Link to="/portal/tenders">商机</Link>,
        "tenders",
        <Building2 size={16} />,
      ),
      getItem(
        <Link to="/portal/plots">區域地塊</Link>,
        "plots",
        <Map size={16} />,
      ),
      getItem(
        <Link to="/portal/customers">客户</Link>,
        "customers",
        <ContactRound size={16} />,
      ),
      getItem(
        <Link to="/portal/visit-records">拜访记录</Link>,
        "visit-records",
        <FileClock size={16} />,
      ),
    ],
    [],
  );

  return (
    <ConfigProvider
      locale={zhCN}
      input={{ variant: "filled" }}
      treeSelect={{ variant: "filled" }}
      select={{ variant: "filled" }}
      componentSize="large"
    >
      <App>
        <Layout hasSider style={{ minHeight: "100vh" }}>
          <Sider className="fixed bottom-0 start-0 top-0 h-screen" collapsible>
            <div className="m-4 h-8" />
            <Menu
              theme="dark"
              defaultSelectedKeys={[pathname.split("/")[2]]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout className="ms-[200px]">
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
            <Content className="mx-4">
              {/* <Breadcrumb className="my-4" items={[]} /> */}
              {/* <div className="my-4 min-h-80 rounded-lg bg-white p-6"> */}
              <Outlet />
              {/* </div> */}
            </Content>
            {/* <Footer className="text-center">
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer> */}
          </Layout>
        </Layout>
      </App>
    </ConfigProvider>
  );
}

function pageTitle(pathname: string) {
  switch (pathname.split("/")[2]) {
    case "tenders":
      return "商机";
    case "plots":
      return "區域地塊";
    case "customers":
      return "客户";
    case "visit-records":
      return "拜访记录";
    default:
      return "商机";
  }
}
