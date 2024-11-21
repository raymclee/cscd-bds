import { create } from "zustand";
import { Area as GraphqlArea, Tender } from "~/graphql/graphql";
import { getDistrictColor } from "~/lib/color";

// export type District = {
//   id: string;
//   citycode: string[];
//   adcode: number[];
//   name: string;
//   center: [number, number];
//   level: string;
//   districts: District[];
// };

// const districts: District[] = [
//   {
//     id: "1",
//     citycode: [],
//     adcode: [
//       540000, 650000, 620000, 630000, 510000, 530000, 640000, 610000, 500000,
//       520000,
//     ],
//     name: "西部地区",
//     center: [90.986153, 36.876121],
//     level: "province",
//     districts: [],
//   },
//   {
//     id: "2",
//     citycode: [],
//     adcode: [
//       150000, 230000, 220000, 210000, 110000, 130000, 140000, 120000, 370000,
//     ],
//     name: "华北地区",
//     center: [116.136142, 42.021244],
//     level: "province",
//     districts: [],
//   },
//   {
//     id: "3",
//     citycode: [],
//     adcode: [320000, 310000, 340000, 330000, 410000],
//     name: "华东地区",
//     center: [119.008879, 32.688899],
//     level: "province",
//     districts: [],
//   },
//   {
//     id: "4",
//     citycode: [],
//     adcode: [430000, 350000, 440000, 450000, 360000, 420000, 460000, 710000],
//     name: "华南地区",
//     center: [112.186512, 28.03419],
//     level: "province",
//     districts: [],
//   },
//   {
//     id: "5",
//     citycode: [],
//     adcode: [810000, 820000],
//     name: "港澳地区",
//     center: [114.183583, 22.385247],
//     level: "province",
//     districts: [],
//   },
// ];

// export type Area = {
//   id: string;
//   name: string;
//   adcode: number;
//   center: {
//     coordinates: readonly number[];
//   };
//   provinces: {
//     id: string;
//     name: string;
//     adcode: number;
//     center: {
//       coordinates: readonly number[];
//     };
//   };
// };

type Navigation = {
  name: string;
  adcode?: number;
};

export type StoreArea = Pick<
  GraphqlArea,
  "id" | "name" | "center" | "provinces" | "tenders" | "code"
>;

type MapState = {
  map: AMap.Map | null;
  // selectedDistrict: Area | null;
  selectedArea: StoreArea | null;
  // districts: District[];
  makers: AMap.Marker[];
  currentAreaNode: any | null;
  satelliteLayer: AMap.TileLayer | null;
  districtExplorer: any;
  polygonEditor: AMap.PolygonEditor | null;
  navigations: Navigation[];
  dashboardVisible: boolean;
  tenderListVisible: boolean;
  tenderList: Array<Partial<Tender>>;
  tenderListHovering: string | number;
  selectedTender: Partial<Tender> | null;
  mapCircles: AMap.CircleMarker[];
};

type Action = {
  initMap: (container: string, opts: Partial<AMap.MapOptions>) => void;
  setCurrentAreaNode: (node: any) => void;
  resetNavigation: () => void;
  // setSelectedDistrict: (district: Area | null) => void;
  setSelectedArea: (area: StoreArea | null) => void;
  setDashboardVisible: (visible: boolean) => void;
  pop: (i: number) => void;
  push: (navigation: Navigation) => void;
  switch2AreaNode: (adcode: number) => void;
  setPolygonEditor: (editor: AMap.PolygonEditor) => void;
  renderArea: (district: StoreArea) => void;
  renderAreas: () => void;
  renderMarker: (props: any) => void;
  addMarker: (marker: AMap.Marker) => void;
  onFeatureOrMarkerClick: (props: any) => void;
  setTenderListVisible: (visible: boolean) => void;
  setTenderList: (tenders: Array<Partial<Tender>>) => void;
  setTenderListHovering: (tenderId: string | number) => void;
  setSelectedTender: (tender: Partial<Tender> | null) => void;
  // navigate:
};

