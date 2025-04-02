import { useNavigate } from "@tanstack/react-router";
import { AmapPageQuery } from "__generated__/AmapPageQuery.graphql";
import { mapv2DistrictsQuery } from "__generated__/mapv2DistrictsQuery.graphql";
import { Environment, fetchQuery, graphql } from "relay-runtime";
import { create } from "zustand";
import { Area, AreaConnection, Tender } from "~/graphql/graphql";
import { getDistrictColor, tenderStatusBoundColor } from "~/lib/color";
import { fixAmount } from "~/lib/helper";
import { getDistrictZoomLevelv2 } from "~/lib/helper.v2";

const DEFAULT_CENTER = [94, 46] as [number, number];
const DEFAULT_ZOOM = 4;

type State = {
  map: AMap.Map | null;
  relayEnvironment: Environment | null;
  satelliteLayer: AMap.TileLayer | null;
  districtExplorer: any;
  areas: AreaConnection | null;
  selectedArea: Area | null;
  selectedTender: Tender | null;
  markers: AMap.Marker[];
  mapCircles: AMap.CircleMarker[] | AMap.Polygon[];
  navigate: ReturnType<typeof useNavigate> | null;
};

type Action = {
  initMap: (
    container: HTMLDivElement,
    navigate: ReturnType<typeof useNavigate>,
    relayEnvironment: Environment,
    opts?: Partial<AMap.MapOptions>,
  ) => void;
  clearMap: () => void;
  renderAreas: (areas?: AreaConnection) => void;
  renderArea: () => void;
  renderMarker: (props: any, hidable?: boolean) => void;
  renderAdcode: (adcode: string) => void;
  getMarker: (tenderId: string) => AMap.CircleMarker | AMap.Polygon | undefined;
};

