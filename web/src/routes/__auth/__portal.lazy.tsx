import {
  createLazyFileRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import type { MenuProps } from "antd";
import { App, Breadcrumb, Button, ConfigProvider, Layout, Menu } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import { Building2, ContactRound, FileClock, LogOut, Map } from "lucide-react";
import * as React from "react";

export const Route = createLazyFileRoute("/__auth/__portal")({
  component: RouteComponent,
});

const { Header, Content, Footer, Sider } = Layout;

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
  const items: MenuItem[] = React.useMemo(
    () => [
      getItem(
        <Link to="/portal/tenders">商机</Link>,
        "tenders",
        <Building2 size={16} />,
      ),
      getItem(
        <Link to="/portal/plots" search={{ districtID: "" }}>
          區域地塊
        </Link>,
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
      getItem(
        <button
          className="text-red-500"
          onClick={(e) => {
            fetch("/api/v1/logout", { redirect: "follow" }).then((res) => {
              if (res.redirected) {
                navigate({ to: "/logout" });
              }
            });
          }}
        >
          登出
        </button>,
        "logout",
        <LogOut
          size={16}
          className="fill-red-500 stroke-red-500 text-red-500"
        />,
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
          <Sider
            width={192}
            className="fixed bottom-0 start-0 top-0 h-screen"
            collapsible
          >
            <div className="m-4 h-8" />
            <Menu
              theme="dark"
              defaultSelectedKeys={["tenders"]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout className="ms-48">
            {/* <Header className="bg-white p-0" /> */}
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
