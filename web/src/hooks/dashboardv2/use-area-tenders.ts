import { useSearch } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useMemo } from "react";
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
        q: state.q,
        status: state.status,
        sd: state.sd,
        ed: state.ed,
        classify: state.classify,
      };
    },
    structuralSharing: true,
  });

  return useMemo(() => {
    const allTenders =
      areas?.edges?.flatMap((e) =>
        e?.node?.tenders.edges?.map((e) => e?.node),
      ) || [];

    let areaTenders = allTenders;

    if (search.d) {
      areaTenders = areaTenders.filter(
        (t) => t?.activeProfile?.district?.adcode === search.d,
      );
    }
    if (search.c) {
      areaTenders = areaTenders.filter(
        (t) => t?.activeProfile?.city?.adcode === search.c,
      );
    }
    if (search.p) {
      areaTenders = areaTenders.filter(
        (t) => t?.activeProfile?.province?.adcode === search.p,
      );
    }
    if (search.a) {
      areaTenders = areaTenders.filter((t) => t?.area?.code === search.a);
    }

    return areaTenders
      .filter((t) =>
        search.q ? t?.activeProfile?.name?.includes(search.q) : true,
      )
      .filter((t) =>
        search.status
          ? search.status === 0
            ? true
            : t?.activeProfile?.status === search.status
          : true,
      )
      .filter((t) =>
        search.sd
          ? dayjs(t?.activeProfile?.tenderDate).isAfter(dayjs(search.sd))
          : true,
      )
      .filter((t) =>
        search.ed
          ? dayjs(t?.activeProfile?.tenderDate).isBefore(dayjs(search.ed))
          : true,
      )
      .filter((t) =>
        search.classify
          ? t?.activeProfile?.classify === Number(search.classify)
          : true,
      )
      .toSorted((a, b) => {
        if (a?.activeProfile?.tenderDate == null) {
          return 1;
        }
        if (b?.activeProfile?.tenderDate == null) {
          return -1;
        }
        return dayjs(a?.activeProfile?.tenderDate).diff(
          dayjs(b?.activeProfile?.tenderDate),
        );
      })
      .toSorted((a, b) => {
        if (!a?.activeProfile?.tenderClosingDate) {
          return 1;
        }
        if (!b?.activeProfile?.tenderClosingDate) {
          return -1;
        }
        return dayjs(a?.activeProfile?.tenderClosingDate).diff(
          dayjs(b?.activeProfile?.tenderClosingDate),
        );
      });
  }, [
    areas?.edges?.length,
    search.a,
    search.c,
    search.d,
    search.p,
    search.q,
    search.sd,
    search.ed,
    search.status,
    search.classify,
  ]);
}
