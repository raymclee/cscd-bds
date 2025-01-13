import { create } from "zustand";
import { Area, Maybe, Plot, Tender } from "~/graphql/graphql";
import { getDistrictColor, tenderStatusBoundColor } from "~/lib/color";

type Navigation = {
  name: string;
  adcode?: number;
};

type TenderStatus = {
  status: string;
  value: number;
};

type MapState = {
  map: AMap.Map | null;
  // selectedDistrict: Area | null;
  selectedArea: Area | null;
  // districts: District[];
  markers: AMap.Marker[];
  currentAreaNode: any | null;
  satelliteLayer: AMap.TileLayer | null;
  districtExplorer: any;
  polygonEditor: AMap.PolygonEditor | null;
  navigations: Navigation[];
  dashboardVisible: boolean;
  tenderListVisible: boolean;
  tenderList: (Maybe<Tender> | undefined)[];
  tenderListHovering: string | number | null;
  selectedTender: Partial<Tender> | null;
  selectedTenderStatus: TenderStatus | null;
  mapCircles: AMap.CircleMarker[] | AMap.Polygon[];
  tenderViewTender: Tender | null;
  moreNewTenderBoardVisible: boolean;
  moreTenderTypeBoardVisible: boolean;
  moreRankingListBoardVisible: boolean;
  moreDashboardTenderListBoardVisible: boolean;
};

type Action = {
  initMap: (container: string, opts: Partial<AMap.MapOptions>) => void;
  setCurrentAreaNode: (node: any) => void;
  resetNavigation: () => void;
  // setSelectedDistrict: (district: Area | null) => void;
  setSelectedArea: (area: Area | null) => void;
  setDashboardVisible: (visible: boolean) => void;
  pop: (i: number) => void;
  push: (navigation: Navigation) => void;
  setPolygonEditor: (editor: AMap.PolygonEditor) => void;
  renderArea: (district: Area) => void;
  renderAreas: () => void;
  renderMarker: (props: any) => void;
  addMarker: (marker: AMap.Marker) => void;
  onFeatureOrMarkerClick: (props: any) => void;
  setTenderListVisible: (visible: boolean) => void;
  setTenderList: (tenders: (Maybe<Tender> | undefined)[]) => void;
  setTenderListHovering: (tenderId: string | number | null) => void;
  setSelectedTender: (tender: Partial<Tender> | null) => void;
  navigateToTender: (tender: Tender, plots: Partial<Plot>[]) => void;
};

