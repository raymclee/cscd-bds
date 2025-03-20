import { useLoaderData } from "@tanstack/react-router";
import { v2PageQuery } from "__generated__/v2PageQuery.graphql";
import { useMemo } from "react";
import { usePreloadedQuery } from "react-relay";
import { V2IndexPageQuery } from "~/routes/__auth/__dashboard/__amap/v2.lazy";
import { useMapV2Store } from "~/store";

export function useAreaTenders() {
  const preload = useLoaderData({
    from: "/__auth/__dashboard/__amap/v2",
  });
  const data = usePreloadedQuery<v2PageQuery>(V2IndexPageQuery, preload);
  const selectedArea = useMapV2Store.use.selectedArea();
  const currentAreaNode = useMapV2Store.use.selectedAreaNode();

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
              adcodes?.includes(t?.city?.adcode) ||
              adcodes?.includes(t?.district?.adcode)
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
