import { create } from "zustand";
import { Tender, Area, AreaConnection } from "~/graphql/graphql";
import { getDistrictColor } from "~/lib/color";
import { fixAmount } from "~/lib/helper";
import { useNavigate } from "@tanstack/react-router";
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
  selectedAreaNode: any;
  navigate: ReturnType<typeof useNavigate> | null;
};

type Action = {
  initMap: (
    container: HTMLDivElement,
    navigate: ReturnType<typeof useNavigate>,
    opts?: Partial<AMap.MapOptions>,
  ) => void;
  resetMap: () => void;
  moveToTender: (tender: Tender) => void;
  renderAreas: () => void;
  renderArea: (area: Area) => void;
  renderMarker: (props: any, hidable?: boolean) => void;
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
    //// @ts-expect-error
    // const scale = new AMap.Scale();
    // map.addControl(scale);
    // // @ts-expect-error
    // const toolbar = new AMap.ToolBar({
    //   position: {
    //     bottom: "240px",
    //     right: "10px",
    //   },
    // });
    // map.addControl(toolbar);
    // // @ts-expect-error
    // const controlBar = new AMap.ControlBar({
    //   position: {
    //     top: "360px",
    //     right: "10px",
    //   },
    // });
    // map.addControl(controlBar);
    // // @ts-expect-error
    // const hawkEye = new AMap.HawkEye({
    //   position: {
    //     bottom: "10px",
    //     right: "10px",
    //   },
    // });
    // map.addControl(hawkEye);

    set({ map, districtExplorer, satelliteLayer, navigate });
  },
  resetMap: () => {
    const { map, satelliteLayer, markers, districtExplorer, renderAreas } =
      get();
    districtExplorer?.clearFeaturePolygons();
    districtExplorer?.setHoverFeature(null);
    map?.removeLayer(satelliteLayer!);
    map?.remove(markers);
    map?.setZoomAndCenter(DEFAULT_ZOOM, DEFAULT_CENTER);
    set({ markers: [], selectedAreaNode: null, selectedArea: null });
    renderAreas();
  },
  moveToTender: (tender: Tender) => {
    const { map, satelliteLayer } = get();
    if (!tender.geoCoordinate?.coordinates) {
      return;
    }
    map?.addLayer(satelliteLayer!);
    const [lng, lat] = tender.geoCoordinate.coordinates;
    map?.setZoomAndCenter(16, [lng, lat]);
  },
  renderAreas: () => {
    const { districtExplorer, map, markers, areas, selectedArea } = get();
    if (selectedArea) {
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
          extData: {
            home: true,
          },
        });

        marker.on("click", () => {
          set({ selectedArea: area as Area });
          get().navigate?.({
            to: "/v2/areas/$id",
            params: {
              id: area?.id!,
            },
          });
        });

        markers.push(marker);
      }
    });

    set({ markers });
  },
  renderArea: (area) => {
    const { districtExplorer, map, markers, renderMarker } = get();
    map?.remove(markers);

    districtExplorer.clearFeaturePolygons();
    districtExplorer.loadMultiAreaNodes(
      area.provinces?.edges?.map((e) => e?.node).map((p) => p?.adcode),
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

    const zoom = getDistrictZoomLevelv2(area.code);
    map?.setZoomAndCenter(
      zoom,
      area.center?.coordinates as [number, number],
      false,
      600,
    );
  },
  renderMarker: (props: any, hidable?: boolean) => {
    if (props.adcode === get().selectedAreaNode?.adcode) {
      return;
    }

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
    });
    marker.on("mouseover", () => {
      marker.setOptions({ zIndex: 13 });
    });
    marker.on("mouseout", () => {
      marker.setOptions({ zIndex: 12 });
    });
    set((s) => ({ markers: [...s.markers, marker] }));
  },
}));