export const useMapStore = create<MapState & Action>()((set, get) => ({
  map: null,
  dashboardVisible: true,
  satelliteLayer: null,
  districtExplorer: null,
  polygonEditor: null,
  currentAreaNode: null,
  markers: [],
  mapCircles: [],
  navigations: [],
  breadcrumb: [],
  selectedArea: null,
  tenderListVisible: false,
  tenderList: [],
  tenderListHovering: 0,
  selectedTender: null,
  tenderViewTender: null,
  selectedTenderStatus: null,
  moreNewTenderBoardVisible: false,
  moreTenderTypeBoardVisible: false,
  moreRankingListBoardVisible: false,
  moreDashboardTenderListBoardVisible: false,
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

  renderAreas() {
    // const { districts, renderArea } = get();
    // renderArea({ adcode: [100000] });
  },
  renderArea(area) {
    set({ dashboardVisible: false });
    const map = get().map;
    map?.remove(get().markers);

    const districtExplorer = get().districtExplorer;
    districtExplorer.clearFeaturePolygons();
    districtExplorer.loadMultiAreaNodes(
      area.provinces?.edges?.map((e) => e?.node).map((p) => p?.adcode),
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
    //       <div class="mb-1 font-medium">${props.name}</div>
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
      return { markers: [...state.markers, marker] };
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
  navigateToTender(tender, plots) {
    const { map, districtExplorer, satelliteLayer, markers } = get();

    set({
      moreDashboardTenderListBoardVisible: false,
    });

    for (const marker of markers) {
      marker.remove();
    }

    districtExplorer.clearFeaturePolygons();

    const mapCircles: AMap.CircleMarker[] | any[] | AMap.Polygon[] = [];

    for (const plot of plots) {
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
          offset: new AMap.Pixel(-100, 30),
        },
        position: polygon.getBounds()?.getCenter(),
      });

      mapCircles.push(polygon);
      mapCircles.push(label);
    }

    if (tender.geoBounds) {
      const polygon = new AMap.Polygon();
      polygon.setOptions({
        fillColor: tenderStatusBoundColor(tender!),
        strokeColor: tenderStatusBoundColor(tender!),
        fillOpacity: 0.35,
        strokeWeight: 2,
      });
      polygon.setPath(tender.geoBounds as AMap.LngLatLike[]);
      const pBounds = polygon.getBounds();
      const offsetY = tender.name && tender.name?.length > 10 ? -20 : -10;
      // @ts-expect-error
      const label = new AMapUI.SimpleMarker({
        // @ts-expect-error
        iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
        label: {
          content: `
          <div class="w-[10rem] rounded-lg px-1 py-0.5 line-clamp-2">
            <div class="text-sm font-medium text-center text-wrap">${tender.name}</div>
          </div>
          `,
          offset: new AMap.Pixel(-80, offsetY),
        },
        map,
        position: pBounds?.getCenter(),
        extData: {
          tenderId: tender.id,
        },
      });

      label.on("mouseover", () => {
        label.setOptions({ zIndex: 13 });
      });
      label.on("mouseout", () => {
        label.setOptions({ zIndex: 12 });
      });
      mapCircles.push(polygon);
      mapCircles.push(label);
    } else if (tender.geoCoordinate?.coordinates) {
      const offsetY = tender.name && tender.name?.length > 10 ? -20 : -10;
      // @ts-expect-error
      const label = new AMapUI.SimpleMarker({
        // @ts-expect-error
        iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
        label: {
          content: `
          <div class="w-[10rem] rounded-lg px-1 py-0.5 line-clamp-2">
            <div class="text-sm font-medium text-center text-wrap">${tender.name}</div>
          </div>
          `,
          offset: new AMap.Pixel(-80, offsetY),
        },
        map,
        position: new AMap.LngLat(
          tender.geoCoordinate?.coordinates[0],
          tender.geoCoordinate?.coordinates[1],
        ),
        extData: {
          tenderId: tender.id,
        },
      });

      label.on("mouseover", () => {
        label.setOptions({ zIndex: 13 });
      });
      label.on("mouseout", () => {
        label.setOptions({ zIndex: 12 });
      });

      const circleMarker = new AMap.CircleMarker({
        center: new AMap.LngLat(
          tender.geoCoordinate?.coordinates[0],
          tender.geoCoordinate?.coordinates[1],
        ),
        radius: 20 + Math.random() * 10, //3D视图下，CircleMarker半径不要超过64px
        fillColor: tenderStatusBoundColor(tender!),
        strokeColor: tenderStatusBoundColor(tender!),
        fillOpacity: 0.35,
        strokeWeight: 2,
        strokeOpacity: 1,
        zIndex: 15,
        bubble: true,
        cursor: "pointer",
      });
      mapCircles.push(circleMarker);
      mapCircles.push(label);
    }

    for (const circle of mapCircles) {
      map?.add(circle);
    }

    map?.addLayer(satelliteLayer!);
    if (tender.geoBounds?.length) {
      map?.setFitView(tender.geoBounds as any[]);
    } else if (tender.geoCoordinate?.coordinates) {
      map?.setZoomAndCenter(14, [
        tender.geoCoordinate.coordinates[0],
        tender.geoCoordinate.coordinates[1],
      ]);
    }

    set({
      mapCircles,
      selectedArea: tender.area,
      dashboardVisible: false,
      tenderListVisible: false,
      tenderViewTender: tender,
      selectedTender: tender,
      navigations: [],
    });
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