export const districtsQuery = graphql`
  query mapv2DistrictsQuery($adcode: Int!) {
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

export const useMapV2StoreBase = create<State & Action>()((set, get) => ({
  map: null,
  relayEnvironment: null,
  satelliteLayer: null,
  districtExplorer: null,
  areas: null,
  selectedTender: null,
  selectedAreaNode: null,
  selectedArea: null,
  markers: [],
  mapCircles: [],
  navigate: null,
  initMap: (container, navigate, relayEnvironment, opts) => {
    const map = new AMap.Map(container, {
      mapStyle: "amap://styles/blue",
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      // zoomEnable: false,
      // scrollWheel: false,
      // doubleClickZoom: false,
      ...opts,
    });
    const satelliteLayer = new AMap.TileLayer.Satellite();
    // @ts-expect-error
    const districtExplorer = new AMapUI.DistrictExplorer({
      eventSupport: true,
      map: map,
      preload: [100000],
    });

    set({ map, districtExplorer, satelliteLayer, navigate, relayEnvironment });
  },
  clearMap: () => {
    const { map, satelliteLayer, markers, districtExplorer, mapCircles } =
      get();
    districtExplorer?.clearFeaturePolygons();
    districtExplorer?.setHoverFeature(null);
    map?.removeLayer(satelliteLayer!);
    map?.remove(markers);
    map?.remove(mapCircles);
    set({ markers: [], mapCircles: [] });
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

      for (const [i, edge] of (areas?.edges || []).entries()) {
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

        const areaOfficeMap = {
          HD: new AMap.Pixel(-90, 10),
          HN: new AMap.Pixel(-180, 10),
          XB: new AMap.Pixel(-100, 40),
          HB: new AMap.Pixel(-100, 90),
          GA: new AMap.Pixel(-80, 30),
        };

        //@ts-expect-error
        const marker = new AMapUI.SimpleMarker({
          // @ts-expect-error
          iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
          label: {
            content: `
            <div class="relative flex flex-col p-2 overflow-hidden border rounded-lg shadow-lg backdrop-blur-sm bg-sky-950 border-blue-500/30 group">
           
              
              <!-- Corner borders - top left -->
              <div class="group-hover:bg-corner-border-glow absolute left-0 top-0 h-[2px] w-6 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
              <div class="group-hover:bg-corner-border-glow absolute left-0 top-0 h-6 w-[2px] bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
              
              <!-- Corner borders - top right -->
              <div class="group-hover:bg-corner-border-glow absolute right-0 top-0 h-[2px] w-6 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
              <div class="group-hover:bg-corner-border-glow absolute right-0 top-0 h-6 w-[2px] bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
              
              <!-- Corner borders - bottom left -->
              <div class="group-hover:bg-corner-border-glow absolute bottom-0 left-0 h-[2px] w-6 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
              <div class="group-hover:bg-corner-border-glow absolute bottom-0 left-0 h-6 w-[2px] bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
              
              <!-- Corner borders - bottom right -->
              <div class="group-hover:bg-corner-border-glow absolute bottom-0 right-0 h-[2px] w-6 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
              <div class="group-hover:bg-corner-border-glow absolute bottom-0 right-0 h-6 w-[2px] bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
              
              <div class="relative z-20">
                <div class="text-base font-semibold transition-all duration-300 group-hover:text-shadow-glow group-hover:text-blue-200">${area?.name}</div>
                <div class="flex items-baseline gap-3 mt-1">
                  <div class="relative">
                    <span style="font-size: 10px;" class="text-blue-300">项目:</span>
                    <span class="font-semibold transition-all duration-300 group-hover:text-shadow-sm group-hover:scale-110 group-hover:text-cyan-400">${area?.tenders?.edges?.length}</span>
                  </div>
                  ${
                    amount > 0
                      ? `<div class="relative">
                        <span style="font-size: 10px;" class="text-blue-300">金额:</span>
                        <span class="font-semibold transition-all duration-300 group-hover:text-shadow-sm group-hover:scale-110 group-hover:text-cyan-400">
                          ${`${amount}亿`}
                        </span>
                      </div>`
                      : ""
                  }
                </div>
              </div>
              
            </div>
        `,
            offset: areaOfficeMap[area?.code as keyof typeof areaOfficeMap],
          },
          map,
          position: area?.center?.coordinates,
        });

        marker.on("click", () => {
          set({ selectedArea: area as Area });
          get().navigate?.({
            to: ".",
            search: (prev) => ({
              ...prev,
              a: area?.code,
            }),
            resetScroll: false,
          });
          // get().renderArea();
        });

        markers.push(marker);
      }
    });
    map?.setZoomAndCenter(DEFAULT_ZOOM, DEFAULT_CENTER);
    map?.setFitView();
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
      ...(tendersWithinArea?.map((t) => t?.activeProfile?.province?.adcode) ||
        []),
      ...(tendersWithinArea?.map((t) => t?.activeProfile?.city?.adcode) || []),
      ...(tendersWithinArea?.map((t) => t?.activeProfile?.district?.adcode) ||
        []),
    ].filter(Boolean);

    if (!adcodes.includes(props.adcode)) {
      return;
    }
    // tendersWithinArea?.map(t => t.)

    const tenderWithInLocation = tendersWithinArea
      ?.map((t) => {
        switch (props.level) {
          case "province":
            if (t?.activeProfile?.province?.adcode === props.adcode) return t;
          case "city":
            if (t?.activeProfile?.city?.adcode === props.adcode) return t;
          case "district":
            if (t?.activeProfile?.district?.adcode === props.adcode) return t;
        }
      })
      .filter(Boolean);

    const projectCount = tenderWithInLocation?.length || 0;
    const projectAmount = fixAmount(
      tenderWithInLocation?.reduce(
        (acc, inc) =>
          inc?.activeProfile?.estimatedAmount
            ? acc + inc?.activeProfile?.estimatedAmount
            : acc,
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
            <div class="relative flex flex-col p-2 overflow-hidden border rounded-lg shadow-lg backdrop-blur-sm bg-sky-950 border-blue-500/30 group">
            <!-- Holographic scan effect -->
            <div class="absolute inset-0 z-10 overflow-hidden pointer-events-none">
              <div class="absolute inset-0 holographic-effect"></div>
            </div>
            
            <!-- Tech scan line -->
            <div class="absolute inset-0 translate-y-full opacity-0 pointer-events-none group-hover:animate-scan-line bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent"></div>
            
            <!-- Corner borders - top left and right -->
            <div class="group-hover:bg-corner-border-glow absolute left-0 top-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
            <div class="group-hover:bg-corner-border-glow absolute right-0 top-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
            
            <!-- Corner borders - bottom left and right -->
            <div class="group-hover:bg-corner-border-glow absolute bottom-0 left-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
            <div class="group-hover:bg-corner-border-glow absolute bottom-0 right-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
            
            <div class="relative z-10">
              <div class="font-medium transition-all duration-300 group-hover:text-shadow-glow group-hover:text-blue-200">${props.name}<span class="transition-all duration-300 group-hover:text-shadow-sm group-hover:text-cyan-400">(${projectCount})</span></div>
              ${
                typeof projectAmount === "number" && projectAmount > 0
                  ? `
                <div class="relative flex items-center">
                  <span class="transition-all duration-300 group-hover:text-shadow-sm group-hover:text-cyan-400">${projectAmount}亿</span>
                </div>`
                  : ""
              }
            </div>
          </div>
          `,
        offset: new AMap.Pixel(-80, 0),
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
        to: ".",
        search: (prev) => ({
          ...prev,
          ...s,
        }),
        resetScroll: false,
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
      relayEnvironment,
    } = get();
    if (!map || !relayEnvironment) {
      return;
    }
    clearMap();

    districtExplorer.loadAreaNode(adcode, async (error: any, areaNode: any) => {
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

          const strokeColor = getDistrictColor(feature.properties.adcode, i);
          const fillColor = getDistrictColor(feature.properties.adcode, i);

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

        const mapCircles: AMap.CircleMarker[] | any[] | AMap.Polygon[] = [];

        const districts = await fetchQuery<mapv2DistrictsQuery>(
          relayEnvironment,
          districtsQuery,
          {
            adcode: areaProps.adcode,
          },
        ).toPromise();

        for (const plot of districts?.districts.edges
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
              offset: new AMap.Pixel(-100, 30),
            },
            map,
            position: polygon.getBounds()?.getCenter(),
          });

          mapCircles.push(polygon);
          mapCircles.push(label);
        }

        const tenders =
          selectedArea?.tenders.edges
            ?.map((e) => e?.node)
            .filter(
              (t) => t?.activeProfile?.district?.adcode === areaProps.adcode,
            ) || [];

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
            const offsetY =
              tender.activeProfile?.name &&
              tender.activeProfile?.name?.length > 10
                ? -20
                : -10;
            // @ts-expect-error
            const label = new AMapUI.SimpleMarker({
              // @ts-expect-error
              iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
              label: {
                content: `
                 <div id="marker-${tender.id}" class="relative flex flex-col p-2 overflow-hidden border rounded-lg shadow-lg backdrop-blur-sm bg-sky-950 border-blue-500/30 group">
                  <!-- Holographic scan effect -->
                  <div class="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                    <div class="absolute inset-0 holographic-effect"></div>
                  </div>
                  
                  <!-- Tech scan line -->
                  <div class="absolute inset-0 translate-y-full opacity-0 pointer-events-none group-hover:animate-scan-line bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent"></div>
                  
                  <!-- Corner borders - top left and top right -->
                  <div class="group-hover:bg-corner-border-glow absolute left-0 top-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                  <div class="group-hover:bg-corner-border-glow absolute right-0 top-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                  
                  <!-- Corner borders - bottom left and bottom right -->
                  <div class="group-hover:bg-corner-border-glow absolute bottom-0 left-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                  <div class="group-hover:bg-corner-border-glow absolute bottom-0 right-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                  
                  <div class="relative z-10 text-sm font-medium text-center transition-all duration-300 text-wrap group-hover:text-shadow-glow group-hover:text-blue-200 line-clamp-2">${tender.activeProfile?.name}</div>
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
              get().navigate?.({
                to: ".",
                search: (prev) => ({
                  ...prev,
                  t: tender.id,
                }),
                resetScroll: false,
              });
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
          } else if (tender?.activeProfile?.geoCoordinate) {
            const offsetY =
              tender.activeProfile?.name &&
              tender.activeProfile?.name?.length > 10
                ? -35
                : -25;
            // @ts-expect-error
            const label = new AMapUI.SimpleMarker({
              // @ts-expect-error
              iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
              label: {
                content: `
                <div id="marker-${tender.id}" class="w-[10rem] relative overflow-hidden rounded-lg backdrop-blur-sm bg-sky-950 border border-blue-500/30 shadow-lg group px-2 py-1.5">
                  <!-- Holographic scan effect -->
                  <div class="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                    <div class="absolute inset-0 holographic-effect"></div>
                  </div>
                  
                  <!-- Tech scan line -->
                  <div class="absolute inset-0 translate-y-full opacity-0 pointer-events-none group-hover:animate-scan-line bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent"></div>
                  
                  <!-- Corner borders - top left and top right -->
                  <div class="group-hover:bg-corner-border-glow absolute left-0 top-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                  <div class="group-hover:bg-corner-border-glow absolute right-0 top-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                  
                  <!-- Corner borders - bottom left and bottom right -->
                  <div class="group-hover:bg-corner-border-glow absolute bottom-0 left-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                  <div class="group-hover:bg-corner-border-glow absolute bottom-0 right-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                  
                  <div class="relative z-10 text-sm font-medium text-center transition-all duration-300 text-wrap group-hover:text-shadow-glow group-hover:text-blue-200 line-clamp-2">${tender.activeProfile?.name}</div>
                </div>
                `,
                offset: new AMap.Pixel(-235, offsetY),
              },
              map,
              position: new AMap.LngLat(
                tender.activeProfile?.geoCoordinate?.[1],
                tender.activeProfile?.geoCoordinate?.[0],
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
              get().navigate?.({
                to: ".",
                search: (prev) => ({
                  ...prev,
                  t: tender.id,
                }),
                resetScroll: false,
              });
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
                tender.activeProfile?.geoCoordinate?.[1],
                tender.activeProfile?.geoCoordinate?.[0],
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

        const center =
          tenders?.length > 0 && tenders[0]?.activeProfile?.geoCoordinate
            ? [
                tenders[0]?.activeProfile?.geoCoordinate?.[1],
                tenders[0]?.activeProfile?.geoCoordinate?.[0],
              ]
            : areaProps.center;
        map?.setZoomAndCenter(15, center, false, 600);

        return;
      }

      map?.setBounds(areaNode.getBounds(), false, [140, 0, 20, 20]);
    });
  },
  getMarker(tenderId) {
    const { mapCircles } = get();
    return mapCircles.find((c) => c.getExtData()?.tenderId === tenderId);
  },
}));
