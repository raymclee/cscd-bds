import { create } from "zustand";
import { Tender, Area, AreaConnection } from "~/graphql/graphql";
import { getDistrictColor } from "~/lib/color";
import { fixAmount } from "~/lib/helper";

const DEFAULT_CENTER = [94, 46] as [number, number];
const DEFAULT_ZOOM = 4;

type State = {
  map: AMap.Map | null;
  satelliteLayer: AMap.TileLayer | null;
  districtExplorer: any;
};

type Action = {
  initMap: (container: HTMLDivElement, opts?: Partial<AMap.MapOptions>) => void;
  toDefaultCenter: () => void;
  moveToTender: (tender: Tender) => void;
  renderAreas: (areas: AreaConnection) => void;
};

export const useMapV2StoreBase = create<State & Action>()((set, get) => ({
  map: null,
  satelliteLayer: null,
  districtExplorer: null,
  initMap: (container, opts) => {
    const map = new AMap.Map(container, {
      mapStyle: "amap://styles/blue",
      center: DEFAULT_CENTER,
      zoom: 4,
      // zoomEnable: false,
      scrollWheel: false,
      ...opts,
    });
    const satelliteLayer = new AMap.TileLayer.Satellite();
    // @ts-expect-error
    const districtExplorer = new AMapUI.DistrictExplorer({
      eventSupport: true,
      map: map,
      preload: [100000],
    });

    set({ map, districtExplorer, satelliteLayer });
  },
  renderAreas: (areas) => {
    const { districtExplorer, map } = get();

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
              <div class="font-semibold text-base">${area?.name}</div>
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
            // offset: new AMap.Pixel(-40, 40),
          },
          map,
          position: area?.center?.coordinates,
          extData: {
            home: true,
          },
        });
      }
    });
  },
  toDefaultCenter: () => {
    const { map, satelliteLayer } = get();
    map?.removeLayer(satelliteLayer!);
    map?.setZoomAndCenter(DEFAULT_ZOOM, DEFAULT_CENTER);
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
}));
