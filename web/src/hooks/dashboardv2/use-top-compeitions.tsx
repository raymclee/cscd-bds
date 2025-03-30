import { useLoaderData } from "@tanstack/react-router";
import { usePreloadedQuery } from "react-relay";
import { V2IndexPageQuery } from "~/routes/__auth/__dashboard/__amap/index.lazy";
import { v2PageQuery } from "__generated__/v2PageQuery.graphql";

export function useTopCompetitions() {
  const preload = useLoaderData({
    from: "/__auth/__dashboard/__amap/v2",
  });
  return usePreloadedQuery<v2PageQuery>(V2IndexPageQuery, preload);
}
