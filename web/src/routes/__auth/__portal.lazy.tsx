import { createLazyFileRoute, Link, Outlet } from "@tanstack/react-router";
import type { MenuProps } from "antd";
import { Breadcrumb, ConfigProvider, Layout, Menu } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import { Building2, ContactRound, FileClock } from "lucide-react";
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

const items: MenuItem[] = [
  getItem(
    <Link to="/portal/tenders">商机</Link>,
    "tenders",
    <Building2 size={16} />,
  ),
  getItem("客户", "customers", <ContactRound size={16} />),
  getItem("拜访记录", "visit-records", <FileClock size={16} />),
];

function RouteComponent() {
  return (
    <ConfigProvider
      locale={zhCN}
      input={{ variant: "filled" }}
      componentSize="large"
    >
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
            <div className="my-4 min-h-80 rounded-lg bg-white p-6">
              <Outlet />
            </div>
          </Content>
          <Footer className="text-center">
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
