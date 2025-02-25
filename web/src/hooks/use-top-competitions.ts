import { useLoaderData } from "@tanstack/react-router";
import { usePreloadedQuery } from "react-relay";
import { mapIndexPageQuery } from "~/routes/__auth/__dashboard/__scaled/__map/index.lazy";
import { MapIndexPageQuery } from "__generated__/MapIndexPageQuery.graphql";

export function useTopCompetitions() {
  const preload = useLoaderData({
    from: "/__auth/__dashboard/__scaled/__map/",
  });
  return usePreloadedQuery<MapIndexPageQuery>(mapIndexPageQuery, preload);
}
