import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMapStore } from "~/store/map";
import { useShallow } from "zustand/shallow";
import { IconLoading } from "@arco-design/web-react/icon";
import csv from "~/10w.txt?raw";

export const Route = createLazyFileRoute("/__map/3")({
  component: RouteComponent,
});

function RouteComponent() {
  const [loading, setLoading] = React.useState(true);
  const [map, initMap] = useMapStore(
    useShallow((state) => [state.map, state.initMap])
  );

  React.useEffect(() => {
    initMap("map", {
      zoom: 4,
    });
  }, []);

  React.useEffect(() => {
    map?.on("complete", () => {
      var distCluster = new AMapUI.DistrictCluster({
        map: map, //所属的地图实例
        zIndex: 12,
        //排除3个省
        // excludedAdcodes: [130000, 610000, 340000],
        autoSetFitView: true,
        getPosition: function (item) {
          if (!item) {
            return null;
          }

          var parts = item.split(",");

          //   //返回经纬度
          return [parseFloat(parts[0]), parseFloat(parts[1])];
          //   return item;
        },
      });

      distCluster.setData(csv.split("\n"));

      //   distCluster.setData([
      //     [114.434623, 22.801886],
      //     [112.702588, 22.00886],
      //   ]);
    });
  }, [map]);
  return (
    <>
      <div id="map" className="absolute inset-0"></div>
      {/* {loading && (
        <div className="loading">
          <IconLoading style={{ height: 56, width: 56, color: "white" }} />
        </div>
      )} */}
    </>
  );
}