export const useMapStore = create<MapState & Action>()((set, get) => ({
  map: null,
  dashboardVisible: true,
  satelliteLayer: null,
  districtExplorer: null,
  polygonEditor: null,
  currentAreaNode: null,
  makers: [],
  mapCircles: [],
  navigations: [],
  breadcrumb: [],
  selectedArea: null,
  tenderListVisible: false,
  tenderList: [],
  tenderListHovering: 0,
  selectedTender: null,
  // districts,
  initMap: (container, opts) => {
    const map = new AMap.Map(container, { ...opts });
    const satelliteLayer = new AMap.TileLayer.Satellite();
    // @ts-expect-error
    const districtExplorer = new AMapUI.DistrictExplorer({
      eventSupport: true,
      map: map,
      preload: [100000],
    });
    set({ map, districtExplorer, satelliteLayer });
  },
  setDashboardVisible: (visible) => {
    set({ dashboardVisible: visible });
  },
  setSelectedArea: (area) => {
    if (!area) {
      set({ selectedArea: null });
      return;
    }
    set({
      selectedArea: area,
      navigations: [{ name: area?.name }],
    });
  },
  setCurrentAreaNode: (node) => {
    set({ currentAreaNode: node });
  },
  resetNavigation: () => {
    set({ navigations: [] });
  },
  push: (navigation) => {
    set((state) => {
      if (state.navigations.some((item) => item.name === navigation.name)) {
        return state;
      }
      return { navigations: [...state.navigations, navigation] };
    });
  },
  pop: (i) => {
    set((state) => {
      const navigations = state.navigations.reduce<Navigation[]>(
        (acc, cur, idx) => {
          if (idx <= i) {
            acc.push(cur);
          }
          return acc;
        },
        [],
      );
      for (const circle of state.mapCircles) {
        circle.remove();
      }
      return {
        navigations,
        mapCircles: [],
      };
    });
  },
  setPolygonEditor: (editor) => {
    set({ polygonEditor: editor });
  },
  switch2AreaNode(adcode) {
    const { districtExplorer, map, satelliteLayer, makers } = get();
    map?.removeLayer(satelliteLayer!);
    map?.remove(makers);

    districtExplorer.loadAreaNode(adcode, (error: any, areaNode: any) => {
      if (error) {
        console.error(error);
        return;
      }

      set({ currentAreaNode: areaNode });
      districtExplorer.setAreaNodesForLocating([areaNode]);
      districtExplorer.setHoverFeature(null);

      const bounds = areaNode.getBounds();
      map?.setBounds(bounds, false, [140, 0, 20, 20]);

      districtExplorer.clearFeaturePolygons();

      districtExplorer.renderSubFeatures(
        areaNode,
        (feature: any, i: number) => {
          const props = feature.properties;

          // if (!topLevel) {
          //   renderMarker(props);
          // }

          // const colorIndex = topLevel ? 0 : i;
          // const strokeColor = getDistrictColor(
          //   feature.properties.adcode,
          //   colorIndex,
          // );
          // const fillColor = getDistrictColor(
          //   feature.properties.adcode,
          //   colorIndex,
          // );
          const strokeColor = "#3cb8e6";
          const fillColor = "#3cb8e6";

          return {
            cursor: "default",
            bubble: true,
            strokeColor: strokeColor, //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            fillColor: fillColor, //填充色
            fillOpacity: 0.35, //填充透明度
          };
        },
      );

      const props = areaNode.getProps();

      if (props.adcode !== 100000) {
        get().push({ name: props.name, adcode: props.adcode });
      }

      //绘制父区域;
      districtExplorer.renderParentFeature(areaNode, {
        cursor: "default",
        bubble: true,
        // strokeColor: "white", //线颜色
        strokeColor:
          props.adcode !== 100000 && areaNode.getSubFeatures().length
            ? ""
            : "#3cb8e6", //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 2, //线宽
        // fillColor, //填充色
        fillColor: "",
        //   fillColor: "black",
        //   fillColor: areaNode.getParentFeature() ? "black" : null,
        fillOpacity: 0.35, //填充透明度
      });
    });
  },
  renderAreas() {
    // const { districts, renderArea } = get();
    // renderArea({ adcode: [100000] });
  },
  renderArea(area) {
    set({ dashboardVisible: false });
    const map = get().map;
    map?.remove(get().makers);

    const districtExplorer = get().districtExplorer;
    districtExplorer.clearFeaturePolygons();
    districtExplorer.loadMultiAreaNodes(
      area.provinces?.map((p) => p.adcode),
      (error: any, areaNodes: any) => {
        if (error) {
          console.error(error);
          return;
        }

        for (const areaNode of areaNodes) {
          const props = areaNode.getProps();

          get().renderMarker(props);

          const fillColor = getDistrictColor(props.adcode, props.childrenNum);
          const strokeColor = getDistrictColor(props.adcode, props.childrenNum);
          districtExplorer.renderParentFeature(areaNode, {
            cursor: "default",
            bubble: true,
            strokeColor,
            // strokeColor: areaNode.getSubFeatures().length
            //   ? ""
            //   : "#3cb8e6", //线颜色
            // strokeColor: areaNode.getSubFeatures().length ? "black" : "", //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            // fillColor: "", //填充色
            fillColor,
            //   fillColor: "black",
            //   fillColor: areaNode.getParentFeature() ? "black" : null,
            fillOpacity: 0.5, //填充透明度
          });
        }
      },
    );

    const zoom = getDistrictZoomLevel(area.code);
    map?.setZoomAndCenter(
      zoom,
      area.center?.coordinates as [number, number],
      false,
      600,
    );
  },
  renderMarker(props) {
    // if (props.adcode === get().currentAreaNode?.adcode) {
    //   return;
    // }
    // const big = props.adcode === 100000;
    // // @ts-expect-error
    // const marker = new AMapUI.SimpleMarker({
    //   // @ts-expect-error
    //   iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
    //   label: {
    //     content: `
    //     <div class="flex flex-col">
    //       <div class="font-medium mb-1">${props.name}</div>
    //       <div class="flex items-baseline gap-2">
    //         <div>
    //           项目数量:<span class="ml-1 font-bold">${Math.floor(Math.random() * 100)}</span>
    //         </div>
    //         <div>
    //           金额:<span class="mx-1 font-bold">${Math.floor(Math.random() * 1000)}亿</span>
    //         </div>
    //       </div>
    //       <div></div>
    //     </div>
    //     `,
    //     offset: new AMap.Pixel(-50, 0),
    //   },
    //   map: get().map,
    //   position: props.center,
    // });
    // marker.on("click", () => {
    //   const district = districts.find((d) => d.adcode.includes(props.adcode));
    //   if (district) {
    //     set({ selectedDistrict: district });
    //   }
    //   get().push({ name: props.name, adcode: props.adcode });
    //   get().onFeatureOrMarkerClick(props);
    // });
    // marker.on("mouseover", () => {
    //   marker.setOptions({ zIndex: 13 });
    // });
    // marker.on("mouseout", () => {
    //   marker.setOptions({ zIndex: 12 });
    // });
  },
  onFeatureOrMarkerClick(props) {},
  addMarker(marker) {
    set((state) => {
      return { makers: [...state.makers, marker] };
    });
  },
  setTenderListVisible(visible) {
    set({ tenderListVisible: visible });
  },
  setTenderList(tenders) {
    set({ tenderList: tenders });
  },
  setTenderListHovering(hovering) {
    set({ tenderListHovering: hovering });
  },
  setSelectedTender(tender) {
    set({ selectedTender: tender });
  },
}));

function getDistrictZoomLevel(code: string) {
  let zoom = 5;
  if (code === "GA") {
    zoom = 10;
  } else if (code === "HD" || code === "HN") {
    zoom = 6;
  }
  return zoom;
}
