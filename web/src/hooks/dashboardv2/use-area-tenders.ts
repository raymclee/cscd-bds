import { useLoaderData, useSearch } from "@tanstack/react-router";
import { AmapPageQuery } from "__generated__/AmapPageQuery.graphql";
import { useMemo } from "react";
import { usePreloadedQuery } from "react-relay";
import { query } from "~/routes/__auth/__dashboard/__amap.lazy";
import { useMapV2Store } from "~/store";

export function useAreaTenders() {
  const preload = useLoaderData({ from: "/__auth/__dashboard/__amap" });
  const data = usePreloadedQuery<AmapPageQuery>(query, preload);

  const search = useSearch({ from: "/__auth/__dashboard/__amap" });

  const allTenders = useMemo(() => {
    return (
      data.node?.areas?.edges?.flatMap((e) =>
        e?.node?.tenders.edges?.map((e) => e?.node),
      ) || []
    );
  }, [data.node?.areas?.edges]);

  // const tenders = useMemo(() => {
  //   if (nodeProps?.level === "province" || nodeProps?.level === "city") {
  //     return allTenders.filter((t) => {
  //       switch (nodeProps?.level) {
  //         case "province":
  //         case "city":
  //           return (
  //             adcodes?.includes(t?.city?.adcode) ||
  //             adcodes?.includes(t?.district?.adcode)
  //           );
  //         // return t?.map(
  //         //   (e) =>
  //         //     adcodes?.includes(e?.node?.city?.adcode) ||
  //         //     adcodes?.includes(e?.node?.district.adcode),
  //         // );
  //         // adcodes?.includes(t?.node?.city?.adcode) ||
  //         // adcodes?.includes(t?.node?.district.adcode)
  //       }
  //     });
  //   } else if (selectedArea) {
  //     return selectedArea?.tenders?.edges?.map((e) => e?.node);
  //   } else {
  //     return allTenders;
  //   }
  // }, [allTenders, adcodes, nodeProps, selectedArea]);

  const tenders = useMemo(() => {
    if (search.d) {
      return allTenders.filter((t) => t?.district?.adcode === search.d);
    }
    if (search.c) {
      return allTenders.filter((t) => t?.city?.adcode === search.c);
    }
    if (search.p) {
      return allTenders.filter((t) => t?.province?.adcode === search.p);
    }
    if (search.a) {
      return allTenders.filter((t) => t?.area?.code === search.a);
    }
    return allTenders;
  }, [allTenders, search.a, search.p, search.d, search.c]);

  return tenders;
}
