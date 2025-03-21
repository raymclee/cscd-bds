import { create } from "zustand";
import { Tender, Area, AreaConnection } from "~/graphql/graphql";
import { getDistrictColor, tenderStatusBoundColor } from "~/lib/color";
import {
  findTenderWithLevel,
  fixAmount,
  getDistrictZoomLevel,
} from "~/lib/helper";
import {
  useNavigate,
  Match,
  useLocation,
  ParsedLocation,
} from "@tanstack/react-router";
import { getDistrictZoomLevelv2 } from "~/lib/helper.v2";

const DEFAULT_CENTER = [94, 46] as [number, number];
const DEFAULT_ZOOM = 4;

type State = {
  map: AMap.Map | null;
  satelliteLayer: AMap.TileLayer | null;
  districtExplorer: any;
  areas: AreaConnection | null;
  selectedArea: Area | null;
  selectedTender: Tender | null;
  markers: AMap.Marker[];
  mapCircles: AMap.CircleMarker[];
  navigate: ReturnType<typeof useNavigate> | null;
};

type Action = {
  initMap: (
    container: HTMLDivElement,
    navigate: ReturnType<typeof useNavigate>,
    opts?: Partial<AMap.MapOptions>,
  ) => void;
  clearMap: () => void;
  resetMap: () => void;
  moveToTender: (tender: Tender) => void;
  renderAreas: (areas?: AreaConnection) => void;
  renderArea: () => void;
  renderMarker: (props: any, hidable?: boolean) => void;
  renderAdcode: (adcode: string) => void;
};

