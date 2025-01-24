import { createFileRoute } from "@tanstack/react-router";
import { Switcher } from "~/components/switcher";

export const Route = createFileRoute("/__auth/__dashboard/rainbow")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <iframe
        src="https://api.csci.com.hk/zhtappsso/api/Login/csmart-fareast?source=pc&lk_jump_to_browser=true"
        className="min-h-screen w-full"
        onError={(e) => {
          console.log(e);
        }}
      />
    </>
  );
}
