import { plotsDeletePlotMutation } from "__generated__/plotsDeletePlotMutation.graphql";
import { Modal } from "antd";
import { UseMutationConfig } from "react-relay";
import { create } from "zustand";
import { useMapStore } from "./map";
import { Plot, PlotEdge } from "~/graphql/graphql";

type State = {
  isAdding: boolean;
  isEditing: boolean;
  selectedPlot: string | null;
  polygonEditor: AMap.PolygonEditor | null;
  selectedDistrict: string | null;
  markers: AMap.Polygon[] | any[];
};
type Action = {
  setSelectedPlot: (selectedPlot: string | null) => void;
  setPolygonEditor: (polygonEditor: AMap.PolygonEditor) => void;
  renderPlot: (
    plot: {
      readonly colorHex: string;
      readonly geoBounds:
        | ReadonlyArray<ReadonlyArray<number>>
        | null
        | undefined;
      readonly id: string;
      readonly name: string;
    },
    commitMutation?: (
      config: UseMutationConfig<plotsDeletePlotMutation>,
    ) => void,
  ) => void;
};

export const usePlotStore = create<State & Action>()((set, get) => ({
  isAdding: false,
  isEditing: false,
  selectedPlot: null,
  polygonEditor: null,
  selectedDistrict: null,
  markers: [],
  setSelectedPlot: (selectedPlot) => set({ selectedPlot }),
  setPolygonEditor: (polygonEditor) => set({ polygonEditor }),
  renderPlot(plot, commitMutation) {
    const { map } = useMapStore.getState();
    if (!map || !plot?.geoBounds) return;

    const polygon = new AMap.Polygon();
    polygon.setPath(plot?.geoBounds as AMap.LngLatLike[]);
    polygon.setOptions({
      fillColor: plot?.colorHex,
      fillOpacity: 0.35,
      strokeColor: plot?.colorHex,
      strokeWeight: 2,
    });

    // @ts-expect-error
    if (!AMapUI) return;
    // @ts-expect-error
    const label = new AMapUI.SimpleMarker({
      // @ts-expect-error
      iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
      label: {
        content: `
            <div class="w-[10rem] rounded-lg px-1 py-0.5 line-clamp-2">
              <div class="font-medium text-center text-sm text-wrap">${plot?.name}</div>
            </div>
            `,
        offset: new AMap.Pixel(-100, 30),
      },
      map,
      position: polygon.getBounds()?.getCenter(),
    });

    label.on("click", () => {
      const center = polygon.getBounds()?.getCenter();
      if (center?.lng && center?.lat) {
        map?.setZoomAndCenter(
          16,
          [center?.getLng(), center?.getLat()],
          false,
          600,
        );
      }
    });

    polygon.on("dblclick", (e) => {
      const { polygonEditor } = get();
      polygonEditor?.setTarget(polygon);
      polygonEditor?.open();
      set({ selectedPlot: plot?.id, isEditing: true });
    });

    polygon.on("rightclick", (e) => {
      if (!plot?.id) return;
      if (!commitMutation) return;
      Modal.confirm({
        title: "確認刪除",
        content: "確認刪除地塊？",
        onOk: () => {
          polygon.remove();
          label.remove();
          commitMutation({
            variables: { id: plot?.id! },
            updater: (store) => {
              store.delete(plot?.id!);
            },
          });
        },
      });
    });
    map.add(polygon);
    // polygon.setMap(map);
  },
}));
