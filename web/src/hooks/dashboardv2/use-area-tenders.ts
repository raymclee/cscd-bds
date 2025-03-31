import { useSearch } from "@tanstack/react-router";
import { useMapV2Store } from "~/store";

export function useAreaTenders() {
  const areas = useMapV2Store.use.areas();

  const search = useSearch({
    from: "/__auth/__dashboard/__amap",
    select(state) {
      return {
        a: state.a,
        p: state.p,
        c: state.c,
        d: state.d,
      };
    },
    structuralSharing: true,
  });

  const allTenders =
    areas?.edges?.flatMap((e) => e?.node?.tenders.edges?.map((e) => e?.node)) ||
    [];

  if (search.d) {
    return allTenders.filter(
      (t) => t?.activeProfile?.district?.adcode === search.d,
    );
  }
  if (search.c) {
    return allTenders.filter(
      (t) => t?.activeProfile?.city?.adcode === search.c,
    );
  }
  if (search.p) {
    return allTenders.filter(
      (t) => t?.activeProfile?.province?.adcode === search.p,
    );
  }
  if (search.a) {
    return allTenders.filter((t) => t?.area?.code === search.a);
  }
  return allTenders;
}
