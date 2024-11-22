import { plotsDeletePlotMutation } from "__generated__/plotsDeletePlotMutation.graphql";
import { Modal } from "antd";
import { UseMutationConfig } from "react-relay";
import { create } from "zustand";
import { useMapStore } from "./map";

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
  createPlot: (
    plot: any,
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
  createPlot(plot, commitMutation) {
    const { map, polygonEditor } = useMapStore.getState();
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
      map?.setZoomAndCenter(
        16,
        [center?.getLng() || 0, center?.getLat() || 0],
        false,
        600,
      );
    });

    polygon.on("dblclick", (e) => {
      polygonEditor?.setTarget(polygon);
      polygonEditor?.open();
      usePlotStore.setState({ selectedPlot: plot?.id, isEditing: true });
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
          commitMutation({ variables: { id: plot?.id! } });
        },
      });
    });
    polygon.setMap(map);
  },
}));
