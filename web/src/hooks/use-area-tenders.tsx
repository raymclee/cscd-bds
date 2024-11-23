import { MapIndexPageQuery$data } from "__generated__/MapIndexPageQuery.graphql";
import { useMapStore } from "~/store/map";

export function useAreaTenders(data: MapIndexPageQuery$data) {
  const selectedArea = useMapStore((s) => s.selectedArea);
  const currentAreaNode = useMapStore((state) => state.currentAreaNode);

  const nodeProps = currentAreaNode?.getProps();

  const adcodes = currentAreaNode
    ?.getSubFeatures()
    ?.map((f: any) => f.properties.adcode);

  const allTenders = data.areas.edges?.flatMap((e) => e?.node?.tenders) || [];

  const tenders =
    nodeProps?.level === "province" || nodeProps?.level === "city"
      ? allTenders.filter((t) => {
          switch (nodeProps?.level) {
            case "province":
            case "city":
              return (
                adcodes?.includes(t?.city?.adcode) ||
                adcodes?.includes(t?.district.adcode)
              );
          }
        })
      : selectedArea
        ? selectedArea?.tenders
        : allTenders;

  return tenders;
}
