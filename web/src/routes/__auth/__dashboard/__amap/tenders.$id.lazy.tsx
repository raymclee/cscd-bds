import { createLazyFileRoute, useLocation } from "@tanstack/react-router";
import { tendersDashboardDetailPageQuery } from "__generated__/tendersDashboardDetailPageQuery.graphql";
import { motion } from "motion/react";
import { useEffect } from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { useMapV2Store } from "~/store";

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
  const moveToTender = useMapV2Store.use.moveToTender();
  const renderAreas = useMapV2Store.use.renderAreas();

  const location = useLocation();

  useEffect(() => {
    if (data.node) {
      moveToTender(data.node as any);
    }
  }, [data.node, moveToTender]);

  // useEffect(() => {
  //   return () => {
  //     if (location.pathname === "/v2/") {
  //       renderAreas();
  //     }
  //   };
  // }, [location.pathname]);

  if (!data.node) {
    return <div>No data</div>;
  }

  const { name } = data.node;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur"
        onClick={() => {
          useMapV2Store.setState({ selectedTender: null });
        }}
      />
      <motion.div className="fixed left-1/2 top-10 z-50 flex h-[90vh] w-44 -translate-x-1/2 transform flex-col items-stretch justify-center rounded border border-transparent bg-black bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur">
        {JSON.stringify(data.node, null, 2)}
        <button
          onClick={() => {
            useMapV2Store.setState({ selectedTender: null });
          }}
        >
          close
        </button>
      </motion.div>
    </>
  );
}
