import * as React from "react";
import { createLazyFileRoute, useMatch } from "@tanstack/react-router";
import { useMapStore } from "~/store/map";
import { useShallow } from "zustand/shallow";
import { DistrictSelect } from "~/components/district-select";
import { i } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

export const Route = createLazyFileRoute("/__map/areas/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [map, districts, initMap, selectDistrict] = useMapStore(
    useShallow((state) => [
      state.map,
      state.districts,
      state.initMap,
      state.selectDistrict,
    ])
  );
  const navigate = Route.useNavigate();

  React.useEffect(() => {
    initMap("map", {
      center: [106.122082, 33.719192],
      zoom: 4.5,
    });
  }, []);

  React.useEffect(() => {
    map?.on("complete", () => {
      const disCountry = new AMap.DistrictLayer.Country({
        zIndex: 11,
        SOC: "CHN",
        depth: 1,
        zooms: [3, 20],
        styles: {
          // "nation-stroke": "#d0f5ce",
          // "coastline-stroke": "#d0f5ce",
          // "province-stroke": "#d0f5ce",
          // "county-stroke": "#d0f5ce",
          // @ts-expect-error
          fill: (props: { adcode_pro: number }) => {
            switch (props.adcode_pro) {
              case 540000: //西藏
              case 650000: //新疆
              case 620000: // 甘肃
              case 630000: //青海
              case 510000: //四川
              case 530000: //云南
              case 640000: //宁夏
              case 610000: //陕西
              case 500000: //重庆
              case 520000: //貴州
                return "#d0f5ce";
              //華北
              case 150000: //内蒙古
              case 230000: //黑龙江
              case 220000: //吉林
              case 210000: //辽宁
              case 110000: //北京
              case 130000: //河北
              case 140000: //山西
              case 120000: //天津
              case 370000: //山东
                return "#efe6fe";
              //華東
              case 320000: //江苏
              case 310000: //上海
              case 340000: //安徽
              case 330000: //浙江
              case 410000: //河南
                return "#e0e9ff";
              //華南
              case 430000: //湖南
              case 350000: //福建
              case 440000: //广东
              case 450000: //广西
              case 360000: //江西
              case 420000: //湖北
              case 460000: //海南
              case 710000: //台湾
                return "#fee3e2";
              case 810000: //香港
              case 820000: //澳门
                return "#fee7cd";
              default:
                return "transparent";
            }
          },
        },
      });
      // map.add(disCountry);
      disCountry.setMap(map);

      const layer = new AMap.LabelsLayer({
        // 开启标注避让，默认为开启，v1.4.15 新增属性
        collision: false,
        // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
      });
      for (const district of districts) {
        const marker = new AMap.LabelMarker({
          position: district.center as [number, number],
          name: district.name,
          zooms: [0, 4.8],
          zIndex: 1,
          opacity: 1,
          text: {
            content: district.name,
            direction: "center",
            style: {
              fontSize: 24,
              fontWeight: "normal",
              fillColor: "#eee",
              strokeColor: "#88f",
              strokeWidth: 2,
            },
          },
          rank: 1,
          innerOverlay: true,
          extData: {
            id: district.id,
          },
        });
        marker.on("click", (e) => {
          navigate({ to: "/areas/$area", params: { area: district.id } });
          selectDistrict(district);
        });
        marker.on("mouseover", function (e) {
          console.log(e.target.getExtData());
        });
        // @ts-expect-error
        layer.add(marker);
      }
      // map.add(layer);
      layer.setMap(map);

      // map?.setZoomAndCenter(4, [106.122082, 33.719192], false, 600);

      // AMap.Util.requestAnimFrame(map);
    });

    return () => {
      map?.destroy();
    };
  }, [map]);

  return (
    <>
      <div id="map" className="absolute inset-0"></div>

      <DistrictSelect className="absolute top-6 left-6" />
    </>
  );
}
