import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { atom, useAtom, useAtomValue } from "jotai";
import { useMapStore } from "~/store/map";
import { getDistrictColor } from "~/lib/color";

export const Route = createLazyFileRoute("/__map/6")({
  component: RouteComponent,
});

const mapOptionsAtom = atom<AMap.MapOptions>();
const mapAtom = atom<AMap.Map | null>((get) => {
  const mapOptions = get(mapOptionsAtom);
  if (!mapOptions) {
    return null;
  }
  const map = new AMap.Map("map", mapOptions);
  return map;
});

const districtExplorerAtom = atom<any>(
  (get) =>
    new AMapUI.DistrictExplorer({
      eventSupport: true, //打开事件支持
      map: get(mapAtom),
      preload: [100000],
    })
);

function RouteComponent() {
  const [mapOptions, setMapOptions] = useAtom(mapOptionsAtom);
  const [map, setMap] = useAtom(mapAtom);
  //   const districtExplorer = useAtomValue(districtExplorerAtom);
  const districts = useMapStore((s) => s.districts);

  console.log(districts.flatMap((d) => d.adcode));

  React.useEffect(() => {
    setMapOptions({ zoom: 4, center: [116.397428, 39.90923] });
  }, []);

  React.useEffect(() => {
    // districtExplorer.loadAreaNode(100000, (err, areaNode) => {
    //   console.log(areaNode);
    // });

    const districtExplorer = new AMapUI.DistrictExplorer({
      eventSupport: true, //打开事件支持
      map: map,
      preload: [100000],
    });

    console.log(districtExplorer);
    districtExplorer.loadMultiAreaNodes(
      districts.flatMap((d) => d.adcode),
      (err, areaNodes) => {
        console.log(err);
        console.log(areaNodes);
        districtExplorer.clearFeaturePolygons();

        for (const [i, areaNode] of areaNodes.entries()) {
          //   districtExplorer.renderSubFeatures(areaNode, (feature, i) => {
          //     // console.log(feature);
          //     // console.log(i);
          //     const fillColor = getDistrictColor(feature.properties.adcode, i);
          //     const strokeColor = getDistrictColor(feature.properties.adcode, i);
          //     return {
          //       cursor: "default",
          //       bubble: true,
          //       strokeColor: strokeColor, //线颜色
          //       strokeOpacity: 1, //线透明度
          //       strokeWeight: 1, //线宽
          //       fillColor: fillColor, //填充色
          //       fillOpacity: 0.35, //填充透明度
          //     };
          //   });

          const props = areaNode.getProps();

          const fillColor = getDistrictColor(props.adcode, i);
          const strokeColor = getDistrictColor(props.adcode, i);

          districtExplorer.renderParentFeature(areaNode, {
            cursor: "default",
            bubble: true,
            strokeColor,
            // strokeColor: areaNode.getSubFeatures().length ? "black" : "white", //线颜色
            // strokeColor: areaNode.getSubFeatures().length ? "black" : "", //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            // fillColor: "", //填充色
            fillColor,
            //   fillColor: "black",
            //   fillColor: areaNode.getParentFeature() ? "black" : null,
            fillOpacity: 0.35, //填充透明度
          });
        }
      }
    );
  }, [map]);

  return (
    <>
      <div id="map" className="absolute inset-0"></div>
    </>
  );
}
