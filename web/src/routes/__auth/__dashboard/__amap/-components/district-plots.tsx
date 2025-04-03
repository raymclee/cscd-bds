import {
  graphql,
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from "react-relay";
import { useLazyLoadQuery } from "react-relay";
import { useEffect, useState } from "react";
import { useMapV2Store } from "~/store";
import { useSearch } from "@tanstack/react-router";
import { districtPlotsQuery } from "__generated__/districtPlotsQuery.graphql";

const query = graphql`
  query districtPlotsQuery($adcode: Int!) {
    districts(where: { adcode: $adcode }) {
      edges {
        node {
          plots {
            edges {
              node {
                id
                name
                geoBounds
                colorHex
              }
            }
          }
        }
      }
    }
  }
`;

export function DistrictPlots() {
  const adcode = useSearch({
    from: "/__auth/__dashboard/__amap",
    select: (s) => s.d,
  });

  if (!adcode) return null;

  return <DistrictPlotsContent adcode={adcode} />;
}

function DistrictPlotsContent({ adcode }: { adcode: number }) {
  const data = useLazyLoadQuery<districtPlotsQuery>(query, { adcode });

  useEffect(() => {
    if (data?.districts.edges?.length === 0) return;

    const { map } = useMapV2Store.getState();

    const mapCircles: (AMap.Polygon | AMap.CircleMarker | any)[] = [];
    for (const plot of data?.districts.edges
      ?.map((e) => e?.node)
      .flatMap((d) => d?.plots.edges)
      .map((e) => e?.node) || []) {
      const polygon = new AMap.Polygon();

      polygon.setPath(plot?.geoBounds as AMap.LngLatLike[]);
      polygon.setOptions({
        fillColor: plot?.colorHex,
        fillOpacity: 0.35,
        strokeColor: plot?.colorHex,
        strokeWeight: 2,
      });

      // @ts-expect-error
      const label = new AMapUI.SimpleMarker({
        // @ts-expect-error
        iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
        label: {
          content: `
            <div class="w-[10rem] rounded-lg px-1 py-0.5 line-clamp-2">
              <div class="text-sm font-medium text-center text-wrap">${plot?.name}</div>
            </div>
            `,
          offset: new AMap.Pixel(-200, 30),
        },
        position: polygon.getBounds()?.getCenter(),
        // map,
      });

      mapCircles.push(polygon);
      mapCircles.push(label);
    }

    for (const circle of mapCircles) {
      map?.add(circle);
    }

    useMapV2Store.setState((state) => {
      return {
        mapCircles,
      };
    });
  }, [data.districts.edges?.length]);

  // useEffect(() => {
  //   return () => {
  //     console.log("unmount");
  //     const { mapCircles, map } = useMapV2Store.getState();
  //     map?.remove(mapCircles);
  //     useMapV2Store.setState({ mapCircles: [] });
  //   };
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     console.log("unmount");
  //     console.log(mapCircles);
  //     for (const circle of mapCircles) {
  //       // map!.remove(circle);
  //       circle.destroy();
  //       circle.remove();
  //     }
  //   };
  // }, []);

  return <></>;
}
