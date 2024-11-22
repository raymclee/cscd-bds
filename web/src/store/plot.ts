import { create } from "zustand";

type State = {
  isAdding: boolean;
  isEditing: boolean;
  selectedPlot: string | null;
  polygonEditor: AMap.PolygonEditor | null;
  deletingPlot: string | null;
};
type Action = {
  setIsAdding: (isAdding: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
  setSelectedPlot: (selectedPlot: string | null) => void;
  setPolygonEditor: (polygonEditor: AMap.PolygonEditor) => void;
};

export const usePlotStore = create<State & Action>()((set) => ({
  isAdding: false,
  isEditing: false,
  selectedPlot: null,
  polygonEditor: null,
  deletingPlot: null,
  setIsAdding: (isAdding) => set({ isAdding }),
  setIsEditing: (isEditing) => set({ isEditing }),
  setSelectedPlot: (selectedPlot) => set({ selectedPlot }),
  setPolygonEditor: (polygonEditor) => set({ polygonEditor }),
}));
