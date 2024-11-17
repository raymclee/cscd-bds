import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/login")({
  component: HomeComponent,
});

function HomeComponent() {
  useEffect(() => {
    location.href = `https://open.feishu.cn/open-apis/authen/v1/index?redirect_uri=${"http://localhost:3000/api/v1/auth/feishu/callback"}&app_id=${"cli_a7bb34cd9b65900c"}`;
  }, []);

  // return (
  //   <div className="p-2">
  //     <h3>Welcome Home!</h3>
  //     <Button type="primary">Hello</Button>
  //   </div>
  // )
  return null;
}
