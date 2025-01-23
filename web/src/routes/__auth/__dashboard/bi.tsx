import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/__auth/__dashboard/bi")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <iframe
      height="100%"
      width="100%"
      src="https://bi.fefacade.com/webroot/decision/v10/entry/access/04441373-1ba3-4f91-bb35-bffbe03cdbd7?fine_auth_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYXkubWNsZWUiLCJ0ZW5hbnRJZCI6ImRlZmF1bHQiLCJpc3MiOiJmYW5ydWFuIiwiZGVzY3JpcHRpb24iOiJbNjc0ZV1bNjU4N11bNzEyZl0ocmF5Lm1jbGVlKSIsImV4cCI6MTczODg0MTAzMCwiaWF0IjoxNzM3NjM1MDMwLCJqdGkiOiJSTEJqS2VuL0xnTm50d0hjYjlTeHpCcnJOditwbnFrdVh3NEpLcEI1bE9HTDBubjIifQ.RaKC3k_K1Z9xDIy_ZTnZh5znJGWVr3NxlVnCShtar-I"
    />
  );
}
