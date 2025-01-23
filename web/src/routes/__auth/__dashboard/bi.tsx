import { createFileRoute } from "@tanstack/react-router";
import node, { biPageQuery } from "__generated__/biPageQuery.graphql";
import { Loader } from "lucide-react";
import { useRef, useState } from "react";
import { graphql, loadQuery, usePreloadedQuery } from "react-relay";

export const Route = createFileRoute("/__auth/__dashboard/bi")({
  component: RouteComponent,
  loader: async ({ context: { RelayEnvironment } }) => {
    // const res = await fetch(
    //   "https://bi.fefacade.com/webroot/decision/login/cross/domain?fine_username=ray.mclee&fine_password=ray.mclee830&validity=-1",
    //   { headers: { "Content-Type": "application/json" } },
    // );
    // const data = await res.json();
    // console.log(data);
    return loadQuery<biPageQuery>(RelayEnvironment, node, {});
  },
});

function RouteComponent() {
  const [loading, setLoading] = useState(true);
  const preload = Route.useLoaderData();
  const query = usePreloadedQuery<biPageQuery>(
    graphql`
      query biPageQuery {
        biToken
      }
    `,
    preload,
  );

  return (
    <div className="relative min-h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center min-h-full">
          <Loader className="animate-spin" />
        </div>
      )}
      <iframe
        className="w-full min-h-screen"
        src={`https://bi.fefacade.com/webroot/decision/v10/entry/access/04441373-1ba3-4f91-bb35-bffbe03cdbd7?fine_auth_token=${query.biToken}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );

  // useEffect(() => {
  //   if (ref.current?.contentWindow) {
  //     // ref.current.src = url;
  //     ref.current.contentWindow.document.write(
  //       `<script>window.location.href = "${url}"</script>`,
  //     );
  //   }
  // }, [url]);

  // return <iframe ref={ref}></iframe>;
}
