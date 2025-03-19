import { createLazyFileRoute } from "@tanstack/react-router";
import { tendersDashboardDetailPageQuery } from "__generated__/tendersDashboardDetailPageQuery.graphql";
import { useEffect } from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { useMapStore } from "~/store/map";

const tendersDetailPageQuery = graphql`
  query tendersDashboardDetailPageQuery($id: ID!) {
    node(id: $id) {
      ... on Tender {
        id
        name
        geoCoordinate {
          coordinates
        }
      }
    }
  }
`;

export const Route = createLazyFileRoute(
  "/__auth/__dashboard/__amap/tenders/$id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const preload = Route.useLoaderData();
  const data = usePreloadedQuery<tendersDashboardDetailPageQuery>(
    tendersDetailPageQuery,
    preload,
  );
  const map = useMapStore((state) => state.map);
  const toDefaultCenter = useMapStore((state) => state.toDefaultCenter);
  const moveToTender = useMapStore((state) => state.moveToTender);

  useEffect(() => {
    if (data.node) {
      moveToTender(data.node as any);
    }
  }, [data.node, moveToTender]);

  useEffect(() => {
    return () => {
      toDefaultCenter();
    };
  }, []);

  if (!data.node) {
    return <div>No data</div>;
  }

  const { name } = data.node;

  return <div className="relative z-10">{name}</div>;
}
