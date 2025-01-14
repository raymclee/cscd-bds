import { createLazyFileRoute, Link, useLocation } from "@tanstack/react-router";
import { Button, ConfigProvider, Result, theme } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

export const Route = createLazyFileRoute("/access-denied")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ConfigProvider locale={zhCN} theme={{ algorithm: theme.darkAlgorithm }}>
      <div className="flex min-h-screen items-center justify-center">
        <Result
          status="403"
          title="403"
          subTitle="抱歉，您无权访问此页面。"
          extra={
            <Link to="/">
              <Button type="primary">返回首页</Button>
            </Link>
          }
        />
      </div>
    </ConfigProvider>
  );
}
