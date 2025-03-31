import { useLoaderData } from "@tanstack/react-router";
import { useMemo } from "react";
import { usePreloadedQuery } from "react-relay";
import { useMapStore } from "~/store/map";
import { AmapPageQuery } from "__generated__/AmapPageQuery.graphql";
import { query } from "~/routes/__auth/__dashboard/__amap.lazy";

export function useAreaTenders() {
  const preload = useLoaderData({
    from: "/__auth/__dashboard/__amap",
  });
  const data = usePreloadedQuery<AmapPageQuery>(query, preload);
  const selectedArea = useMapStore((s) => s.selectedArea);
  const currentAreaNode = useMapStore((state) => state.currentAreaNode);

  const nodeProps = currentAreaNode?.getProps();

  const adcodes = currentAreaNode
    ?.getSubFeatures()
    ?.map((f: any) => f.properties.adcode);

  const allTenders = useMemo(() => {
    return (
      data.node?.areas?.edges?.flatMap((e) =>
        e?.node?.tenders.edges?.map((e) => e?.node),
      ) || []
    );
  }, [data.node?.areas?.edges]);

  const tenders = useMemo(() => {
    if (nodeProps?.level === "province" || nodeProps?.level === "city") {
      return allTenders.filter((t) => {
        switch (nodeProps?.level) {
          case "province":
          case "city":
            return (
              adcodes?.includes(t?.activeProfile?.city?.adcode) ||
              adcodes?.includes(t?.activeProfile?.district?.adcode)
            );
          // return t?.map(
          //   (e) =>
          //     adcodes?.includes(e?.node?.city?.adcode) ||
          //     adcodes?.includes(e?.node?.district.adcode),
          // );
          // adcodes?.includes(t?.node?.city?.adcode) ||
          // adcodes?.includes(t?.node?.district.adcode)
        }
      });
    } else if (selectedArea) {
      return selectedArea?.tenders?.edges?.map((e) => e?.node);
    } else {
      return allTenders;
    }
  }, [allTenders, adcodes, nodeProps, selectedArea]);

  return tenders;
}
