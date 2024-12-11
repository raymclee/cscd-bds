import { createLazyFileRoute, Link, useLocation } from "@tanstack/react-router";
import { Button, Result } from "antd";

export const Route = createLazyFileRoute("/access-denied")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  return (
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
  );
}
