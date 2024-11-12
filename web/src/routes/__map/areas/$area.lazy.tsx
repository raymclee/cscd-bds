import * as React from "react";
import { createLazyFileRoute, useMatch } from "@tanstack/react-router";
import { useMapStore } from "~/store/map";
import { useShallow } from "zustand/shallow";

export const Route = createLazyFileRoute("/__map/areas/$area")({
  component: RouteComponent,
});

function RouteComponent() {
  const layerRef = React.useRef<AMap.DistrictLayer>();
  const [map, selectedDistrict, initMap] = useMapStore(
    useShallow((state) => [state.map, state.selectedDistrict, state.initMap])
  );
  const navigate = Route.useNavigate();

  console.log(selectedDistrict);

  React.useEffect(() => {
    if (selectedDistrict) {
      const districtLayer = new AMap.DistrictLayer.Province({
        adcode: selectedDistrict!.adcode,
        zIndex: 11,
        SOC: "CHN",
        depth: 0,
        zooms: [3, 20],
        // styles: { fill: "yellow" },
        // styles: { fill: "#fff" },
        styles: {
          fill: (props) => {
            console.log(props);
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
            }
            return "#fff";
          },
        },
      });

      initMap("map", {
        zoom: 5,
        center: selectedDistrict!.center,
        layers: [districtLayer, new AMap.TileLayer()],
        // isHotspot: false,
        // defaultCursor: "pointer",
        // viewMode: "3D",
        // pitch: 60,
      });
    }
  }, [selectedDistrict]);

  React.useEffect(() => {
    map?.on("complete", () => {
      //   const districtLayer = new AMap.DistrictLayer.Province({
      //     adcode: selectedDistrict!.adcode,
      //     zIndex: 11,
      //     SOC: "CHN",
      //     depth: 1,
      //     zooms: [3, 20],
      //     // styles: { fill: "yellow" },
      //     // styles: { fill: "#fff" },
      //   });
      //   map?.add(districtLayer);
      //   districtLayer.setMap(map);
    });
  }, [map]);

  //   React.useEffect(() => {
  //     if (selectedDistrict) {
  //       //   const disCountry = new AMap.DistrictLayer.Country({
  //       //     zIndex: 11,
  //       //     SOC: "CHN",
  //       //     depth: 1,
  //       //     zooms: [3, 20],
  //       //     // styles: {
  //       //     //   "nation-stroke": "transparent",
  //       //     //   "coastline-stroke": "transparent",
  //       //     //   "province-stroke": "transparent",
  //       //     //   "county-stroke": "transparent",
  //       //     // },
  //       //     styles: {
  //       //       "province-stroke": "cornflowerblue",
  //       //       "city-stroke": "white", // 中国地级市边界
  //       //       "county-stroke": "rgba(255,255,255,0.5)", // 中国区县边界
  //       //     },
  //       //   });

  //       map?.on("complete", () => {
  //         // layerRef.current?.setMap(map);
  //         // let zoom = 5;
  //         // switch (selectedDistrict.id) {
  //         //   case "1":
  //         //   case "2":
  //         //     zoom = 5;
  //         //     break;
  //         //   case "3":
  //         //     zoom = 6.5;
  //         //     break;
  //         //   case "4":
  //         //     zoom = 6;
  //         //     break;
  //         //   case "5":
  //         //     zoom = 11;
  //         //     break;
  //         // }
  //         // map.add(layerRef.current);
  //         // map.setLayers([layerRef.current]);

  //         const lay = new AMap.LabelsLayer({ collision: false });

  //         for (const ad of selectedDistrict?.adcode || []) {
  //           const maker = new AMap.LabelMarker({
  //             position: selectedDistrict?.center,
  //             name: ad,
  //             text: {
  //               content: ad,
  //               direction: "center",
  //               style: {
  //                 fontSize: 24,
  //                 fontWeight: "normal",
  //                 fillColor: "#eee",
  //                 strokeColor: "#88f",
  //                 strokeWidth: 2,
  //               },
  //             },
  //             innerOverlay: true,
  //           });
  //           lay.add(maker);
  //         }

  //         map?.add(lay);
  //       });

  //       return () => {
  //         map?.destroy();
  //       };
  //     }
  //   }, [selectedDistrict]);

  return (
    <>
      <div id="map" className="absolute inset-0"></div>
    </>
  );
}