export const useMapV2StoreBase = create<State & Action>()((set, get) => ({
  map: null,
  satelliteLayer: null,
  districtExplorer: null,
  areas: null,
  selectedTender: null,
  selectedAreaNode: null,
  selectedArea: null,
  markers: [],
  mapCircles: [],
  navigate: null,
  initMap: (container, navigate, opts) => {
    const map = new AMap.Map(container, {
      mapStyle: "amap://styles/blue",
      center: DEFAULT_CENTER,
      zoom: 4,
      // zoomEnable: false,
      scrollWheel: false,
      doubleClickZoom: false,
      ...opts,
    });
    const satelliteLayer = new AMap.TileLayer.Satellite();
    // @ts-expect-error
    const districtExplorer = new AMapUI.DistrictExplorer({
      eventSupport: true,
      map: map,
      preload: [100000],
    });

    set({ map, districtExplorer, satelliteLayer, navigate });
  },
  clearMap: () => {
    const { map, satelliteLayer, markers, districtExplorer, mapCircles } =
      get();
    districtExplorer?.clearFeaturePolygons();
    districtExplorer?.setHoverFeature(null);
    map?.removeLayer(satelliteLayer!);
    map?.remove(markers);
    map?.remove(mapCircles);
  },
  resetMap: () => {
    const { map, clearMap } = get();
    clearMap();
    map?.setZoomAndCenter(DEFAULT_ZOOM, DEFAULT_CENTER);
    set({ markers: [], selectedArea: null });
  },
  moveToTender: (tender: Tender) => {
    const { map, satelliteLayer, markers, districtExplorer, clearMap } = get();
    clearMap();
    if (!tender.geoCoordinate?.coordinates) {
      return;
    }
    districtExplorer?.clearFeaturePolygons();
    districtExplorer?.setHoverFeature(null);
    // map?.removeLayer(satelliteLayer!);
    map?.remove(markers);
    map?.addLayer(satelliteLayer!);
    const [lng, lat] = tender.geoCoordinate.coordinates;
    map?.setZoomAndCenter(16, [lng, lat]);
  },
  renderAreas: () => {
    const { districtExplorer, map, markers, clearMap, areas } = get();
    clearMap();
    if (!areas || !map) {
      return;
    }

    districtExplorer.loadAreaNode(100000, (error: any, areaNode: any) => {
      if (error) {
        console.error(error);
        return;
      }

      //绘制子区域
      districtExplorer.renderSubFeatures(areaNode, function (feature: any) {
        const props = feature.properties;

        const strokeColor = getDistrictColor(props.adcode, 0);
        const fillColor = getDistrictColor(props.adcode, 0);

        return {
          cursor: "default",
          bubble: true,
          strokeColor: strokeColor, //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 1, //线宽
          fillColor: fillColor, //填充色
          fillOpacity: 0.5, //填充透明度
        };
      });

      for (const edge of areas?.edges || []) {
        if (!edge) {
          continue;
        }

        const area = edge.node;
        const amount = fixAmount(
          area?.tenders?.edges
            ?.map((e) => e?.node)
            .reduce(
              (acc, inc) =>
                inc?.estimatedAmount ? acc + inc.estimatedAmount : acc,
              0,
            ),
        );

        //@ts-expect-error
        const marker = new AMapUI.SimpleMarker({
          // @ts-expect-error
          iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
          label: {
            content: `
            <div class="flex flex-col">
              <div class="text-base font-semibold">${area?.name}</div>
              <div class="flex items-baseline gap-3 mt-1">
                <div>
                  <span style="font-size: 10px;">项目:</span>
                  <span class="ml-1 font-semibold">${area?.tenders?.edges?.length}</span>
                </div>
                ${
                  amount > 0
                    ? `<div>
                      <span style="font-size: 10px;">金额:</span>
                      <span class="mx-1 font-semibold">
                        ${`${amount}亿`}
                      </span>
                    </div>`
                    : ""
                }
              </div>
              <div></div>
            </div>
        `,
            offset: new AMap.Pixel(20, 70),
          },
          map,
          position: area?.center?.coordinates,
        });

        marker.on("click", () => {
          set({ selectedArea: area as Area });
          get().navigate?.({
            to: "/v2",
            search: (prev) => ({
              ...prev,
              a: area?.code,
            }),
          });
          // get().renderArea();
        });

        markers.push(marker);
      }
    });
    map?.setZoomAndCenter(DEFAULT_ZOOM, DEFAULT_CENTER);
    set({ markers });
  },
  renderArea: () => {
    const { districtExplorer, map, renderMarker, clearMap, selectedArea } =
      get();
    if (!selectedArea) return;

    clearMap();

    districtExplorer.loadMultiAreaNodes(
      selectedArea.provinces?.edges?.map((e) => e?.node).map((p) => p?.adcode),
      (error: any, areaNodes: any) => {
        if (error) {
          console.error(error);
          return;
        }

        for (const [i, areaNode] of areaNodes.entries()) {
          const props = areaNode.getProps();

          const fillColor = getDistrictColor(props.adcode, props.childrenNum);
          const strokeColor = getDistrictColor(props.adcode, props.childrenNum);
          renderMarker(props, true);

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

    const zoom = getDistrictZoomLevelv2(selectedArea.code);
    map?.setZoomAndCenter(
      zoom,
      selectedArea.center?.coordinates as [number, number],
      false,
      600,
    );
  },
  renderMarker: (props: any, hidable?: boolean) => {
    const { selectedArea, map } = get();

    const tendersWithinArea = selectedArea?.tenders.edges?.map((e) => e?.node);

    const adcodes = [
      ...(tendersWithinArea?.map((t) => t?.province?.adcode) || []),
      ...(tendersWithinArea?.map((t) => t?.city?.adcode) || []),
      ...(tendersWithinArea?.map((t) => t?.district?.adcode) || []),
    ].filter(Boolean);

    if (!adcodes.includes(props.adcode)) {
      return;
    }
    // tendersWithinArea?.map(t => t.)

    const tenderWithInLocation = tendersWithinArea
      ?.map((t) => {
        switch (props.level) {
          case "province":
            if (t?.province?.adcode === props.adcode) return t;
          case "city":
            if (t?.city?.adcode === props.adcode) return t;
          case "district":
            if (t?.district?.adcode === props.adcode) return t;
        }
      })
      .filter(Boolean);

    const projectCount = tenderWithInLocation?.length || 0;
    const projectAmount = fixAmount(
      tenderWithInLocation?.reduce(
        (acc, inc) => (inc?.estimatedAmount ? acc + inc?.estimatedAmount : acc),
        0,
      ),
    );

    // if (projectCount < 0) {
    //   return;
    // }
    // @ts-expect-error
    const marker = new AMapUI.SimpleMarker({
      // @ts-expect-error
      iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
      label: {
        content: `
          <div class="flex flex-col gap-1 p-0.5 text-xs shadow-2xl">
            <div class="font-medium">${props.name}(${projectCount})</div>
            ${typeof projectAmount === "number" && projectAmount > 0 ? `<div>${projectAmount}亿</div>` : ""}
          </div>
          `,
        offset: new AMap.Pixel(-50, 0),
      },
      map,
      position: props.centroid || props.center,
      extData: {
        hidable,
        adcode: props.adcode,
      },
    });

    marker.on("click", () => {
      const s: Record<string, string> = {};
      switch (props.level) {
        case "province":
          s.p = props.adcode;
          break;
        case "city":
          s.c = props.adcode;
          break;
        case "district":
          s.d = props.adcode;
          break;
      }
      get().navigate?.({
        to: "/v2",
        search: (prev) => ({
          ...prev,
          ...s,
        }),
      });
    });
    marker.on("mouseover", () => {
      marker.setOptions({ zIndex: 13 });
    });
    marker.on("mouseout", () => {
      marker.setOptions({ zIndex: 12 });
    });
    set((s) => ({ markers: [...s.markers, marker] }));
  },
  renderAdcode(adcode) {
    const {
      renderMarker,
      districtExplorer,
      map,
      clearMap,
      satelliteLayer,
      selectedArea,
    } = get();
    if (!map) {
      return;
    }
    clearMap();
    // const area = areas?.find((d) =>
    //   d?.provinces?.edges
    //     ?.map((e) => e?.node)
    //     .map((p) => p?.adcode)
    //     .includes(props.adcode),
    // ) as Area;
    // if (area) {
    //   useMapStore.setState({ selectedArea: area });
    // }
    // useMapStore.getState().push({ name: props.name, adcode: props.adcode });
    // onFeatureOrMarkerClick(props);
    districtExplorer.loadAreaNode(adcode, (error: any, areaNode: any) => {
      if (error) {
        console.error(error);
        return;
      }
      districtExplorer.renderSubFeatures(
        areaNode,
        function (feature: any, i: number) {
          const props = feature.properties;

          // if (!topLevel) {
          renderMarker(props, true);
          // }

          const colorIndex = i;
          const strokeColor = getDistrictColor(
            feature.properties.adcode,
            colorIndex,
          );
          const fillColor = getDistrictColor(
            feature.properties.adcode,
            colorIndex,
          );

          return {
            cursor: "default",
            bubble: true,
            strokeColor: strokeColor, //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            fillColor: fillColor, //填充色
            fillOpacity: 0.5, //填充透明度
          };
        },
      );

      const areaProps = areaNode.getProps();
      if (areaProps.level === "district") {
        map?.addLayer(satelliteLayer!);

        const tenders =
          selectedArea?.tenders.edges
            ?.map((e) => e?.node)
            .filter((t) => t?.district?.adcode === areaProps.adcode) || [];

        const mapCircles: AMap.CircleMarker[] = [];

        for (const [i, tender] of tenders.entries()) {
          if (tender?.geoBounds) {
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
                <div id="marker-${tender.id}" class="w-[10rem] rounded-lg px-1 py-0.5 line-clamp-2">
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
            label.on("click", () => {
              // useMapStore.setState({
              //   tenderListHovering: i,
              //   selectedTender: tender,
              //   tenderListVisible: false,
              // });
            });
            label.on("mouseover", () => {
              label.setOptions({ zIndex: 13 });
              // useMapStore.setState({
              //   tenderListHovering: i,
              // });
            });
            label.on("mouseout", () => {
              label.setOptions({ zIndex: 12 });
            });
            // mapCircles.push(polygon);
            mapCircles.push(label);
          } else if (tender?.geoCoordinate?.coordinates) {
            const offsetY = tender.name && tender.name?.length > 10 ? -20 : -10;
            // @ts-expect-error
            const label = new AMapUI.SimpleMarker({
              // @ts-expect-error
              iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
              label: {
                content: `
                <div id="marker-${tender.id}" class="w-[10rem] rounded-lg px-1 py-0.5 line-clamp-2">
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
            label.on("click", () => {
              // useMapStore.setState({
              //   tenderListHovering: i,
              //   selectedTender: tender,
              //   tenderListVisible: false,
              // });
            });
            label.on("mouseover", () => {
              label.setOptions({ zIndex: 13 });
              // useMapStore.setState({
              //   tenderListHovering: i,
              // });
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
            // map?.add(circleMarker);
          }
        }

        for (const circle of mapCircles) {
          map?.add(circle);
        }

        if (mapCircles) set({ mapCircles });
      }

      map?.setBounds(areaNode.getBounds(), false, [140, 0, 20, 20]);
    });
  },
}));
