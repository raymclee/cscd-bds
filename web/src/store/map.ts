import { create } from "zustand";

type MapState = {
  map: AMap.Map | null;
  initMap: (container: string, opts?: Partial<AMap.MapOptions>) => void;
  onDistrictClick: (e: any) => void;
};

export const useMapStore = create<MapState>()((set) => ({
  map: null,
  initMap: (container, opts?: Partial<AMap.MapOptions>) => {
    const map = new AMap.Map(container, { ...opts });
    map?.on("complete", (e) => {
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
          innerOverlay: true,
        });
        marker.on("click", (e) => {
          console.log(e);
        });
        layer.add(marker);
      }
      map.add(layer);
    });
    set({ map });
  },
  onDistrictClick: (e) => {
    console.log(e);
  },
}));

const districts = [
  {
    citycode: [],
    adcode: "440000",
    name: "西部地区",
    center: [90.986153, 36.876121],
    level: "province",
    districts: [],
  },
  {
    citycode: [],
    adcode: "440000",
    name: "华北地区",
    center: [116.136142, 42.021244],
    level: "province",
    districts: [],
  },
  {
    citycode: [],
    adcode: "440000",
    name: "华东地区",
    center: [119.008879, 32.688899],
    level: "province",
    districts: [],
  },
  {
    citycode: [],
    adcode: "440000",
    name: "华南地区",
    center: [112.186512, 28.03419],
    level: "province",
    districts: [],
  },
  {
    citycode: [],
    adcode: "440000",
    name: "港澳地区",
    center: [114.183583, 22.385247],
    level: "province",
    districts: [],
  },
];
